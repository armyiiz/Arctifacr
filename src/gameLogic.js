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
  { id: 'c001', name: 'Traveler', art: '/art/cards/Traveler.png', baseNumber: 1 },
  { id: 'c002', name: 'Traveler', art: '/art/cards/Traveler.png', baseNumber: 2 },
  { id: 'c003', name: 'Traveler', art: '/art/cards/Traveler.png', baseNumber: 3 },
  { id: 'c004', name: 'Traveler', art: '/art/cards/Traveler.png', baseNumber: 4 },
  { id: 'c005', name: 'Traveler', art: '/art/cards/Traveler.png', baseNumber: 5 },
  { id: 'c006', name: 'Traveler', art: '/art/cards/Traveler.png', baseNumber: 6 },
  { id: 'c007', name: 'Traveler', art: '/art/cards/Traveler.png', baseNumber: 7 },
  { id: 'c008', name: 'Traveler', art: '/art/cards/Traveler.png', baseNumber: 8 },
  { id: 'c009', name: 'Traveler', art: '/art/cards/Traveler.png', baseNumber: 9 },
  // Shadow Route
  { id: 'e001', name: 'Dark_Rat', art: '/art/cards/Dark_Rat.png', baseNumber: 2 },
  { id: 'e002', name: 'Shadow_Hound', art: '/art/cards/Shadow_Hound.png', baseNumber: 4 },
  { id: 'e003', name: 'Night_Reaper', art: '/art/cards/Night_Reaper.png', baseNumber: 6 },
  { id: 'e004', name: 'Umbral_Knight_Commander', art: '/art/cards/Umbral_Knight_Commander.png', baseNumber: 8 },
  // Earth Route
  { id: 'e005', name: 'Stone_Imp', art: '/art/cards/Stone_Imp.png', baseNumber: 2 },
  { id: 'e006', name: 'Rockback_Boar', art: '/art/cards/Rockback_Boar.png', baseNumber: 4 },
  { id: 'e007', name: 'Crystal_Rhino', art: '/art/cards/Crystal_Rhino.png', baseNumber: 6 },
  { id: 'e008', name: 'Colossus_Titan', art: '/art/cards/Colossus_Titan.png', baseNumber: 8 },
  // Steel Route
  { id: 'e009', name: 'Iron_Ratling', art: '/art/cards/Iron_Ratling.png', baseNumber: 2 },
  { id: 'e010', name: 'Steel_Wolf', art: '/art/cards/Steel_Wolf.png', baseNumber: 4 },
  { id: 'e011', name: 'Blade_Golem', art: '/art/cards/Blade_Golem.png', baseNumber: 6 },
  { id: 'e012', name: 'War_Machine_Juggernaut', art: '/art/cards/War_Machine_Juggernaut.png', baseNumber: 8 },
  // Forest Route
  { id: 'e013', name: 'Vine_Serpent', art: '/art/cards/Vine_Serpent.png', baseNumber: 2 },
  { id: 'e014', name: 'Spore_Bear', art: '/art/cards/Spore_Bear.png', baseNumber: 4 },
  { id: 'e015', name: 'Ancient_Treant_Warrior', art: '/art/cards/Ancient_Treant_Warrior.png', baseNumber: 6 },
  { id: 'e016', name: 'Greatwood_Guardian', art: '/art/cards/Greatwood_Guardian.png', baseNumber: 8 },
  // Radiance Route
  { id: 'e017', name: 'Golden_Hawk', art: '/art/cards/Golden_Hawk.png', baseNumber: 2 },
  { id: 'e018', name: 'Sun_Stag', art: '/art/cards/Sun_Stag.png', baseNumber: 4 },
  { id: 'e019', name: 'Radiant_Knight', art: '/art/cards/Radiant_Knight.png', baseNumber: 6 },
  { id: 'e020', name: 'Seraph_Judge', art: '/art/cards/Seraph_Judge.png', baseNumber: 8 },
  // Storm Route
  { id: 'e021', name: 'Storm_Crow', art: '/art/cards/Storm_Crow.png', baseNumber: 2 },
  { id: 'e022', name: 'Thunder_Lizard', art: '/art/cards/Thunder_Lizard.png', baseNumber: 4 },
  { id: 'e023', name: 'Cyclone_Djinn', art: '/art/cards/Cyclone_Djinn.png', baseNumber: 6 },
  { id: 'e024', name: 'Tempest_Colossus', art: '/art/cards/Tempest_Colossus.png', baseNumber: 8 },
  // Illusion Route
  { id: 'e025', name: 'Trickster_Goblin', art: '/art/cards/Trickster_Goblin.png', baseNumber: 2 },
  { id: 'e026', name: 'Mirror_Stalker', art: '/art/cards/Mirror_Stalker.png', baseNumber: 4 },
  { id: 'e027', name: 'Dream_Hunter', art: '/art/cards/Dream_Hunter.png', baseNumber: 6 },
  { id: 'e028', name: 'Vision_Warlock', art: '/art/cards/Vision_Warlock.png', baseNumber: 8 },
  // Cosmic Route
  { id: 'e029', name: 'Falling_Starling', art: '/art/cards/Falling_Starling.png', baseNumber: 2 },
  { id: 'e030', name: 'Meteor_Brute', art: '/art/cards/Meteor_Brute.png', baseNumber: 4 },
  { id: 'e031', name: 'Astral_Serpent', art: '/art/cards/Astral_Serpent.png', baseNumber: 6 },
  { id: 'e032', name: 'Void_Sentinel', art: '/art/cards/Void_Sentinel.png', baseNumber: 8 },
  // Death Route
  { id: 'e033', name: 'Bone_Hound', art: '/art/cards/Bone_Hound.png', baseNumber: 2 },
  { id: 'e034', name: 'Wailing_Ghoul', art: '/art/cards/Wailing_Ghoul.png', baseNumber: 4 },
  { id: 'e035', name: 'Death_Knight', art: '/art/cards/Death_Knight.png', baseNumber: 6 },
  { id: 'e036', name: 'Herald_of_the_Underworld', art: '/art/cards/Herald_of_the_Underworld.png', baseNumber: 8 },
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
                art: `/art/cards/${enemyCardInfo.art}.png`,
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
