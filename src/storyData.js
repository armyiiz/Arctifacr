// src/storyData.js

// Helper function to create simple card objects for enemy decks
const createEnemyCard = (number, id) => ({ id: `e_${id}`, name: `Enemy Card ${number}`, number, art: 'Enemy' });

// Helper to build a deck from a simple config
const createEnemyDeck = (config) => {
    const deck = [];
    let idCounter = 0;
    for (const [number, count] of Object.entries(config)) {
        for (let i = 0; i < count; i++) {
            deck.push(createEnemyCard(parseInt(number), idCounter++));
        }
    }
    return deck;
};


// Define enemy types
export const ENEMIES = {
  GOBLIN: { id: 'GOBLIN', name: 'Goblin', art: 'Goblin' },
  ORC: { id: 'ORC', name: 'Orc', art: 'Orc' },
  MAGE: { id: 'MAGE', name: 'Dark Mage', art: 'Mage' },
  BOSS_KNIGHT: { id: 'BOSS_KNIGHT', name: 'Fallen Knight', art: 'Knight' },
};

// Define enemy decks
export const ENEMY_DECKS = {
  EASY_DECK: createEnemyDeck({ 1: 4, 2: 3, 3: 2, 4: 1, 5: 1, 6: 1 }),
  MEDIUM_DECK: createEnemyDeck({ 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 1, 7: 1, 8: 1 }),
  BOSS_DECK: createEnemyDeck({ 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 }),
};

// No longer needed here
