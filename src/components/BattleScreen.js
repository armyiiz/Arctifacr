import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Hand from './Hand';
import './BattleScreen.css';
import { createPlayerDeck, createEnemyDeck, shuffleDeck, STAGE_TYPES, FACTIONS } from '../gameLogic';

const PLAYER_STARTING_HP = 10;
const ENEMY_STARTING_HP = 10;
const STARTING_HAND_SIZE = 6;
const BOARD_SIZE = 4;

const BattleScreen = ({ stage, onGameOver, playerHP, setPlayerHP }) => {
  // Game State: 'initializing', 'enemy_setup', 'intel_phase', 'player_setup', 'resolving', 'turn_end'
  const [gameState, setGameState] = useState('initializing');

  // Player State
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerBoard, setPlayerBoard] = useState(Array(BOARD_SIZE).fill(null));
  const [playerGraveyard, setPlayerGraveyard] = useState([]);

  // AI State
  const [aiHP, setAiHP] = useState(ENEMY_STARTING_HP);
  const [aiDeck, setAiDeck] = useState([]);
  const [aiHand, setAiHand] = useState([]);
  const [aiBoard, setAiBoard] = useState(Array(BOARD_SIZE).fill(null));
  const [aiGraveyard, setAiGraveyard] = useState([]);

  // Intel State: { [slotIndex]: 'FACTION_NAME' }
  const [intelData, setIntelData] = useState({});

  // Selection State
  const [selectedCard, setSelectedCard] = useState(null);

  // --- Initialization ---
  useEffect(() => {
    if (gameState === 'initializing' || !stage) return;
    if (playerHP <= 0) {
      onGameOver(false);
    } else if (aiHP <= 0) {
      onGameOver(true);
    }
  }, [playerHP, aiHP, onGameOver, gameState, stage]);

  const drawCards = useCallback((deck, graveyard, amount) => {
    let currentDeck = [...deck];
    let currentGraveyard = [...graveyard];
    let drawn = [];
    for (let i = 0; i < amount; i++) {
        if (currentDeck.length === 0) {
            if (currentGraveyard.length === 0) break;
            currentDeck = shuffleDeck(currentGraveyard);
            currentGraveyard = [];
        }
        if (currentDeck.length > 0) drawn.push(currentDeck.pop());
    }
    return { drawn, remainingDeck: currentDeck, newGraveyard: currentGraveyard };
  }, []);

  useEffect(() => {
    const startNewGame = () => {
      const savedDeckConfig = JSON.parse(localStorage.getItem('active_deck'));
      const pDeck = shuffleDeck(createPlayerDeck(savedDeckConfig));

      let eDeck, enemyHP;
      if (stage && stage.enemy) {
        enemyHP = stage.enemy.level;
        const enemyCardConfig = [{
            name: stage.enemy.name,
            art: stage.enemy.name,
            count: 12,
            faction: stage.enemy.faction
        }];
        eDeck = shuffleDeck(createEnemyDeck(enemyCardConfig));
      } else {
        enemyHP = ENEMY_STARTING_HP;
        eDeck = shuffleDeck(createEnemyDeck([{ name: 'Enemy', art: 'Enemy', count: 12 }]));
      }

      const { drawn: pHand, remainingDeck: pDeckAfter } = drawCards(pDeck, [], STARTING_HAND_SIZE);
      const { drawn: eHand, remainingDeck: eDeckAfter } = drawCards(eDeck, [], STARTING_HAND_SIZE);

      setPlayerDeck(pDeckAfter);
      setPlayerHand(pHand);
      setPlayerBoard(Array(BOARD_SIZE).fill(null));
      setPlayerGraveyard([]);

      setAiHP(enemyHP);
      setAiDeck(eDeckAfter);
      setAiHand(eHand);
      setAiBoard(Array(BOARD_SIZE).fill(null));
      setAiGraveyard([]);

      // Start the loop
      setGameState('enemy_setup');
    };
    startNewGame();
  }, [drawCards, stage]);

  // --- Phase Management ---

  // 1. Enemy Setup Phase
  useEffect(() => {
    if (gameState === 'enemy_setup') {
        // AI simply plays the first 4 cards in hand (or fewer if running out)
        // In a real game, this might be smarter, but random is fine for now.
        const cardsToPlay = aiHand.slice(0, BOARD_SIZE);
        const newAiHand = aiHand.slice(cardsToPlay.length);

        const newAiBoard = Array(BOARD_SIZE).fill(null);
        cardsToPlay.forEach((card, index) => {
            newAiBoard[index] = { ...card, faceUp: false };
        });

        setAiBoard(newAiBoard);
        setAiHand(newAiHand);

        // Move to Intel Phase after a short delay
        setTimeout(() => setGameState('intel_phase'), 500);
    }
  }, [gameState, aiHand]);

  // 2. Intel Phase
  useEffect(() => {
    if (gameState === 'intel_phase') {
        // Reveal 1-2 random cards' factions
        const occupiedSlots = aiBoard.map((c, i) => c ? i : null).filter(i => i !== null);
        if (occupiedSlots.length === 0) {
            setGameState('player_setup');
            return;
        }

        // Shuffle slots to pick random ones
        for (let i = occupiedSlots.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [occupiedSlots[i], occupiedSlots[j]] = [occupiedSlots[j], occupiedSlots[i]];
        }

        const revealCount = Math.random() < 0.5 ? 1 : 2; // 1 or 2
        const slotsToReveal = occupiedSlots.slice(0, revealCount);

        const newIntel = {};
        slotsToReveal.forEach(slotIndex => {
            if (aiBoard[slotIndex]) {
                newIntel[slotIndex] = aiBoard[slotIndex].faction;
            }
        });

        setIntelData(newIntel);

        // Move to Player Setup
        setTimeout(() => setGameState('player_setup'), 1000);
    }
  }, [gameState, aiBoard]);


  // 3. Player Setup Phase (Handled by UI interactions)
  const handleSelectCardFromHand = (card, index) => {
    if (gameState !== 'player_setup') return;
    setSelectedCard({ card: card, index: index });
  };

  const handleSelectBoardSlot = (slotIndex) => {
    if (gameState !== 'player_setup') return;

    // If placing a card
    if (selectedCard && playerBoard[slotIndex] === null) {
      const newHand = [...playerHand];
      const newBoard = [...playerBoard];
      const cardToMove = newHand.splice(selectedCard.index, 1)[0];
      newBoard[slotIndex] = { ...cardToMove, faceUp: false }; // Place face down initially for consistency?
      // Actually, player sees their own cards, so faceUp true for player view,
      // but logically it's "face down" to the enemy.
      // For BattleScreen logic, we usually set player cards faceUp=true immediately so the player can see them.
      // Let's keep faceUp=true for player visual.
      newBoard[slotIndex] = { ...cardToMove, faceUp: true };

      setPlayerHand(newHand);
      setPlayerBoard(newBoard);
      setSelectedCard(null);
    }
    // If retrieving a card (optional UX improvement)
    else if (!selectedCard && playerBoard[slotIndex] !== null) {
        const newHand = [...playerHand];
        const newBoard = [...playerBoard];
        const cardToRetrieve = newBoard[slotIndex];
        newBoard[slotIndex] = null;
        newHand.push(cardToRetrieve); // Return to end of hand
        setPlayerHand(newHand);
        setPlayerBoard(newBoard);
    }
  };

  const handleBattle = () => {
    if (gameState !== 'player_setup') return;
    // Ensure player has placed cards (or allow empty if they want to lose?)
    // Requirement says "Player selects 4 cards".
    // Let's enforce playing as many as possible if hand > 0.
    // For now, just proceed.
    setGameState('resolving');
  };

  // 4. Resolving Phase
  useEffect(() => {
    if (gameState === 'resolving') {
        // Reveal cards
        setTimeout(() => {
            const revealedPBoard = playerBoard.map(c => c ? { ...c, faceUp: true } : null);
            const revealedEBoard = aiBoard.map(c => c ? { ...c, faceUp: true } : null);
            setPlayerBoard(revealedPBoard);
            setAiBoard(revealedEBoard);

            // Calculate Combat
            setTimeout(() => calculateCombat(revealedPBoard, revealedEBoard), 1000);
        }, 500);
    }
  }, [gameState]); // Dependencies handled via control flow

  const getFactionBonus = (myFaction, oppFaction) => {
      if (!myFaction || !oppFaction) return 0;
      if (myFaction === FACTIONS.MIGHT && oppFaction === FACTIONS.TRICKERY) return 2;
      if (myFaction === FACTIONS.TRICKERY && oppFaction === FACTIONS.MAGIC) return 2;
      if (myFaction === FACTIONS.MAGIC && oppFaction === FACTIONS.MIGHT) return 2;
      return 0;
  };

  const calculateCombat = (pBoard, eBoard) => {
    let pScores = Array(BOARD_SIZE).fill(0);
    let eScores = Array(BOARD_SIZE).fill(0);
    let pSpiteDamage = 0;
    let eSpiteDamage = 0;

    // 1. Calculate Support Bonuses (Rank 2)
    // "If placed adjacent (left/right) to a Rank 8 or 9 ally, grant that ally +1 Power."
    const applySupport = (board, scores) => {
        board.forEach((card, i) => {
            if (!card || card.number !== 2) return;
            // Check Left
            if (i > 0 && board[i-1] && (board[i-1].number === 8 || board[i-1].number === 9)) {
                scores[i-1] += 1;
            }
            // Check Right
            if (i < BOARD_SIZE - 1 && board[i+1] && (board[i+1].number === 8 || board[i+1].number === 9)) {
                scores[i+1] += 1;
            }
        });
    };
    applySupport(pBoard, pScores);
    applySupport(eBoard, eScores);

    // 2. Resolve Lanes
    let pRoundPoints = 0;
    let eRoundPoints = 0;

    for (let i = 0; i < BOARD_SIZE; i++) {
        const pCard = pBoard[i];
        const eCard = eBoard[i];

        if (!pCard || !eCard) {
            // Handle empty slots? Assuming auto-loss or no points.
            // If player has card and enemy empty -> Player wins (free point)
            if (pCard && !eCard) pRoundPoints++;
            if (!pCard && eCard) eRoundPoints++;
            continue;
        }

        // Faction Advantage
        const pBonus = getFactionBonus(pCard.faction, eCard.faction);
        const eBonus = getFactionBonus(eCard.faction, pCard.faction);

        const pFinalPower = pCard.number + pScores[i] + pBonus;
        const eFinalPower = eCard.number + eScores[i] + eBonus;

        let pWon = false;
        let eWon = false;

        // Rank 1 Giant Slayer Logic
        // "Wins instantly against Rank 9 (or kills both)."
        // Interpretation: If I am R1 and Enemy is R9, I win.
        // If both are R1 vs R9... wait, R1 vs R9 = R1 wins. R9 vs R1 = R1 wins.
        // So if (p=1, e=9) -> P wins. If (p=9, e=1) -> E wins.
        if (pCard.number === 1 && eCard.number === 9) {
            pWon = true;
        } else if (eCard.number === 1 && pCard.number === 9) {
            eWon = true;
        } else {
            // Standard Compare
            if (pFinalPower > eFinalPower) pWon = true;
            else if (eFinalPower > pFinalPower) eWon = true;
        }

        if (pWon) pRoundPoints++;
        if (eWon) eRoundPoints++;

        // Rank 3 Spite Logic
        // "If this card LOSES the duel, deal 1 Direct Damage to Enemy HP."
        if (!pWon && pCard.number === 3) { // Loss or Tie? "LOSES" usually means strictly loss.
            // But if it's a tie, nobody wins. Did it lose?
            // "Higher wins... Tie = 0 Points".
            // If I have 5 and Enemy 5 -> Tie. Neither wins.
            // Did I lose? Usually "Win/Loss/Draw". So Tie != Loss.
            // I'll assume Spite triggers only on Strict Loss.
            // Wait, if pFinalPower < eFinalPower, that is a loss.
            if (eWon) pSpiteDamage++;
        }
        if (!eWon && eCard.number === 3) {
            if (pWon) eSpiteDamage++;
        }
    }

    // 3. Apply Damage
    // "Winner of the round = Higher Total Points."
    // "Damage Dealt = Sum of Points won (e.g., Won 3 lanes = 3 Damage)."
    // Spite damage applies regardless of round winner.

    let pRoundDamage = 0;
    let eRoundDamage = 0;

    if (pRoundPoints > eRoundPoints) {
        pRoundDamage = pRoundPoints;
    } else if (eRoundPoints > pRoundPoints) {
        eRoundDamage = eRoundPoints;
    }
    // If tie (pRoundPoints === eRoundPoints), neither deals round damage.

    const totalPlayerDamage = pRoundDamage + pSpiteDamage;
    const totalEnemyDamage = eRoundDamage + eSpiteDamage;

    // Apply HP changes
    setAiHP(prev => Math.max(0, prev - totalPlayerDamage));
    setPlayerHP(prev => Math.max(0, prev - totalEnemyDamage));

    // Wait and clean up
    setTimeout(() => endRound(pBoard, eBoard), 2000);
  };

  const endRound = (pBoard, eBoard) => {
    // Graveyard logic
    const newPlayerGraveyard = [...playerGraveyard, ...pBoard.filter(Boolean)];
    const newAiGraveyard = [...aiGraveyard, ...eBoard.filter(Boolean)];

    // Draw cards equal to played cards (which is BOARD_SIZE usually)
    // Actually, we draw up to HAND_SIZE (6).
    // Prompt says: "Draw Phase: Both sides draw up to 6 cards."
    // So we don't just replace played cards, we fill the hand.

    // Check current hand size (after playing)
    // Note: playerHand state currently only has unplayed cards.

    // Update Deck/Graveyard/Hand for Player
    let currentPDeck = [...playerDeck];
    let currentPGrave = newPlayerGraveyard;
    let currentPHand = [...playerHand]; // Remaining hand
    const neededP = STARTING_HAND_SIZE - currentPHand.length;

    const pDrawResult = drawCards(currentPDeck, currentPGrave, neededP);
    setPlayerDeck(pDrawResult.remainingDeck);
    setPlayerGraveyard(pDrawResult.newGraveyard);
    setPlayerHand([...currentPHand, ...pDrawResult.drawn]);

    // Update Deck/Graveyard/Hand for AI
    let currentEDeck = [...aiDeck];
    let currentEGrave = newAiGraveyard;
    let currentEHand = [...aiHand];
    const neededE = STARTING_HAND_SIZE - currentEHand.length;

    const eDrawResult = drawCards(currentEDeck, currentEGrave, neededE);
    setAiDeck(eDrawResult.remainingDeck);
    setAiGraveyard(eDrawResult.newGraveyard);
    setAiHand([...currentEHand, ...eDrawResult.drawn]);

    // Reset Board
    setPlayerBoard(Array(BOARD_SIZE).fill(null));
    setAiBoard(Array(BOARD_SIZE).fill(null));
    setIntelData({}); // Clear intel

    // Next Turn
    setGameState('enemy_setup');
  };

  const handleForfeit = () => {
    if (window.confirm('Are you sure you want to forfeit the match?')) {
      onGameOver(false);
    }
  };

  if (!stage) return <div>Loading...</div>;

  return (
    <div className="battle-screen">
      <div className="enemy-info">
        <h2>{(stage.enemy?.name || 'Opponent').replace(/_/g, ' ')} HP: {aiHP}</h2>
      </div>

      {/* Pass Intel Data to Board/Card components if needed, or render overlay */}
      <Board
        playerSlots={playerBoard}
        opponentSlots={aiBoard}
        onSelectSlot={handleSelectBoardSlot}
        intelData={intelData} // We need to update Board to handle this
      />

      <div className="player-info">
        <h2>Player HP: {playerHP}</h2>
      </div>

      <div className="actions">
        {gameState === 'player_setup' && (
            <button
                onClick={handleBattle}
                disabled={playerBoard.every(c => c === null)}
                className="battle-button"
            >
                BATTLE!
            </button>
        )}
        <button onClick={handleForfeit} className="forfeit-button">Forfeit</button>
      </div>

      <Hand
        cards={playerHand}
        selectedCard={selectedCard}
        onSelectCard={handleSelectCardFromHand}
        isOpen={gameState === 'player_setup'} // Only show hand in setup
      />

      {/* Info Overlay for Phases */}
      {gameState === 'enemy_setup' && <div className="phase-toast">Enemy is thinking...</div>}
      {gameState === 'intel_phase' && <div className="phase-toast">Gathering Intel...</div>}
    </div>
  );
};

export default BattleScreen;
