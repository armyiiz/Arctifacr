// src/gameLogic.js
import { storyChapter, FACTIONS } from './storyData.js';

export { FACTIONS };

// Define stage types and their content
export const STAGE_TYPES = {
  BATTLE: 'BATTLE',
  TREASURE: 'TREASURE',
  REST: 'REST',
  BOSS: 'BOSS',
};

// Defines all unique card types in the game. This is the master database.
export const ALL_CARDS = [
    { id: 'T01', name: 'Traveller', art: 'Traveller', faction: FACTIONS.MIGHT },
    // Shadow Route (Ender) - TRICKERY
    { id: 'E01', name: 'Dark Rat', art: 'Dark_Rat', faction: FACTIONS.TRICKERY },
    { id: 'E02', name: 'Shadow Hound', art: 'Shadow_Hound', faction: FACTIONS.TRICKERY },
    { id: 'E03', name: 'Night Reaper', art: 'Night_Reaper', faction: FACTIONS.TRICKERY },
    { id: 'E04', name: 'Umbral Knight Commander', art: 'Umbral_Knight_Commander', faction: FACTIONS.TRICKERY },
    { id: 'B01', name: 'Ender', art: 'Ender', faction: FACTIONS.TRICKERY },
    // Earth Route (Gamma) - MIGHT
    { id: 'E05', name: 'Stone Imp', art: 'Stone_Imp', faction: FACTIONS.MIGHT },
    { id: 'E06', name: 'Rockback Boar', art: 'Rockback_Boar', faction: FACTIONS.MIGHT },
    { id: 'E07', name: 'Crystal Rhino', art: 'Crystal_Rhino', faction: FACTIONS.MIGHT },
    { id: 'E08', name: 'Colossus Titan', art: 'Colossus_Titan', faction: FACTIONS.MIGHT },
    { id: 'B02', name: 'Gamma', art: 'Gamma', faction: FACTIONS.MIGHT },
    // Steel Route (Razortail) - MIGHT
    { id: 'E09', name: 'Iron Ratling', art: 'Iron_Ratling', faction: FACTIONS.MIGHT },
    { id: 'E10', name: 'Steel Wolf', art: 'Steel_Wolf', faction: FACTIONS.MIGHT },
    { id: 'E11', name: 'Blade Golem', art: 'Blade_Golem', faction: FACTIONS.MIGHT },
    { id: 'E12', name: 'War Machine Juggernaut', art: 'War_Machine_Juggernaut', faction: FACTIONS.MIGHT },
    { id: 'B03', name: 'Razortail', art: 'Razortail', faction: FACTIONS.MIGHT },
    // Forest Route (Evergreen) - MAGIC
    { id: 'E13', name: 'Vine Serpent', art: 'Vine_Serpent', faction: FACTIONS.MAGIC },
    { id: 'E14', name: 'Spore Bear', art: 'Spore_Bear', faction: FACTIONS.MAGIC },
    { id: 'E15', name: 'Ancient Treant Warrior', art: 'Ancient_Treant_Warrior', faction: FACTIONS.MAGIC },
    { id: 'E16', name: 'Greatwood Guardian', art: 'Greatwood_Guardian', faction: FACTIONS.MAGIC },
    { id: 'B04', name: 'Evergreen', art: 'Evergreen', faction: FACTIONS.MAGIC },
    // Radiance Route (Oryu) - MAGIC
    { id: 'E17', name: 'Golden Hawk', art: 'Golden_Hawk', faction: FACTIONS.MAGIC },
    { id: 'E18', name: 'Sun Stag', art: 'Sun_Stag', faction: FACTIONS.MAGIC },
    { id: 'E19', name: 'Radiant Knight', art: 'Radiant_Knight', faction: FACTIONS.MAGIC },
    { id: 'E20', name: 'Seraph Judge', art: 'Seraph_Judge', faction: FACTIONS.MAGIC },
    { id: 'B05', name: 'Oryu', art: 'Oryu', faction: FACTIONS.MAGIC },
    // Storm Route (Chrome) - MAGIC
    { id: 'E21', name: 'Storm Crow', art: 'Storm_Crow', faction: FACTIONS.MAGIC },
    { id: 'E22', name: 'Thunder Lizard', art: 'Thunder_Lizard', faction: FACTIONS.MAGIC },
    { id: 'E23', name: 'Cyclone Djinn', art: 'Cyclone_Djinn', faction: FACTIONS.MAGIC },
    { id: 'E24', name: 'Tempest Colossus', art: 'Tempest_Colossus', faction: FACTIONS.MAGIC },
    { id: 'B06', name: 'Chrome', art: 'Chrome', faction: FACTIONS.MAGIC },
    // Illusion Route (Escalon) - TRICKERY
    { id: 'E25', name: 'Trickster Goblin', art: 'Trickster_Goblin', faction: FACTIONS.TRICKERY },
    { id: 'E26', name: 'Mirror Stalker', art: 'Mirror_Stalker', faction: FACTIONS.TRICKERY },
    { id: 'E27', name: 'Dream Hunter', art: 'Dream_Hunter', faction: FACTIONS.TRICKERY },
    { id: 'E28', name: 'Vision Warlock', art: 'Vision_Warlock', faction: FACTIONS.TRICKERY },
    { id: 'B07', name: 'Escalon', art: 'Escalon', faction: FACTIONS.TRICKERY },
    // Cosmic Route (Fresia) - MIGHT
    { id: 'E29', name: 'Falling Starling', art: 'Falling_Starling', faction: FACTIONS.MIGHT },
    { id: 'E30', name: 'Meteor Brute', art: 'Meteor_Brute', faction: FACTIONS.MIGHT },
    { id: 'E31', name: 'Astral Serpent', art: 'Astral_Serpent', faction: FACTIONS.MIGHT },
    { id: 'E32', name: 'Void Sentinel', art: 'Void_Sentinel', faction: FACTIONS.MIGHT },
    { id: 'B08', name: 'Fresia', art: 'Fresia', faction: FACTIONS.MIGHT },
    // Underworld Route (Specter) - TRICKERY
    { id: 'E33', name: 'Bone Hound', art: 'Bone_Hound', faction: FACTIONS.TRICKERY },
    { id: 'E34', name: 'Wailing Ghoul', art: 'Wailing_Ghoul', faction: FACTIONS.TRICKERY },
    { id: 'E35', name: 'Death Knight', art: 'Death_Knight', faction: FACTIONS.TRICKERY },
    { id: 'E36', name: 'Herald of the Underworld', art: 'Herald_of_the_Underworld', faction: FACTIONS.TRICKERY },
    { id: 'B09', name: 'Specter', art: 'Specter', faction: FACTIONS.TRICKERY },
];

