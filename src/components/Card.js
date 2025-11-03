import React from 'react';
import './Card.css';

const Card = ({ card, isFaceUp, onClick, onDragStart }) => {
  const cardContent = isFaceUp ? (
    <div className="card-face card-front">
      <div className="card-art" style={{ backgroundImage: `url(/art/cards/${card.art}.png)` }}></div>
      <div className="card-number">{card.number}</div>
      <div className="card-name">{card.name}</div>
    </div>
  ) : (
    <div className="card-face card-back"></div>
  );

  return (
    <div
      className={`card-container ${isFaceUp ? 'flipped' : ''}`}
      onClick={onClick}
      draggable={onDragStart ? true : false}
      onDragStart={onDragStart}
      data-card-id={card.id}
    >
      <div className="card-inner">
        {cardContent}
      </div>
    </div>
  );
};

export default Card;
