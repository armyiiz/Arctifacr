// src/gameLogic.js

// Define stage types and their content
export const STAGE_TYPES = {
  BATTLE: 'BATTLE',
  ELITE_BATTLE: 'ELITE_BATTLE',
  TREASURE: 'TREASURE',
  SHOP: 'SHOP',
  BOSS: 'BOSS',
};

// Defines all unique card types in the game.
const UNIQUE_CARDS = [
  { id: 'c001', name: 'Traveler', art: 'Traveler', baseNumber: 1 },
  { id: 'c002', name: 'Traveler', art: 'Traveler', baseNumber: 2 },
  { id: 'c003', name: 'Traveler', art: 'Traveler', baseNumber: 3 },
  { id: 'c004', name: 'Traveler', art: 'Traveler', baseNumber: 4 },
  { id: 'c005', name: 'Traveler', art: 'Traveler', baseNumber: 5 },
  { id: 'c006', name: 'Traveler', art: 'Traveler', baseNumber: 6 },
  { id: 'c007', name: 'Traveler', art: 'Traveler', baseNumber: 7 },
  { id: 'c008', name: 'Traveler', art: 'Traveler', baseNumber: 8 },
  { id: 'c009', name: 'Traveler', art: 'Traveler', baseNumber: 9 },
  // Shadow Route
  { id: 'e001', name: 'Dark_Rat', art: 'Dark_Rat', baseNumber: 2 },
  { id: 'e002', name: 'Shadow_Hound', art: 'Shadow_Hound', baseNumber: 4 },
  // ... add all other cards here
];

// Function to get a list of all unique cards, used for collection, deck building, etc.
export const getAllCards = () => {
    // In the future, this could be more complex, but for now, we just return the master list.
    // We map it to assign a 'current' number, which might be modified by in-game effects.
    return UNIQUE_CARDS.map(card => ({ ...card, number: card.baseNumber }));
};


/**
 * Creates a standard 12-card player deck based on the game rules.
 * This function will be expanded to use the player's customized deck.
 */
export const createPlayerDeck = (customDeck) => {
  if (customDeck) {
    // Logic to build deck from player's saved configuration
    return customDeck.map((cardName, index) => {
      const cardTemplate = UNIQUE_CARDS.find(c => c.name === cardName);
      return { ...cardTemplate, id: `p${index}`, number: cardTemplate.baseNumber };
    });
  }

  // Default starter deck if no custom deck is provided
  const starterDeckComposition = { 'Traveler': 12 }; // Should be more specific based on numbers
  const deck = [];
  let cardIdCounter = 0;

  // This logic needs to be updated to match the 3x1, 2x2, etc. rule
  const defaultDeckConfig = [
      { name: 'Traveler', number: 1, count: 3 },
      { name: 'Traveler', number: 2, count: 2 },
      { name: 'Traveler', number: 3, count: 1 },
      { name: 'Traveler', number: 4, count: 1 },
      { name: 'Traveler', number: 5, count: 1 },
      { name: 'Traveler', number: 6, count: 1 },
      { name: 'Traveler', number: 7, count: 1 },
      { name: 'Traveler', number: 8, count: 1 },
      { name: 'Traveler', number: 9, count: 1 },
  ];

  defaultDeckConfig.forEach(config => {
      for (let i = 0; i < config.count; i++) {
          const cardTemplate = UNIQUE_CARDS.find(c => c.name === config.name && c.baseNumber === config.number);
          if (cardTemplate) {
              deck.push({ ...cardTemplate, id: `p${cardIdCounter++}`, number: cardTemplate.baseNumber });
          }
      }
  });


  return deck;
};

export const createEnemyDeck = (deckConfig) => {
  const deck = [];
  let idCounter = 0;
  deckConfig.forEach(cardInfo => {
    for (let i = 0; i < cardInfo.count; i++) {
      deck.push({
        id: `e${idCounter++}`,
        name: cardInfo.name,
        number: cardInfo.number,
        art: cardInfo.art,
      });
    }
  });
  return deck;
};

// ... (shuffleDeck logic remains the same)
export const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- Story Mode Logic ---
import { ENEMIES, ENEMY_DECKS } from './storyData.js';

// Pools of encounters for different parts of the route
export const STAGE_POOLS = {
  EARLY: [
    { type: STAGE_TYPES.BATTLE, enemy: ENEMIES.GOBLIN, deck: ENEMY_DECKS.EASY_DECK },
    { type: STAGE_TYPES.BATTLE, enemy: ENEMIES.GOBLIN, deck: ENEMY_DECKS.EASY_DECK },
    { type: STAGE_TYPES.TREASURE },
    { type: STAGE_TYPES.SHOP },
  ],
  MID: [
    { type: STAGE_TYPES.BATTLE, enemy: ENEMIES.ORC, deck: ENEMY_DECKS.MEDIUM_DECK },
    { type: STAGE_TYPES.ELITE_BATTLE, enemy: ENEMIES.MAGE, deck: ENEMY_DECKS.MEDIUM_DECK },
    { type: STAGE_TYPES.TREASURE },
    { type: STAGE_TYPES.SHOP },
  ],
  FINAL: [
    { type: STAGE_TYPES.BOSS, enemy: ENEMIES.BOSS_KNIGHT, deck: ENEMY_DECKS.BOSS_DECK },
  ]
};


/**
 * Generates a random route for the story mode.
 * A route consists of 11 stages.
 */
export const generateRoute = () => {
  const route = [];
  const getRandomFromPool = (pool) => pool[Math.floor(Math.random() * pool.length)];

  for (let i = 0; i < 5; i++) {
    route.push(getRandomFromPool(STAGE_POOLS.EARLY));
  }
  for (let i = 0; i < 5; i++) {
    route.push(getRandomFromPool(STAGE_POOLS.MID));
  }
  route.push(STAGE_POOLS.FINAL[0]);

  return route.map((stage, index) => ({ ...stage, id: `stage_${index}` }));
};
