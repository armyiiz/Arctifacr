import React from 'react';
import './Card.css';

const Card = ({ card, isFaceUp, onClick, className }) => {
  const cardContent = isFaceUp ? (
    <div className="card-face card-front">
      <div className="card-art" style={{ backgroundImage: `url(${card.art})` }}></div>
      <img src={`/art/icons/Num_${card.number}.png`} alt={`Number ${card.number}`} className="card-number-icon" />
      <div className="card-name">{card.name.replace(/_/g, ' ')}</div>
    </div>
  ) : (
    <div className="card-face card-back"></div>
  );

  return (
    <div
      className={`card-container ${isFaceUp ? 'flipped' : ''} ${className || ''}`}
      onClick={onClick}
      data-card-id={card ? card.id : ''}
    >
      <div className="card-inner">
        {cardContent}
      </div>
    </div>
  );
};

export default Card;
