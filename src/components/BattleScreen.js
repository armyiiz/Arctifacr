import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Hand from './Hand';
import './BattleScreen.css';
import { createPlayerDeck, createEnemyDeck, shuffleDeck, STAGE_TYPES } from '../gameLogic';

const PLAYER_STARTING_HP = 10;
const ENEMY_STARTING_HP = 10;
const STARTING_HAND_SIZE = 6;
const BOARD_SIZE = 4;

const BattleScreen = ({ stage, onGameOver, playerHP, setPlayerHP }) => {
  const [gameState, setGameState] = useState('initializing');
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerBoard, setPlayerBoard] = useState(Array(BOARD_SIZE).fill(null));
  const [playerGraveyard, setPlayerGraveyard] = useState([]);

  const [aiHP, setAiHP] = useState(ENEMY_STARTING_HP);
  const [aiDeck, setAiDeck] = useState([]);
  const [aiHand, setAiHand] = useState([]);
  const [aiBoard, setAiBoard] = useState(Array(BOARD_SIZE).fill(null));
  const [aiGraveyard, setAiGraveyard] = useState([]);

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
      // Load player's deck from localStorage or create a default one
      const savedDeckConfig = JSON.parse(localStorage.getItem('active_deck'));
      const pDeck = shuffleDeck(createPlayerDeck(savedDeckConfig));

      const eDeck = (stage && stage.deck) ? shuffleDeck([...stage.deck]) : shuffleDeck(createEnemyDeck([ {name: 'Enemy', number: 1, art: 'Enemy', count: 12} ])); // Enemy uses default deck for now

      const { drawn: pHand, remainingDeck: pDeckAfter } = drawCards(pDeck, [], STARTING_HAND_SIZE);
      const { drawn: eHand, remainingDeck: eDeckAfter } = drawCards(eDeck, [], STARTING_HAND_SIZE);

      setPlayerDeck(pDeckAfter);
      setPlayerHand(pHand);
      setPlayerBoard(Array(BOARD_SIZE).fill(null));
      setPlayerGraveyard([]);

      setAiHP(ENEMY_STARTING_HP);
      setAiDeck(eDeckAfter);
      setAiHand(eHand);
      setAiBoard(Array(BOARD_SIZE).fill(null));
      setAiGraveyard([]);

      setGameState('player_turn');
    };
    startNewGame();
  }, [drawCards, stage]);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCardFromHand = (card, index) => {
    setSelectedCard({ card: card, index: index });
  };

  const handleSelectBoardSlot = (slotIndex) => {
    // ทำงานต่อเมื่อ: 1. มีการ์ดเลือกค้างไว้ และ 2. ช่องกระดานนั้นว่าง
    if (selectedCard && playerBoard[slotIndex] === null) {

      // สร้าง "สำเนา" ใหม่ของ State (วิธีที่ถูกต้อง)
      const newHand = [...playerHand];
      const newBoard = [...playerBoard];

      // ดึงการ์ดออกจาก "สำเนา" ของมือ
      // .splice() จะแก้ไข newHand และ return การ์ดที่ถูกดึงออกมา
      const cardToMove = newHand.splice(selectedCard.index, 1)[0];

      // วางการ์ดลงใน "สำเนา" ของกระดาน
      newBoard[slotIndex] = cardToMove;

      // อัปเดต State ด้วย "สำเนา" ใหม่
      setPlayerHand(newHand);
      setPlayerBoard(newBoard);
      setSelectedCard(null); // ล้างการ์ดที่เลือกค้าง (แก้บั๊ก hover)
    }
  };

  const handleBattle = () => {
    if (gameState !== 'player_turn' || playerBoard.some(c => c === null)) return;
    setGameState('resolving');

    const enemyCardsToPlay = aiHand.slice(0, playerBoard.filter(c => c).length);
    const newEnemyHand = aiHand.slice(playerBoard.filter(c => c).length);
    const newEnemyBoard = Array(BOARD_SIZE).fill(null);
    let playIndex = 0;
    for(let i=0; i < BOARD_SIZE; i++){
        if(playerBoard[i] && playIndex < enemyCardsToPlay.length){
            newEnemyBoard[i] = { ...enemyCardsToPlay[playIndex], faceUp: false };
            playIndex++;
        }
    }
    setAiHand(newEnemyHand);
    setAiBoard(newEnemyBoard);

    setTimeout(() => {
      const revealedPBoard = playerBoard.map(c => c ? { ...c, faceUp: true } : null);
      const revealedEBoard = newEnemyBoard.map(c => c ? { ...c, faceUp: true } : null);
      setPlayerBoard(revealedPBoard);
      setAiBoard(revealedEBoard);
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
      setAiHP(hp => Math.max(0, hp - pTotalScore));
    }
    if (eTotalScore > pTotalScore) {
      setPlayerHP(hp => Math.max(0, hp - eTotalScore));
    }

    setTimeout(() => endRound(pBoard, eBoard), 1500);
  };

  const endRound = () => {
    // --- 1. ส่งการ์ดที่ใช้แล้วไปสุสาน (ตาม GDD) ---
    // (ใช้ .filter(Boolean) เพื่อกรองช่อง 'null' ที่อาจมี)
    setPlayerGraveyard(prevGraveyard => [...prevGraveyard, ...playerBoard.filter(Boolean)]);
    setAiGraveyard(prevGraveyard => [...prevGraveyard, ...aiBoard.filter(Boolean)]);

    // --- 2. เคลียร์กระดาน ---
    setPlayerBoard(Array(BOARD_SIZE).fill(null));
    setAiBoard(Array(BOARD_SIZE).fill(null));

    // --- 3. คำนวณการ์ดที่จะจั่ว (ตาม GDD) ---
    // (Logic นี้ถูกต้องแล้วจากรอบที่แล้ว)
    const pDrawAmount = STARTING_HAND_SIZE - playerHand.length;
    const eDrawAmount = STARTING_HAND_SIZE - aiHand.length;

    let newPlayerDeck = [...playerDeck];
    let newAiDeck = [...aiDeck];

    let cardsToDrawForPlayer = [];
    let cardsToDrawForAi = [];

    // --- 4. Logic วนสุสาน (Shuffle) สำหรับผู้เล่น (ตาม GDD) ---
    if (newPlayerDeck.length < pDrawAmount) {
      // ถ้าการ์ดในเด็คไม่พอ...
      console.log("Player deck empty! Reshuffling graveyard...");
      const shuffledGraveyard = shuffleDeck([...playerGraveyard]);
      // เอากองสุสานที่สับแล้ว มาต่อท้ายเด็คที่เหลือ
      newPlayerDeck = [...newPlayerDeck, ...shuffledGraveyard];
      // เคลียร์สุสาน
      setPlayerGraveyard([]);
    }

    // --- 5. Logic วนสุสาน (Shuffle) สำหรับ AI (ตาม GDD) ---
    if (newAiDeck.length < eDrawAmount) {
      console.log("AI deck empty! Reshuffling graveyard...");
      const shuffledGraveyard = shuffleDeck([...aiGraveyard]);
      newAiDeck = [...newAiDeck, ...shuffledGraveyard];
      setAiGraveyard([]);
    }

    // --- 6. ทำการจั่วการ์ด ---
    // (ต้องเช็คอีกครั้งว่าหลังวนสุสานแล้วยังการ์ดพอไหม)
    const finalPlayerDraw = Math.min(pDrawAmount, newPlayerDeck.length);
    const finalAiDraw = Math.min(eDrawAmount, newAiDeck.length);

    for (let i = 0; i < finalPlayerDraw; i++) {
      cardsToDrawForPlayer.push(newPlayerDeck.pop());
    }
    for (let i = 0; i < finalAiDraw; i++) {
      cardsToDrawForAi.push(newAiDeck.pop());
    }

    // --- 7. อัปเดต State ---
    setPlayerDeck(newPlayerDeck);
    setAiDeck(newAiDeck);
    setPlayerHand(prevHand => [...prevHand, ...cardsToDrawForPlayer]);
    setAiHand(prevHand => [...prevHand, ...cardsToDrawForAi]);

    setGameState('player_turn');
  };

  if (!stage) return <div>Loading...</div>;

  return (
    <div className="battle-screen">
      <div className="enemy-info">
        <h2>{stage.enemy?.name || 'Opponent'} HP: {aiHP}</h2>
      </div>
      <Board
        playerSlots={playerBoard}
        opponentSlots={aiBoard}
        onSelectSlot={handleSelectBoardSlot}
      />
      <div className="player-info">
        <h2>Player HP: {playerHP}</h2>
      </div>
      <div className="actions">
        <button onClick={handleBattle} disabled={gameState !== 'player_turn' || playerBoard.some(c => c === null)}>Battle!</button>
      </div>
      <Hand
        cards={playerHand}
        selectedCard={selectedCard}
        onSelectCard={handleSelectCardFromHand}
      />
    </div>
  );
};

export default BattleScreen;
