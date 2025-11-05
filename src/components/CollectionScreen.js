import React, { useState } from 'react';
import './CollectionScreen.css';
import Card from './Card';
import { getCardById } from '../gameLogic';

const CARDS_PER_PAGE = 12;

const CollectionScreen = ({ onBack, playerCollection }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Get an array of card IDs that the player actually owns.
  const ownedCardIds = Object.keys(playerCollection).filter(cardId => playerCollection[cardId] > 0);

  // Pagination Logic
  const indexOfLastCard = currentPage * CARDS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
  const currentCardIds = ownedCardIds.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(ownedCardIds.length / CARDS_PER_PAGE);

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
        {currentCardIds.map(cardId => {
          const cardData = getCardById(cardId);
          const count = playerCollection[cardId];

          // Create a card object for rendering, but without a number.
          const cardForDisplay = { ...cardData, number: null };

          return (
            <div key={cardId} className="collection-card-item">
              <Card card={cardForDisplay} isFaceUp={true} />
              <div className="card-count">{`x${count}`}</div>
            </div>
          );
        })}
      </div>
      <div className="pagination-controls">
        {totalPages > 1 && (
          <>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </>
        )}
      </div>
      <button className="back-button" onClick={onBack}>Back to Main Menu</button>
    </div>
  );
};

export default CollectionScreen;
