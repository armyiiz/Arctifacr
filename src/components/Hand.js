import React from 'react';
import Card from './Card';
import './Hand.css';

const Hand = ({ cards, onCardClick, onCardDragStart, onCardTouchStart }) => {
  return (
    <div className="hand-container">
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          isFaceUp={true} // Cards in hand are always face up
          onClick={() => onCardClick && onCardClick(card)}
          onDragStart={(e) => onCardDragStart && onCardDragStart(e, card)}
          onTouchStart={(e) => onCardTouchStart && onCardTouchStart(e, card)}
        />
      ))}
    </div>
  );
};

export default Hand;
