import React from 'react';
import './Card.css';

const Card = ({ card, isFaceUp, onClick, onDragStart }) => {
  // The 'flipped' class is now controlled by the isFaceUp prop
  const cardContainerClass = `card-container ${isFaceUp ? 'flipped' : ''}`;

  return (
    <div
      className={cardContainerClass}
      onClick={onClick}
      draggable={onDragStart ? true : false}
      onDragStart={onDragStart}
    >
      <div className="card-inner">
        {/* Front of the card */}
        <div className="card-face card-front">
          <div className="card-number">{card.number}</div>
          <div className="card-art"></div>
        </div>
        {/* Back of the card */}
        <div className="card-face card-back"></div>
      </div>
    </div>
  );
};

export default Card;