// Function to get a card's data by its ID
export const getCardById = (id) => ALL_CARDS.find(card => card.id === id);


/**
 * Creates a standard 12-card player deck for battles.
 * If a custom deck is provided (from DeckEdit), it will be used.
 * Otherwise, a default deck of 12 Traveller cards is created.
 */
export const createPlayerDeck = (customDeck) => {
  // TODO: The customDeck logic will be implemented with the Deck Edit screen.
  // For now, we always create the default deck.

  const deck = [];
  const travellerCardTemplate = getCardById('T01');
  let cardInstanceId = 0;

  const deckComposition = [
    { number: 9, count: 1 },
    { number: 8, count: 1 },
    { number: 7, count: 1 },
    { number: 6, count: 1 },
    { number: 5, count: 1 },
    { number: 4, count: 1 },
    { number: 3, count: 1 },
    { number: 2, count: 2 },
    { number: 1, count: 3 },
  ];

  deckComposition.forEach(comp => {
    for (let i = 0; i < comp.count; i++) {
      deck.push({
        ...travellerCardTemplate,
        id: `p_instance_${cardInstanceId++}`, // This is a unique ID for the card *in this specific battle*
        number: comp.number, // The assigned number for this instance
        typeId: 'T01' // A reference back to the master card ID
      });
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

    const enemyCardInfo = Array.isArray(enemyConfig) ? enemyConfig[0] : enemyConfig;
    // Use the faction from the enemy config if available
    const enemyFaction = enemyCardInfo.faction || FACTIONS.MIGHT;

    let idCounter = 0;
    baseDeck.forEach(cardDef => {
        for (let i = 0; i < cardDef.count; i++) {
            deck.push({
                id: `e${idCounter++}`,
                name: enemyCardInfo.name,
                number: cardDef.number,
                art: `/art/cards/${enemyCardInfo.art}.webp`,
                faction: enemyFaction
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

        if (restStopUsed) {
            possibleStages = possibleStages.filter(s => s.type !== STAGE_TYPES.REST);
        }

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
