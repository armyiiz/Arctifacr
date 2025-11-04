import React, { useState, useEffect } from 'react';
import './DeckEditScreen.css';
import Card from './Card';
import { getAllCards } from '../gameLogic';

const DeckEditScreen = ({ onBack }) => {
  const [collection, setCollection] = useState({});
  const [deck, setDeck] = useState([]);
  const [deckName, setDeckName] = useState('My Deck');

  useEffect(() => {
    // Load collection from localStorage
    const savedCollection = JSON.parse(localStorage.getItem('card_collection')) || {};
    setCollection(savedCollection);

    // Load active deck from localStorage
    const savedDeck = JSON.parse(localStorage.getItem('active_deck'));
    if (savedDeck) {
      setDeck(savedDeck);
    } else {
      // Create a default deck if none is saved
      const defaultDeck = [
        // ... default card objects would go here
      ];
      setDeck(defaultDeck);
    }
  }, []);

  const handleSaveDeck = () => {
    if (deck.length !== 12) {
      alert('A deck must contain exactly 12 cards.');
      return;
    }
    // In a real implementation, we would also validate the card composition rule
    localStorage.setItem('active_deck', JSON.stringify(deck));
    alert(`${deckName} saved!`);
  };

  const allCards = getAllCards();

  // Drag and Drop Handlers
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('card', JSON.stringify(card));
  };

  const handleDropOnDeck = (e) => {
    e.preventDefault();
    if (deck.length >= 12) return;

    const cardData = JSON.parse(e.dataTransfer.getData('card'));
    const cardName = cardData.name;

    const collectionCount = collection[cardName] || 0;
    const deckCount = deck.filter(c => c.name === cardName).length;

    if (collectionCount > deckCount) {
      setDeck([...deck, cardData]);
    } else {
      alert(`You don't have any more "${cardName}" cards in your collection.`);
    }
  };

  const handleRemoveFromDeck = (cardToRemove, indexToRemove) => {
    const newDeck = deck.filter((card, index) => index !== indexToRemove);
    setDeck(newDeck);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="deck-edit-screen">
      <h1 className="deck-edit-title">Deck Edit</h1>
      <div className="deck-editor-layout">
        <div className="collection-panel">
          <h2>Your Collection</h2>
          <div className="collection-grid-dedit">
            {allCards.map(card => {
              const collectionCount = collection[card.name] || 0;
              const deckCount = deck.filter(c => c.name === card.name).length;
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
          <h2>Current Deck ({deck.length}/12)</h2>
          <input type="text" value={deckName} onChange={(e) => setDeckName(e.target.value)} className="deck-name-input" />
          <div className="deck-grid">
            {deck.map((card, index) => (
              <div key={index} className="deck-card-item" onClick={() => handleRemoveFromDeck(card, index)}>
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
