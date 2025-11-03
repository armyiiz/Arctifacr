import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Hand from './Hand';
import './BattleScreen.css';
import { createDeck, shuffleDeck } from '../gameLogic';

const PLAYER_STARTING_HP = 10;
const ENEMY_STARTING_HP = 10;
const STARTING_HAND_SIZE = 6;
const BOARD_SIZE = 4;

const BattleScreen = () => {
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

  const drawCards = useCallback((deck, graveyard, amount) => {
    let currentDeck = [...deck];
    let currentGraveyard = [...graveyard];
    let drawn = [];

    if (currentDeck.length < amount) {
      console.log("Deck is empty. Shuffling graveyard.");
      const shuffledGraveyard = shuffleDeck(currentGraveyard);
      currentDeck = [...currentDeck, ...shuffledGraveyard];
      currentGraveyard = [];
    }

    drawn = currentDeck.slice(0, amount);
    const remaining = currentDeck.slice(amount);

    return { drawn, remainingDeck: remaining, newGraveyard: currentGraveyard };
  }, []);

  useEffect(() => {
    const startNewGame = () => {
      const { drawn: playerInitialHand, remainingDeck: playerRemainingDeck } = drawCards(shuffleDeck(createDeck()), [], STARTING_HAND_SIZE);
      const { drawn: enemyInitialHand, remainingDeck: enemyRemainingDeck } = drawCards(shuffleDeck(createDeck()), [], STARTING_HAND_SIZE);

      setPlayerHP(PLAYER_STARTING_HP);
      setPlayerDeck(playerRemainingDeck);
      setPlayerHand(playerInitialHand);
      setPlayerBoard(Array(BOARD_SIZE).fill(null));
      setPlayerGraveyard([]);

      setEnemyHP(ENEMY_STARTING_HP);
      setEnemyDeck(enemyRemainingDeck);
      setEnemyHand(enemyInitialHand);
      setEnemyBoard(Array(BOARD_SIZE).fill(null));
      setEnemyGraveyard([]);

      setGameState('player_turn');
    };
    startNewGame();
  }, [drawCards]);

  const handleCardDrop = (cardInfo, target, slotIndex) => {
    if (gameState !== 'player_turn' || target !== 'board') return;
    const cardToMove = playerHand.find(c => c.id === cardInfo.cardId);
    if (!cardToMove) return;
    const newHand = playerHand.filter(c => c.id !== cardInfo.cardId);
    const newBoard = [...playerBoard];
    if (newBoard[slotIndex]) {
      newHand.push(newBoard[slotIndex]);
    }
    newBoard[slotIndex] = { ...cardToMove, faceUp: false };
    setPlayerHand(newHand);
    setPlayerBoard(newBoard);
  };

  const handleResetPlacement = () => {
    if (gameState !== 'player_turn') return;
    const cardsOnBoard = playerBoard.filter(c => c !== null);
    setPlayerHand([...playerHand, ...cardsOnBoard]);
    setPlayerBoard(Array(BOARD_SIZE).fill(null));
  };

  const handleBattle = () => {
    if (gameState !== 'player_turn') return;
    setGameState('resolving');
    const enemyCardsToPlay = [...enemyHand].sort(() => 0.5 - Math.random()).slice(0, BOARD_SIZE);
    const newEnemyHand = enemyHand.filter(c => !enemyCardsToPlay.find(played => played.id === c.id));
    const newEnemyBoard = Array(BOARD_SIZE).fill(null);
    enemyCardsToPlay.forEach((card, i) => newEnemyBoard[i] = { ...card, faceUp: false });
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

    // First, check for special abilities that grant bonuses
    for (let i = 0; i < BOARD_SIZE; i++) {
      const pCard = pBoard[i];
      const eCard = eBoard[i];
      if (!pCard || !eCard) continue;

      // Player's card 1 ability
      if (pCard.number === 1 && (eCard.number === 8 || eCard.number === 9)) {
        if (i > 0 && pBoard[i-1]) pScores[i-1]++;
        if (i < BOARD_SIZE - 1 && pBoard[i+1]) pScores[i+1]++;
      }
      // Player's card 2 ability
      if (pCard.number === 2 && eCard.number === 9) {
        if (i > 0 && pBoard[i-1]) pScores[i-1]++;
        if (i < BOARD_SIZE - 1 && pBoard[i+1]) pScores[i+1]++;
      }
      // Enemy's card 1 ability
      if (eCard.number === 1 && (pCard.number === 8 || pCard.number === 9)) {
        if (i > 0 && eBoard[i-1]) eScores[i-1]++;
        if (i < BOARD_SIZE - 1 && eBoard[i+1]) eScores[i+1]++;
      }
      // Enemy's card 2 ability
      if (eCard.number === 2 && pCard.number === 9) {
        if (i > 0 && eBoard[i-1]) eScores[i-1]++;
        if (i < BOARD_SIZE - 1 && eBoard[i+1]) eScores[i+1]++;
      }
    }

    // Now, calculate the winner of each lane
    for (let i = 0; i < BOARD_SIZE; i++) {
      const pCard = pBoard[i];
      const eCard = eBoard[i];
      if (!pCard || !eCard) continue;

      if ((pCard.number + pScores[i]) > (eCard.number + eScores[i])) {
        pScores[i] = 1; // This lane is won by player
        eScores[i] = 0;
      } else if ((eCard.number + eScores[i]) > (pCard.number + pScores[i])) {
        eScores[i] = 1; // This lane is won by enemy
        pScores[i] = 0;
      } else {
        pScores[i] = 0; // Draw
        eScores[i] = 0;
      }
    }

    const totalPlayerScore = pScores.reduce((a, b) => a + b, 0);
    const totalEnemyScore = eScores.reduce((a, b) => a + b, 0);

    if (totalPlayerScore > totalEnemyScore) {
      setEnemyHP(prev => prev - (totalPlayerScore - totalEnemyScore));
    } else if (totalEnemyScore > totalPlayerScore) {
      setPlayerHP(prev => prev - (totalEnemyScore - totalPlayerScore));
    }

    setTimeout(() => endRound(pBoard, eBoard), 1500);
  };

  const endRound = (pBoard, eBoard) => {
    // Update graveyards with cards from the board
    const newPlayerGraveyard = [...playerGraveyard, ...pBoard.filter(c => c !== null)];
    const newEnemyGraveyard = [...enemyGraveyard, ...eBoard.filter(c => c !== null)];
    setPlayerGraveyard(newPlayerGraveyard);
    setEnemyGraveyard(newEnemyGraveyard);

    // Draw new cards
    const pDrawAmount = STARTING_HAND_SIZE - playerHand.length;
    const eDrawAmount = STARTING_HAND_SIZE - enemyHand.length;

    const { drawn: pDrawn, remainingDeck: pDeck, newGraveyard: pNewGrave } = drawCards(playerDeck, newPlayerGraveyard, pDrawAmount);
    const { drawn: eDrawn, remainingDeck: eDeck, newGraveyard: eNewGrave } = drawCards(enemyDeck, newEnemyGraveyard, eDrawAmount);

    setPlayerDeck(pDeck);
    setPlayerGraveyard(pNewGrave);
    setPlayerHand(prev => [...prev, ...pDrawn]);

    setEnemyDeck(eDeck);
    setEnemyGraveyard(eNewGrave);
    setEnemyHand(prev => [...prev, ...eDrawn]);

    // Reset boards and state
    setPlayerBoard(Array(BOARD_SIZE).fill(null));
    setEnemyBoard(Array(BOARD_SIZE).fill(null));
    setGameState('player_turn');
  };

  const isPlayerBoardFull = playerBoard.filter(c => c !== null).length === BOARD_SIZE;

  return (
    <div className="battle-screen">
      <div className="enemy-info">
        <p>Enemy HP: {enemyHP}</p>
        <p>Cards in Hand: {enemyHand.length}</p>
      </div>
      <Board playerSlots={playerBoard} opponentSlots={enemyBoard} onCardDrop={handleCardDrop} />
      <div className="player-info">
        <p>Player HP: {playerHP}</p>
        <p>Cards in Deck: {playerDeck.length}</p>
      </div>
      <div className="actions">
        <button onClick={handleResetPlacement} disabled={gameState !== 'player_turn'}>Reset</button>
        <button onClick={handleBattle} disabled={!isPlayerBoardFull || gameState !== 'player_turn'}>
          Battle!
        </button>
      </div>
      <h2>Your Hand</h2>
      <Hand cards={playerHand} />
    </div>
  );
};

export default BattleScreen;
