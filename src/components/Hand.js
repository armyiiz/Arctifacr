import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Hand.css';

const Hand = ({ cards, onSelectCard, selectedCard, isOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-open when phase starts? Maybe not.
  // If isOpen changes from false to true, we could auto-open.
  useEffect(() => {
      if (isOpen) {
          setIsExpanded(true);
      } else {
          setIsExpanded(false);
      }
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen) {
        setIsExpanded(!isExpanded);
    }
  };

  const handleCardClick = (card, index) => {
      onSelectCard(card, index);
      // Close drawer after selection to allow board interaction
      setIsExpanded(false);
  };

  return (
    <div className={`hand-drawer ${isExpanded ? 'open' : 'closed'} ${!isOpen ? 'disabled' : ''}`}>
      <button className="hand-toggle-btn" onClick={handleToggle} disabled={!isOpen}>
        {isExpanded ? 'Hide Hand ▼' : 'Show Hand ▲'} <span className="hand-count">({cards.length})</span>
      </button>
      <div className="hand-content">
        <div className="hand-scroll-area">
            {cards.map((card, index) => {
            const isSelected = selectedCard && selectedCard.index === index;
            return (
                <div key={card.id || index} className="hand-card-wrapper">
                    <Card
                        card={card}
                        isFaceUp={true}
                        onClick={() => handleCardClick(card, index)}
                        className={isSelected ? 'selected' : ''}
                        showName={false}
                    />
                </div>
            );
            })}
        </div>
      </div>
    </div>
  );
};

export default Hand;
