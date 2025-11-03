// src/gameLogic.js
import { STAGE_POOLS } from './storyData.js';

// This will eventually be populated with all cards from the game's design.
// For now, we'll use a basic set.
export const ALL_CARDS = [
  { id: 1, name: 'Traveller_1', number: 1, art: 'Traveller' },
  { id: 2, name: 'Traveller_2', number: 1, art: 'Traveller' },
  { id: 3, name: 'Traveller_3', number: 1, art: 'Traveller' },
  { id: 4, name: 'Traveller_4', number: 2, art: 'Traveller' },
  { id: 5, name: 'Traveller_5', number: 2, art: 'Traveller' },
  { id: 6, name: 'Traveller_6', number: 3, art: 'Traveller' },
  { id: 7, name: 'Traveller_7', number: 4, art: 'Traveller' },
  { id: 8, name: 'Traveller_8', number: 5, art: 'Traveller' },
  { id: 9, name: 'Traveller_9', number: 6, art: 'Traveller' },
  { id: 10, name: 'Traveller_10', number: 7, art: 'Traveller' },
  { id: 11, name: 'Traveller_11', number: 8, art: 'Traveller' },
  { id: 12, name: 'Traveller_12', number: 9, art: 'Traveller' },
];

/**
 * Creates a standard 12-card deck based on the game rules.
 */
export const createDeck = () => {
  // The structure is: 3x(1), 2x(2), 1x(3), 1x(4), 1x(5), 1x(6), 1x(7), 1x(8), 1x(9)
  const deck = [
    ...ALL_CARDS.filter(c => c.number === 1),
    ...ALL_CARDS.filter(c => c.number === 2),
    ...ALL_CARDS.filter(c => c.number === 3),
    ...ALL_CARDS.filter(c => c.number === 4),
    ...ALL_CARDS.filter(c => c.number === 5),
    ...ALL_CARDS.filter(c => c.number === 6),
    ...ALL_CARDS.filter(c => c.number === 7),
    ...ALL_CARDS.filter(c => c.number === 8),
    ...ALL_CARDS.filter(c => c.number === 9),
  ];
  return deck;
};

/**
 * Shuffles an array of cards using the Fisher-Yates algorithm.
 * @param {Array} deck The deck to shuffle.
 * @returns {Array} The shuffled deck.
 */
export const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- Story Mode Logic ---

/**
 * Generates a random route for the story mode.
 * A route consists of 11 stages.
 */
export const generateRoute = () => {
  const route = [];

  // Helper to get a random element from an array
  const getRandomFromPool = (pool) => pool[Math.floor(Math.random() * pool.length)];

  // The route structure is roughly:
  // 5 early stages, 5 mid stages, 1 final boss stage.
  for (let i = 0; i < 5; i++) {
    route.push(getRandomFromPool(STAGE_POOLS.EARLY));
  }
  for (let i = 0; i < 5; i++) {
    route.push(getRandomFromPool(STAGE_POOLS.MID));
  }

  // Add the final boss stage
  route.push(STAGE_POOLS.FINAL[0]);

  // Add unique IDs to each stage for state management
  return route.map((stage, index) => ({ ...stage, id: `stage_${index}` }));
};
