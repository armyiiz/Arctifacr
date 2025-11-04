import React, { useState, useEffect } from 'react';
import './CollectionScreen.css';
import Card from './Card'; // Assuming Card component is in the same directory
import { getAllCards } from '../gameLogic'; // We will create this function

const CollectionScreen = ({ onBack }) => {
  const [collection, setCollection] = useState({});

  useEffect(() => {
    // Load collection from localStorage or use default
    const savedCollection = JSON.parse(localStorage.getItem('card_collection'));
    if (savedCollection) {
      setCollection(savedCollection);
    } else {
      // For demonstration, let's create a default collection
      const defaultCollection = {
        'Dark_Rat': 3,
        'Shadow_Hound': 2,
        'Traveler': 12,
      };
      setCollection(defaultCollection);
      localStorage.setItem('card_collection', JSON.stringify(defaultCollection));
    }
  }, []);

  const allCards = getAllCards(); // This function should return all possible cards

  return (
    <div className="collection-screen">
      <h1 className="collection-title">Card Collection</h1>
      <div className="collection-grid">
        {allCards.map(card => {
          const count = collection[card.name] || 0;
          return (
            <div key={card.id} className="collection-card-item">
              <Card card={card} isFaceUp={true} />
              <div className="card-count">{`x${count} / 12`}</div>
            </div>
          );
        })}
      </div>
      <button className="back-button" onClick={onBack}>Back to Main Menu</button>
    </div>
  );
};

export default CollectionScreen;
