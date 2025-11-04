import React from 'react';
import './Card.css';

const Card = ({ card, isFaceUp, onClick, onDragStart, onTouchStart }) => {
  const cardContent = isFaceUp ? (
    <div className="card-face card-front">
      <div className="card-art" style={{ backgroundImage: `url(/art/cards/${card.art}.png)` }}></div>
      <div className="card-number">{card.number}</div>
      <div className="card-name">{card.name}</div>
    </div>
  ) : (
    <div className="card-face card-back"></div>
  );

  const isDraggable = onDragStart || onTouchStart;

  return (
    <div
      className={`card-container ${isFaceUp ? 'flipped' : ''}`}
      onClick={onClick}
      draggable={isDraggable}
      onDragStart={onDragStart}
      onTouchStart={onTouchStart}
      data-card-id={card.id}
    >
      <div className="card-inner">
        {cardContent}
      </div>
    </div>
  );
};

export default Card;
