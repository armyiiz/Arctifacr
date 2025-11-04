// src/gameLogic.js
import { ENEMIES, ENEMY_DECKS, storyChapter } from './storyData.js';


// Define stage types and their content
export const STAGE_TYPES = {
  BATTLE: 'BATTLE',
  TREASURE: 'TREASURE',
  REST: 'REST',
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
    return UNIQUE_CARDS.map(card => ({ ...card, number: card.baseNumber }));
};


/**
 * Creates a standard 12-card player deck based on the game rules.
 */
export const createPlayerDeck = (customDeck) => {
  if (customDeck) {
    return customDeck.map((cardName, index) => {
      const cardTemplate = UNIQUE_CARDS.find(c => c.name === cardName);
      return { ...cardTemplate, id: `p${index}`, number: cardTemplate.baseNumber };
    });
  }

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

  const deck = [];
  let cardIdCounter = 0;
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

export const createEnemyDeck = (enemyConfig) => {
    const deck = [];
    const baseDeck = [
        { number: 1, count: 3 }, { number: 2, count: 2 }, { number: 3, count: 1 },
        { number: 4, count: 1 }, { number: 5, count: 1 }, { number: 6, count: 1 },
        { number: 7, count: 1 }, { number: 8, count: 1 }, { number: 9, count: 1 },
    ];

    // Handle both array (from BattleScreen) and object (from generateRoute)
    const enemyCardInfo = Array.isArray(enemyConfig) ? enemyConfig[0] : enemyConfig;

    let idCounter = 0;
    baseDeck.forEach(cardDef => {
        for (let i = 0; i < cardDef.count; i++) {
            deck.push({
                id: `e${idCounter++}`,
                name: enemyCardInfo.name,
                number: cardDef.number,
                art: enemyCardInfo.art,
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
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createBattleStage = (enemy, level) => ({
    type: STAGE_TYPES.BATTLE,
    enemy: { ...enemy, hp: level, level: level },
    deck: createEnemyDeck(enemy),
});

export const generateRoute = (bossId) => {
    const chapter = storyChapter[bossId];
    if (!chapter) {
        console.error("Invalid bossId:", bossId);
        return [];
    }

    const route = [];
    let restStopUsed = false;
    let treasureCount = 0;

    // Stage 1: Regular monster
    route.push(createBattleStage(chapter.monsters[0], getRandomInt(1, 3)));

    const stagePools = {
        2: [createBattleStage(chapter.monsters[0], getRandomInt(2, 3)), { type: STAGE_TYPES.TREASURE }],
        3: [createBattleStage(chapter.monsters[0], getRandomInt(2, 3)), { type: STAGE_TYPES.TREASURE }, { type: STAGE_TYPES.REST, fullHeal: false }],
        4: [createBattleStage(chapter.monsters[1], getRandomInt(3, 4)), { type: STAGE_TYPES.TREASURE }, { type: STAGE_TYPES.REST, fullHeal: false }],
        5: [createBattleStage(chapter.monsters[1], getRandomInt(3, 4)), { type: STAGE_TYPES.TREASURE }, { type: STAGE_TYPES.REST, fullHeal: false }],
        6: [createBattleStage(chapter.monsters[1], getRandomInt(4, 5)), { type: STAGE_TYPES.TREASURE }, { type: STAGE_TYPES.REST, fullHeal: false }],
        7: [createBattleStage(chapter.monsters[2], getRandomInt(4, 5)), { type: STAGE_TYPES.TREASURE }, { type: STAGE_TYPES.REST, fullHeal: false }],
        8: [createBattleStage(chapter.monsters[2], getRandomInt(5, 7)), { type: STAGE_TYPES.TREASURE }, { type: STAGE_TYPES.REST, fullHeal: false }],
    };

    for (let i = 2; i <= 8; i++) {
        let possibleStages = [...stagePools[i]];

        // Filter out rest stops if one has already been used
        if (restStopUsed) {
            possibleStages = possibleStages.filter(s => s.type !== STAGE_TYPES.REST);
        }

        // Filter out treasure if 2 have been found, or if the previous stage was treasure
        if (treasureCount >= 2 || (route.length > 0 && route[route.length - 1].type === STAGE_TYPES.TREASURE)) {
            possibleStages = possibleStages.filter(s => s.type !== STAGE_TYPES.TREASURE);
        }

        const stage = possibleStages[Math.floor(Math.random() * possibleStages.length)];

        if (stage.type === STAGE_TYPES.REST) restStopUsed = true;
        if (stage.type === STAGE_TYPES.TREASURE) treasureCount++;

        route.push(stage);
    }

    // Stage 9: Mini-boss
    route.push(createBattleStage(chapter.miniBoss, getRandomInt(8, 10)));

    // Stage 10: Full Rest
    route.push({ type: STAGE_TYPES.REST, fullHeal: true });

    // Stage 11: Boss
    route.push({
        type: STAGE_TYPES.BOSS,
        enemy: { ...chapter.boss, hp: 15, level: 15 },
        deck: createEnemyDeck(chapter.boss),
    });

    return route.map((stage, index) => ({ ...stage, id: `stage_${index}` }));
};
