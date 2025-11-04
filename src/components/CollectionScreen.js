import React, { useState } from 'react';
import './CollectionScreen.css';
import Card from './Card';
import { getAllCards } from '../gameLogic';

const CARDS_PER_PAGE = 12;

const CollectionScreen = ({ onBack, playerCollection }) => {
  const [currentPage, setCurrentPage] = useState(1);

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
          const count = playerCollection[card.name] || 0;
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
