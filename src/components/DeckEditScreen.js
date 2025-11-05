import React, { useState, useEffect } from 'react';
import './DeckEditScreen.css';
import Card from './Card';
import { getCardById } from '../gameLogic';

// Defines the structure of a player's deck
const DECK_SLOTS = [
  { number: 9, count: 1 }, { number: 8, count: 1 }, { number: 7, count: 1 },
  { number: 6, count: 1 }, { number: 5, count: 1 }, { number: 4, count: 1 },
  { number: 3, count: 1 }, { number: 2, count: 2 }, { number: 1, count: 3 },
];

const DeckEditScreen = ({ onBack, playerCollection }) => {
  const [savedDecks, setSavedDecks] = useState(() => {
    const saved = localStorage.getItem('playerDecks');
    return saved ? JSON.parse(saved) : [{ name: 'Default Deck', slots: {} }];
  });
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(0);
  const [deckName, setDeckName] = useState(savedDecks[0].name);
  const [deckSlots, setDeckSlots] = useState(savedDecks[0].slots);

  const [draggingCardId, setDraggingCardId] = useState(null);

  const ownedCardIds = Object.keys(playerCollection);

  // Calculate available cards for dragging
  const availableCollection = { ...playerCollection };
  Object.values(deckSlots).forEach(cardId => {
    if (cardId && availableCollection[cardId]) {
      availableCollection[cardId]--;
    }
  });

  const handleDragStart = (cardId) => {
    setDraggingCardId(cardId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (slotNumber, slotIndex) => {
    if (!draggingCardId) return;

    // Check if the card is available
    if (availableCollection[draggingCardId] > 0) {
      const newDeckSlots = { ...deckSlots };
      const slotKey = `${slotNumber}-${slotIndex}`;

      // If there was a card in the slot, put it back to the collection
      const previousCardId = newDeckSlots[slotKey];
      if (previousCardId) {
        // This part can be improved if we want to swap cards directly
      }

      newDeckSlots[slotKey] = draggingCardId;
      setDeckSlots(newDeckSlots);
    }
    setDraggingCardId(null);
  };

  const handleRemoveCard = (slotKey) => {
    const newDeckSlots = { ...deckSlots };
    delete newDeckSlots[slotKey];
    setDeckSlots(newDeckSlots);
  };

  const isDeckComplete = () => {
    const totalSlots = DECK_SLOTS.reduce((acc, slot) => acc + slot.count, 0);
    return Object.keys(deckSlots).length === totalSlots;
  };

  const handleSaveDeck = () => {
    const newSavedDecks = [...savedDecks];
    newSavedDecks[selectedDeckIndex] = { name: deckName, slots: deckSlots };
    setSavedDecks(newSavedDecks);
    localStorage.setItem('playerDecks', JSON.stringify(newSavedDecks));
    alert('Deck saved!');
  };

  return (
    <div className="deck-edit-screen">
      <div className="collection-panel">
        <h2>Your Collection</h2>
        <div className="collection-grid-dedit">
          {ownedCardIds.map(cardId => {
            const count = availableCollection[cardId];
            if (count <= 0) return null;
            const cardData = getCardById(cardId);
            return (
              <div
                key={cardId}
                className="collection-card-item-dedit"
                draggable
                onDragStart={() => handleDragStart(cardId)}
              >
                <Card card={{...cardData, number: null}} isFaceUp={true} />
                <div className="card-count-dedit">{`x${count}`}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="deck-panel">
        <div className="deck-header">
            <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="deck-name-input"
            />
            {/* Deck selection dropdown can be added here */}
        </div>
        <div className="deck-slots-grid">
          {DECK_SLOTS.map(({ number, count }) => (
            <div key={number} className="deck-slot-group">
              <div className="slot-number-label">{`Number ${number}`}</div>
              <div className="slots-container">
                {Array.from({ length: count }).map((_, index) => {
                  const slotKey = `${number}-${index}`;
                  const cardIdInSlot = deckSlots[slotKey];
                  const cardData = cardIdInSlot ? getCardById(cardIdInSlot) : null;
                  return (
                    <div
                      key={slotKey}
                      className={`deck-slot ${cardData ? 'filled' : ''}`}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(number, index)}
                    >
                      {cardData ? (
                        <>
                          <Card card={{...cardData, number: number}} isFaceUp={true} />
                          <button className="remove-card-btn" onClick={() => handleRemoveCard(slotKey)}>X</button>
                        </>
                      ) : (
                        <span className="placeholder-number">{number}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="deck-actions">
            <button onClick={handleSaveDeck} disabled={!isDeckComplete()}>
              {isDeckComplete() ? 'Save Deck' : `Deck Incomplete (${Object.keys(deckSlots).length}/12)`}
            </button>
            <button onClick={onBack}>Back to Menu</button>
        </div>
      </div>
    </div>
  );
};

export default DeckEditScreen;
