import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Card from './Card';
import { createDeck, shuffleDeck } from '../gameLogic';
import './BattleScreen.css';

const PLAYER_STARTING_HP = 10;
const ENEMY_STARTING_HP = 10;
const STARTING_HAND_SIZE = 5;
const BOARD_SIZE = 4;

const BattleScreen = () => {
    const [gameState, setGameState] = useState('initializing');
    const [playerHP, setPlayerHP] = useState(PLAYER_STARTING_HP);
    const [playerDeck, setPlayerDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [playerBoard, setPlayerBoard] = useState(Array(BOARD_SIZE).fill({ card: null }));
    const [playerGraveyard, setPlayerGraveyard] = useState([]);

    const [enemyHP, setEnemyHP] = useState(ENEMY_STARTING_HP);
    const [enemyDeck, setEnemyDeck] = useState([]);
    const [enemyHand, setEnemyHand] = useState([]);
    const [enemyBoard, setEnemyBoard] = useState(Array(BOARD_SIZE).fill({ card: null }));
    const [enemyGraveyard, setEnemyGraveyard] = useState([]);

    const [draggedCard, setDraggedCard] = useState(null);

    const drawCards = useCallback((deck, graveyard, amount) => {
        let currentDeck = [...deck];
        let currentGraveyard = [...graveyard];
        let drawn = [];

        if (currentDeck.length < amount) {
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
            const { drawn: pInitialHand, remainingDeck: pDeck } = drawCards(shuffleDeck(createDeck()), [], STARTING_HAND_SIZE);
            const { drawn: eInitialHand, remainingDeck: eDeck } = drawCards(shuffleDeck(createDeck()), [], STARTING_HAND_SIZE);

            setPlayerHP(PLAYER_STARTING_HP);
            setPlayerDeck(pDeck);
            setPlayerHand(pInitialHand);
            setPlayerBoard(Array(BOARD_SIZE).fill({ card: null }));
            setPlayerGraveyard([]);

            setEnemyHP(ENEMY_STARTING_HP);
            setEnemyDeck(eDeck);
            setEnemyHand(eInitialHand);
            setEnemyBoard(Array(BOARD_SIZE).fill({ card: null }));
            setEnemyGraveyard([]);

            setGameState('player_turn');
        };
        startNewGame();
    }, [drawCards]);

    const handleDragStart = (e, card) => {
        if (gameState !== 'player_turn') return;
        setDraggedCard(card);
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDrop = (e, slotIndex) => {
        e.preventDefault();
        if (gameState !== 'player_turn' || !draggedCard || playerBoard[slotIndex].card) return;

        const newPlayerBoard = [...playerBoard];
        newPlayerBoard[slotIndex] = { card: { ...draggedCard, faceUp: true } }; // Let's make them face up for now to see
        setPlayerBoard(newPlayerBoard);

        const newPlayerHand = playerHand.filter(card => card.id !== draggedCard.id);
        setPlayerHand(newPlayerHand);

        setDraggedCard(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleBattle = () => {
        if (gameState !== 'player_turn') return;
        setGameState('resolving');

        // Simple AI: play random cards
        const enemyCardsToPlay = [...enemyHand].sort(() => 0.5 - Math.random()).slice(0, BOARD_SIZE);
        const newEnemyHand = enemyHand.filter(c => !enemyCardsToPlay.find(played => played.id === c.id));
        const newEnemyBoard = Array(BOARD_SIZE).fill({ card: null });
        enemyCardsToPlay.forEach((card, i) => {
            if (playerBoard[i].card) { // Only play a card if player has one there
                newEnemyBoard[i] = { card: { ...card, faceUp: true } };
            }
        });
        setEnemyHand(newEnemyHand);
        setEnemyBoard(newEnemyBoard);

        setTimeout(() => calculateCombat(playerBoard, newEnemyBoard), 1000);
    };

    const calculateCombat = (pBoard, eBoard) => {
        let playerDamage = 0;
        let enemyDamage = 0;

        for (let i = 0; i < BOARD_SIZE; i++) {
            const pCard = pBoard[i].card;
            const eCard = eBoard[i].card;

            if (pCard && eCard) {
                if (pCard.number > eCard.number) {
                    enemyDamage++;
                } else if (eCard.number > pCard.number) {
                    playerDamage++;
                }
            } else if (pCard && !eCard) {
                enemyDamage++;
            }
        }

        if (playerDamage > 0) setPlayerHP(hp => Math.max(0, hp - playerDamage));
        if (enemyDamage > 0) setEnemyHP(hp => Math.max(0, hp - enemyDamage));

        setTimeout(() => endRound(pBoard, eBoard), 1500);
    };

    const endRound = (pBoard, eBoard) => {
        const newPlayerGraveyard = [...playerGraveyard, ...pBoard.map(s => s.card).filter(c => c)];
        const newEnemyGraveyard = [...enemyGraveyard, ...eBoard.map(s => s.card).filter(c => c)];
        setPlayerGraveyard(newPlayerGraveyard);
        setEnemyGraveyard(newEnemyGraveyard);

        const pDrawAmount = STARTING_HAND_SIZE - playerHand.length;
        const eDrawAmount = STARTING_HAND_SIZE - enemyHand.length;

        const { drawn: pDrawn, remainingDeck: pDeck, newGraveyard: pGrave } = drawCards(playerDeck, newPlayerGraveyard, pDrawAmount);
        const { drawn: eDrawn, remainingDeck: eDeck, newGraveyard: eGrave } = drawCards(enemyDeck, newEnemyGraveyard, eDrawAmount);

        setPlayerDeck(pDeck);
        setPlayerHand(prev => [...prev, ...pDrawn]);
        setPlayerGraveyard(pGrave);

        setEnemyDeck(eDeck);
        setEnemyHand(prev => [...prev, ...eDrawn]);
        setEnemyGraveyard(eGrave);

        setPlayerBoard(Array(BOARD_SIZE).fill({ card: null }));
        setEnemyBoard(Array(BOARD_SIZE).fill({ card: null }));
        setGameState('player_turn');
    };

    const isPlayerBoardFull = playerBoard.every(slot => slot.card !== null);

    return (
        <div className="battle-screen">
            <div className="opponent-info">
                <h2>Opponent HP: {enemyHP}</h2>
                <div className="hand-container opponent-hand">
                    {enemyHand.map((card, i) => <div key={i} className="card-placeholder"></div>)}
                </div>
            </div>

            <Board
                playerSlots={playerBoard}
                opponentSlots={enemyBoard}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            />

            <div className="player-info">
                <h2>Player HP: {playerHP}</h2>
                <div className="hand-container player-hand">
                    {playerHand.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            isFaceUp={true}
                            onDragStart={(e) => handleDragStart(e, card)}
                        />
                    ))}
                </div>
            </div>

            <div className="actions">
              <button onClick={handleBattle} disabled={gameState !== 'player_turn' || playerBoard.every(s => !s.card)}>
                Battle!
              </button>
            </div>
        </div>
    );
};

export default BattleScreen;
