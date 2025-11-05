// src/gameLogic.js
import { ENEMIES, ENEMY_DECKS, storyChapter } from './storyData.js';


// Define stage types and their content
export const STAGE_TYPES = {
  BATTLE: 'BATTLE',
  TREASURE: 'TREASURE',
  REST: 'REST',
  BOSS: 'BOSS',
};

// Defines all unique card types in the game. This is the master database.
export const ALL_CARDS = [
    { id: 'T01', name: 'Traveller', art: 'Traveller' },
    // Shadow Route (Ender)
    { id: 'E01', name: 'Dark Rat', art: 'Dark_Rat' },
    { id: 'E02', name: 'Shadow Hound', art: 'Shadow_Hound' },
    { id: 'E03', name: 'Night Reaper', art: 'Night_Reaper' },
    { id: 'E04', name: 'Umbral Knight Commander', art: 'Umbral_Knight_Commander' },
    { id: 'B01', name: 'Ender', art: 'Ender' },
    // Earth Route (Gamma)
    { id: 'E05', name: 'Stone Imp', art: 'Stone_Imp' },
    { id: 'E06', name: 'Rockback Boar', art: 'Rockback_Boar' },
    { id: 'E07', name: 'Crystal Rhino', art: 'Crystal_Rhino' },
    { id: 'E08', name: 'Colossus Titan', art: 'Colossus_Titan' },
    { id: 'B02', name: 'Gamma', art: 'Gamma' },
    // Steel Route (Razortail)
    { id: 'E09', name: 'Iron Ratling', art: 'Iron_Ratling' },
    { id: 'E10', name: 'Steel Wolf', art: 'Steel_Wolf' },
    { id: 'E11', name: 'Blade Golem', art: 'Blade_Golem' },
    { id: 'E12', name: 'War Machine Juggernaut', art: 'War_Machine_Juggernaut' },
    { id: 'B03', name: 'Razortail', art: 'Razortail' },
    // Forest Route (Evergreen)
    { id: 'E13', name: 'Vine Serpent', art: 'Vine_Serpent' },
    { id: 'E14', name: 'Spore Bear', art: 'Spore_Bear' },
    { id: 'E15', name: 'Ancient Treant Warrior', art: 'Ancient_Treant_Warrior' },
    { id: 'E16', name: 'Greatwood Guardian', art: 'Greatwood_Guardian' },
    { id: 'B04', name: 'Evergreen', art: 'Evergreen' },
    // Radiance Route (Oryu)
    { id: 'E17', name: 'Golden Hawk', art: 'Golden_Hawk' },
    { id: 'E18', name: 'Sun Stag', art: 'Sun_Stag' },
    { id: 'E19', name: 'Radiant Knight', art: 'Radiant_Knight' },
    { id: 'E20', name: 'Seraph Judge', art: 'Seraph_Judge' },
    { id: 'B05', name: 'Oryu', art: 'Oryu' },
    // Storm Route (Chrome)
    { id: 'E21', name: 'Storm Crow', art: 'Storm_Crow' },
    { id: 'E22', name: 'Thunder Lizard', art: 'Thunder_Lizard' },
    { id: 'E23', name: 'Cyclone Djinn', art: 'Cyclone_Djinn' },
    { id: 'E24', name: 'Tempest Colossus', art: 'Tempest_Colossus' },
    { id: 'B06', name: 'Chrome', art: 'Chrome' },
    // Illusion Route (Escalon)
    { id: 'E25', name: 'Trickster Goblin', art: 'Trickster_Goblin' },
    { id: 'E26', name: 'Mirror Stalker', art: 'Mirror_Stalker' },
    { id: 'E27', name: 'Dream Hunter', art: 'Dream_Hunter' },
    { id: 'E28', name: 'Vision Warlock', art: 'Vision_Warlock' },
    { id: 'B07', name: 'Escalon', art: 'Escalon' },
    // Cosmic Route (Fresia)
    { id: 'E29', name: 'Falling Starling', art: 'Falling_Starling' },
    { id: 'E30', name: 'Meteor Brute', art: 'Meteor_Brute' },
    { id: 'E31', name: 'Astral Serpent', art: 'Astral_Serpent' },
    { id: 'E32', name: 'Void Sentinel', art: 'Void_Sentinel' },
    { id: 'B08', name: 'Fresia', art: 'Fresia' },
    // Underworld Route (Specter)
    { id: 'E33', name: 'Bone Hound', art: 'Bone_Hound' },
    { id: 'E34', name: 'Wailing Ghoul', art: 'Wailing_Ghoul' },
    { id: 'E35', name: 'Death Knight', art: 'Death_Knight' },
    { id: 'E36', name: 'Herald of the Underworld', art: 'Herald_of_the_Underworld' },
    { id: 'B09', name: 'Specter', art: 'Specter' },
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
