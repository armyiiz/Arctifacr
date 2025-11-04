import React, { useState, useEffect, useCallback } from 'react';
import './DeckEditScreen.css';
import Card from './Card';
import { getAllCards } from '../gameLogic';

const DECK_SLOTS = 10;

const DeckEditScreen = ({ onBack, playerCollection }) => {
  const [allDecks, setAllDecks] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(0);

  // State for the currently displayed deck and its name
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentDeckName, setCurrentDeckName] = useState('');

  // --- Initial Loading Effect ---
  useEffect(() => {
    // Load all decks or create default structure
    const savedDecks = JSON.parse(localStorage.getItem('all_decks'));
    if (savedDecks && savedDecks.length === DECK_SLOTS) {
      setAllDecks(savedDecks);
    } else {
      const defaultDecks = Array.from({ length: DECK_SLOTS }, (_, i) => ({
        name: `Deck ${i + 1}`,
        cards: [],
      }));
      setAllDecks(defaultDecks);
    }
  }, []);

  // --- Effect to update UI when selected slot changes ---
  useEffect(() => {
    if (allDecks.length > 0) {
      const selected = allDecks[selectedSlot];
      setCurrentDeck(selected.cards || []);
      setCurrentDeckName(selected.name || `Deck ${selectedSlot + 1}`);
    }
  }, [selectedSlot, allDecks]);

  const handleSaveDeck = () => {
    if (currentDeck.length !== 12) {
      alert('A deck must contain exactly 12 cards.');
      return;
    }

    const updatedDecks = [...allDecks];
    updatedDecks[selectedSlot] = { name: currentDeckName, cards: currentDeck };

    setAllDecks(updatedDecks);
    localStorage.setItem('all_decks', JSON.stringify(updatedDecks));

    // Also save the current deck as the "active" one for the battle screen to use
    localStorage.setItem('active_deck', JSON.stringify(currentDeck));

    alert(`'${currentDeckName}' saved successfully in Slot ${selectedSlot + 1}!`);
  };

  const allCards = getAllCards();

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('card', JSON.stringify(card));
  };

  const handleDropOnDeck = (e) => {
    e.preventDefault();
    if (currentDeck.length >= 12) return;

    const cardData = JSON.parse(e.dataTransfer.getData('card'));
    const collectionCount = playerCollection[cardData.name] || 0;
    const deckCount = currentDeck.filter(c => c.name === cardData.name).length;

    if (collectionCount > deckCount) {
      setCurrentDeck([...currentDeck, cardData]);
    } else {
      alert(`You don't have any more "${cardData.name}" cards in your collection.`);
    }
  };

  const handleRemoveFromDeck = (indexToRemove) => {
    setCurrentDeck(currentDeck.filter((_, index) => index !== indexToRemove));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="deck-edit-screen">
      <h1 className="deck-edit-title">Deck Editor</h1>
      <div className="deck-management">
        <label htmlFor="deck-slot-selector">Deck Slot:</label>
        <select
          id="deck-slot-selector"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(Number(e.target.value))}
        >
          {allDecks.map((deck, index) => (
            <option key={index} value={index}>
              {index + 1}. {deck.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={currentDeckName}
          onChange={(e) => setCurrentDeckName(e.target.value)}
          className="deck-name-input"
        />
      </div>
      <div className="deck-editor-layout">
        <div className="collection-panel">
          <h2>Your Collection</h2>
          <div className="collection-grid-dedit">
            {allCards.map(card => {
              const collectionCount = playerCollection[card.name] || 0;
              const deckCount = currentDeck.filter(c => c.name === card.name).length;
              const availableCount = collectionCount - deckCount;
              if (availableCount <= 0) return null;

              return (
                <div key={card.id} className="collection-card-item-dedit" draggable onDragStart={(e) => handleDragStart(e, card)}>
                  <Card card={card} isFaceUp={true} />
                  <div className="card-count-dedit">{`x${availableCount}`}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="deck-panel" onDrop={handleDropOnDeck} onDragOver={handleDragOver}>
          <h2>Current Deck ({currentDeck.length}/12)</h2>
          <div className="deck-grid">
            {currentDeck.map((card, index) => (
              <div key={index} className="deck-card-item" onClick={() => handleRemoveFromDeck(index)}>
                <Card card={card} isFaceUp={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="deck-edit-buttons">
        <button className="save-deck-button" onClick={handleSaveDeck}>Save Deck</button>
        <button className="back-button" onClick={onBack}>Back to Main Menu</button>
      </div>
    </div>
  );
};

export default DeckEditScreen;
