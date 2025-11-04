import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Hand from './Hand';
import './BattleScreen.css';
import { createPlayerDeck, createEnemyDeck, shuffleDeck, STAGE_TYPES } from '../gameLogic';

const PLAYER_STARTING_HP = 10;
const ENEMY_STARTING_HP = 10;
const STARTING_HAND_SIZE = 6;
const BOARD_SIZE = 4;

const BattleScreen = ({ stage, onGameOver }) => {
  const [gameState, setGameState] = useState('initializing');
  const [playerHP, setPlayerHP] = useState(PLAYER_STARTING_HP);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerBoard, setPlayerBoard] = useState(Array(BOARD_SIZE).fill(null));
  const [playerGraveyard, setPlayerGraveyard] = useState([]);

  const [enemyHP, setEnemyHP] = useState(ENEMY_STARTING_HP);
  const [enemyDeck, setEnemyDeck] = useState([]);
  const [enemyHand, setEnemyHand] = useState([]);
  const [enemyBoard, setEnemyBoard] = useState(Array(BOARD_SIZE).fill(null));
  const [enemyGraveyard, setEnemyGraveyard] = useState([]);

  useEffect(() => {
    if (gameState === 'initializing' || !stage) return;
    if (playerHP <= 0) {
      onGameOver(false);
    } else if (enemyHP <= 0) {
      onGameOver(true);
    }
  }, [playerHP, enemyHP, onGameOver, gameState, stage]);

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
      // Load player's deck from localStorage or create a default one
      const savedDeckConfig = JSON.parse(localStorage.getItem('active_deck'));
      const pDeck = shuffleDeck(createPlayerDeck(savedDeckConfig));

      const eDeck = (stage && stage.deck) ? shuffleDeck([...stage.deck]) : shuffleDeck(createEnemyDeck([ {name: 'Enemy', number: 1, art: 'Enemy', count: 12} ])); // Enemy uses default deck for now

      const { drawn: pHand, remainingDeck: pDeckAfter } = drawCards(pDeck, [], STARTING_HAND_SIZE);
      const { drawn: eHand, remainingDeck: eDeckAfter } = drawCards(eDeck, [], STARTING_HAND_SIZE);

      setPlayerHP(PLAYER_STARTING_HP);
      setPlayerDeck(pDeckAfter);
      setPlayerHand(pHand);
      setPlayerBoard(Array(BOARD_SIZE).fill(null));
      setPlayerGraveyard([]);

      setEnemyHP(ENEMY_STARTING_HP);
      setEnemyDeck(eDeckAfter);
      setEnemyHand(eHand);
      setEnemyBoard(Array(BOARD_SIZE).fill(null));
      setEnemyGraveyard([]);

      setGameState('player_turn');
    };
    startNewGame();
  }, [drawCards, stage]);

  const draggedCardRef = React.useRef(null);

  const handleCardDragStart = (e, card) => {
    e.dataTransfer.setData('cardId', card.id.toString());
  };

  const handleGlobalTouchEnd = (e) => {
    if (draggedCardRef.current) {
      const touch = e.changedTouches[0];
      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
      const slotIndex = dropTarget ? dropTarget.getAttribute('data-slot-index') : null;
      if (slotIndex !== null) {
        handleCardDrop({ cardId: draggedCardRef.current.id }, 'board', parseInt(slotIndex, 10));
      }
      draggedCardRef.current = null;
    }
  };

  const handleCardTouchStart = (e, card) => {
    draggedCardRef.current = card;
  };

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (draggedCardRef.current) {
        e.preventDefault();
      }
    };

    window.addEventListener('touchend', handleGlobalTouchEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchend', handleGlobalTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleCardDrop = (cardInfo, target, slotIndex) => {
    if (gameState !== 'player_turn' || !cardInfo.cardId || playerBoard[slotIndex]) return;
    const cardId = parseInt(cardInfo.cardId, 10);
    const cardToMove = playerHand.find(c => c.id === cardId);
    if (!cardToMove) return;

    const newHand = playerHand.filter(c => c.id !== cardId);
    const newBoard = [...playerBoard];
    newBoard[slotIndex] = { ...cardToMove, faceUp: false };
    setPlayerHand(newHand);
    setPlayerBoard(newBoard);
  };

  const handleBattle = () => {
    if (gameState !== 'player_turn' || playerBoard.some(c => c === null)) return;
    setGameState('resolving');

    const enemyCardsToPlay = enemyHand.slice(0, playerBoard.filter(c => c).length);
    const newEnemyHand = enemyHand.slice(playerBoard.filter(c => c).length);
    const newEnemyBoard = Array(BOARD_SIZE).fill(null);
    let playIndex = 0;
    for(let i=0; i < BOARD_SIZE; i++){
        if(playerBoard[i] && playIndex < enemyCardsToPlay.length){
            newEnemyBoard[i] = { ...enemyCardsToPlay[playIndex], faceUp: false };
            playIndex++;
        }
    }
    setEnemyHand(newEnemyHand);
    setEnemyBoard(newEnemyBoard);

    setTimeout(() => {
      const revealedPBoard = playerBoard.map(c => c ? { ...c, faceUp: true } : null);
      const revealedEBoard = newEnemyBoard.map(c => c ? { ...c, faceUp: true } : null);
      setPlayerBoard(revealedPBoard);
      setEnemyBoard(revealedEBoard);
      setTimeout(() => calculateCombat(revealedPBoard, revealedEBoard), 1000);
    }, 500);
  };

  const calculateCombat = (pBoard, eBoard) => {
    let pScores = Array(BOARD_SIZE).fill(0);
    let eScores = Array(BOARD_SIZE).fill(0);

    for (let i = 0; i < BOARD_SIZE; i++) {
        const pCard = pBoard[i];
        const eCard = eBoard[i];
        if (!pCard || !eCard) continue;

        if (pCard.number === 1 && (eCard.number === 8 || eCard.number === 9)) {
            if (i > 0 && pBoard[i-1]) pScores[i-1]++;
            if (i < BOARD_SIZE - 1 && pBoard[i+1]) pScores[i+1]++;
        }
        if (pCard.number === 2 && eCard.number === 9) {
            if (i > 0 && pBoard[i-1]) pScores[i-1]++;
            if (i < BOARD_SIZE - 1 && pBoard[i+1]) pScores[i+1]++;
        }
        if (eCard.number === 1 && (pCard.number === 8 || pCard.number === 9)) {
            if (i > 0 && eBoard[i-1]) eScores[i-1]++;
            if (i < BOARD_SIZE - 1 && eBoard[i+1]) eScores[i+1]++;
        }
        if (eCard.number === 2 && pCard.number === 9) {
            if (i > 0 && eBoard[i-1]) eScores[i-1]++;
            if (i < BOARD_SIZE - 1 && eBoard[i+1]) eScores[i+1]++;
        }
    }

    let pTotalScore = 0;
    let eTotalScore = 0;

    for (let i = 0; i < BOARD_SIZE; i++) {
        const pCard = pBoard[i];
        const eCard = eBoard[i];
        if (!pCard || !eCard) continue;

        if ((pCard.number + pScores[i]) > (eCard.number + eScores[i])) {
            pTotalScore++;
        } else if ((eCard.number + eScores[i]) > (pCard.number + pScores[i])) {
            eTotalScore++;
        }
    }

    // Damage calculation based on new GDD: total winning lanes count as damage
    if (pTotalScore > eTotalScore) {
      setEnemyHP(hp => Math.max(0, hp - pTotalScore));
    }
    if (eTotalScore > pTotalScore) {
      setPlayerHP(hp => Math.max(0, hp - eTotalScore));
    }

    setTimeout(() => endRound(pBoard, eBoard), 1500);
  };

  const endRound = (pBoard, eBoard) => {
    const newPGrave = [...playerGraveyard, ...pBoard.filter(c => c)];
    const newEGrave = [...enemyGraveyard, ...eBoard.filter(c => c)];

    const pDrawAmount = STARTING_HAND_SIZE - playerHand.length;
    const eDrawAmount = STARTING_HAND_SIZE - enemyHand.length;

    const { drawn: pDrawn, remainingDeck: pDeck, newGraveyard: pGrave } = drawCards(playerDeck, newPGrave, pDrawAmount);
    const { drawn: eDrawn, remainingDeck: eDeck, newGraveyard: eGrave } = drawCards(enemyDeck, newEGrave, eDrawAmount);

    setPlayerDeck(pDeck);
    setPlayerHand(pDrawn);
    setPlayerGraveyard(pGrave);

    setEnemyDeck(eDeck);
    setEnemyHand(eDrawn);
    setEnemyGraveyard(eGrave);

    setPlayerBoard(Array(BOARD_SIZE).fill(null));
    setEnemyBoard(Array(BOARD_SIZE).fill(null));
    setGameState('player_turn');
  };

  if (!stage) return <div>Loading...</div>;

  return (
    <div className="battle-screen">
      <div className="enemy-info">
        <h2>{stage.enemy?.name || 'Opponent'} HP: {enemyHP}</h2>
      </div>
      <Board
        playerSlots={playerBoard}
        opponentSlots={enemyBoard}
        onCardDrop={handleCardDrop}
      />
      <div className="player-info">
        <h2>Player HP: {playerHP}</h2>
      </div>
      <div className="actions">
        <button onClick={handleBattle} disabled={gameState !== 'player_turn' || playerBoard.some(c => c === null)}>Battle!</button>
      </div>
      <Hand
        cards={playerHand}
        onCardDragStart={handleCardDragStart}
        onCardTouchStart={handleCardTouchStart}
      />
    </div>
  );
};

export default BattleScreen;
