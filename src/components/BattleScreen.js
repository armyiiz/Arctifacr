import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Hand from './Hand';
import './BattleScreen.css';
import { createDeck, shuffleDeck } from '../gameLogic';

const PLAYER_STARTING_HP = 10;
const ENEMY_STARTING_HP = 10;
const STARTING_HAND_SIZE = 5; // Reverting to 5 as per user confirmation
const BOARD_SIZE = 4;

const BattleScreen = ({ onGameOver }) => {
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
    if (playerHP <= 0 || enemyHP <= 0) {
      alert(playerHP <= 0 ? "You lose!" : "You win!");
      if(onGameOver) onGameOver();
    }
  }, [playerHP, enemyHP, onGameOver]);

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
        drawn.push(currentDeck.pop());
    }
    return { drawn, remainingDeck: currentDeck, newGraveyard: currentGraveyard };
  }, []);

  useEffect(() => {
    const startNewGame = () => {
      const pDeck = shuffleDeck(createDeck());
      const eDeck = shuffleDeck(createDeck());

      const { drawn: pHand, remainingDeck: pDeckAfterDraw } = drawCards(pDeck, [], STARTING_HAND_SIZE);
      const { drawn: eHand, remainingDeck: eDeckAfterDraw } = drawCards(eDeck, [], STARTING_HAND_SIZE);

      setPlayerHP(PLAYER_STARTING_HP);
      setPlayerDeck(pDeckAfterDraw);
      setPlayerHand(pHand);
      setPlayerBoard(Array(BOARD_SIZE).fill(null));
      setPlayerGraveyard([]);

      setEnemyHP(ENEMY_STARTING_HP);
      setEnemyDeck(eDeckAfterDraw);
      setEnemyHand(eHand);
      setEnemyBoard(Array(BOARD_SIZE).fill(null));
      setEnemyGraveyard([]);

      setGameState('player_turn');
    };
    startNewGame();
  }, [drawCards]);

  const handleCardDragStart = (e, card) => {
    if (gameState !== 'player_turn') return;
    e.dataTransfer.setData('cardId', card.id);
  };

  const handleCardDrop = (cardInfo, target, slotIndex) => {
    if (gameState !== 'player_turn' || target !== 'board') return;
    const cardId = parseInt(cardInfo.cardId, 10);
    const cardToMove = playerHand.find(c => c.id === cardId);
    if (!cardToMove || playerBoard[slotIndex]) return;

    const newHand = playerHand.filter(c => c.id !== cardId);
    const newBoard = [...playerBoard];
    newBoard[slotIndex] = { ...cardToMove, faceUp: false };
    setPlayerHand(newHand);
    setPlayerBoard(newBoard);
  };

  const handleBattle = () => {
    if (gameState !== 'player_turn' || playerBoard.some(c => c === null)) return;
    setGameState('resolving');

    // AI plays cards
    const enemyCardsToPlay = enemyHand.slice(0, playerBoard.filter(c => c).length);
    const newEnemyHand = enemyHand.slice(playerBoard.filter(c => c).length);
    const newEnemyBoard = [...enemyBoard];
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
    let pDamage = 0;
    let eDamage = 0;

    for (let i = 0; i < BOARD_SIZE; i++) {
        const pCard = pBoard[i];
        const eCard = eBoard[i];
        if (!pCard || !eCard) continue;

        if (pCard.number > eCard.number) eDamage++;
        else if (eCard.number > pCard.number) pDamage++;
    }

    setPlayerHP(hp => Math.max(0, hp - pDamage));
    setEnemyHP(hp => Math.max(0, hp - eDamage));

    setTimeout(() => endRound(pBoard, eBoard), 1500);
  };

  const endRound = (pBoard, eBoard) => {
    const newPGraveyard = [...playerGraveyard, ...pBoard.filter(c => c)];
    const newEGraveyard = [...enemyGraveyard, ...eBoard.filter(c => c)];
    setPlayerGraveyard(newPGraveyard);
    setEnemyGraveyard(newEGraveyard);

    const pDraw = STARTING_HAND_SIZE - playerHand.length + pBoard.filter(c => c).length;
    const eDraw = STARTING_HAND_SIZE - enemyHand.length + eBoard.filter(c => c).length;

    const { drawn: pDrawn, remainingDeck: pDeck, newGraveyard: pGrave } = drawCards(playerDeck, newPGraveyard, pDraw);
    const { drawn: eDrawn, remainingDeck: eDeck, newGraveyard: eGrave } = drawCards(enemyDeck, newEGraveyard, eDraw);

    setPlayerDeck(pDeck);
    setPlayerGraveyard(pGrave);
    setPlayerHand(pDrawn);

    setEnemyDeck(eDeck);
    setEnemyGraveyard(eGrave);
    setEnemyHand(eDrawn);

    setPlayerBoard(Array(BOARD_SIZE).fill(null));
    setEnemyBoard(Array(BOARD_SIZE).fill(null));
    setGameState('player_turn');
  };

  return (
    <div className="battle-screen">
      <div className="opponent-info">
        <h2>Opponent HP: {enemyHP}</h2>
      </div>
      <Board playerSlots={playerBoard} opponentSlots={enemyBoard} onCardDrop={handleCardDrop} />
      <div className="player-info">
        <h2>Player HP: {playerHP}</h2>
      </div>
      <div className="actions">
        <button onClick={handleBattle} disabled={gameState !== 'player_turn'}>Battle!</button>
      </div>
      <Hand cards={playerHand} onCardDragStart={handleCardDragStart} />
    </div>
  );
};

export default BattleScreen;
