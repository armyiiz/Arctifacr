import React, { useState, useEffect } from 'react';
import './CollectionScreen.css';
import Card from './Card'; // Assuming Card component is in the same directory
import { getAllCards } from '../gameLogic'; // We will create this function

const CARDS_PER_PAGE = 12;

const CollectionScreen = ({ onBack }) => {
  const [collection, setCollection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedCollection = JSON.parse(localStorage.getItem('card_collection'));
    if (savedCollection) {
      setCollection(savedCollection);
    } else {
      const defaultCollection = {
        'Dark_Rat': 3,
        'Shadow_Hound': 2,
        'Traveler': 12,
      };
      setCollection(defaultCollection);
      localStorage.setItem('card_collection', JSON.stringify(defaultCollection));
    }
  }, []);

  const allCards = getAllCards();

  // Pagination Logic
  const indexOfLastCard = currentPage * CARDS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
  const currentCards = allCards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(allCards.length / CARDS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="collection-screen">
      <h1 className="collection-title">Card Collection</h1>
      <div className="collection-grid">
        {currentCards.map(card => {
          const count = collection[card.name] || 0;
          return (
            <div key={card.id} className="collection-card-item">
              <Card card={card} isFaceUp={true} />
              <div className="card-count">{`${count} / 12`}</div>
            </div>
          );
        })}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <button className="back-button" onClick={onBack}>Back to Main Menu</button>
    </div>
  );
};

export default CollectionScreen;
