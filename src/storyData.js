// src/storyData.js

// Using ALL_CARDS from gameLogic to build decks
import { ALL_CARDS } from './gameLogic.js';

// Define enemy types
export const ENEMIES = {
  GOBLIN: { id: 'GOBLIN', name: 'Goblin', art: 'Goblin' },
  ORC: { id: 'ORC', name: 'Orc', art: 'Orc' },
  MAGE: { id: 'MAGE', name: 'Dark Mage', art: 'Mage' },
  BOSS_KNIGHT: { id: 'BOSS_KNIGHT', name: 'Fallen Knight', art: 'Knight' },
};

// Define enemy decks
export const ENEMY_DECKS = {
  EASY_DECK: [
    ...ALL_CARDS.filter(c => c.number === 1).slice(0, 4), // 4x 1
    ...ALL_CARDS.filter(c => c.number === 2).slice(0, 3), // 3x 2
    ...ALL_CARDS.filter(c => c.number === 3).slice(0, 2), // 2x 3
    ...ALL_CARDS.filter(c => c.number === 4),             // 1x 4
    ...ALL_CARDS.filter(c => c.number === 5),             // 1x 5
    ...ALL_CARDS.filter(c => c.number === 6),             // 1x 6
  ],
  MEDIUM_DECK: [
    ...ALL_CARDS.filter(c => c.number === 1).slice(0, 2),
    ...ALL_CARDS.filter(c => c.number === 2),
    ...ALL_CARDS.filter(c => c.number === 3),
    ...ALL_CARDS.filter(c => c.number === 4),
    ...ALL_CARDS.filter(c => c.number === 5),
    ...ALL_CARDS.filter(c => c.number === 6),
    ...ALL_CARDS.filter(c => c.number === 7),
    ...ALL_CARDS.filter(c => c.number === 8),
  ],
  BOSS_DECK: [
    ...ALL_CARDS.filter(c => c.number >= 4), // All high cards
  ]
};

// Define stage types and their content
export const STAGE_TYPES = {
  BATTLE: 'BATTLE',
  ELITE_BATTLE: 'ELITE_BATTLE',
  TREASURE: 'TREASURE',
  SHOP: 'SHOP',
  BOSS: 'BOSS',
};

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
