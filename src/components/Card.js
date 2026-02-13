import React from 'react';
import './Card.css';
import Sprite from './Sprite';

const Card = ({ card, isFaceUp, onClick, className, showName = true }) => {
  if (!card) return null; // Handle null card cases gracefully

  // Construct the art URL. Assuming card.art is a filename or path.
  // If it's a full path, use it. If it's just a name, construct it.
  const artUrl = card.art.startsWith('/') ? card.art : `/art/cards/${card.art}.webp`;

  const cardContent = isFaceUp ? (
    <div className="card-face card-front">
      {/* Background Art */}
      <div className="card-art" style={{ backgroundImage: `url(${artUrl})`, backgroundColor: '#333' }}></div>

      {/* Faction Icon (Top-Left) */}
      <div className="card-faction-icon">
        <Sprite type="faction" value={card.faction} size="sm" />
      </div>

      {/* Rank/Number Icon (Top-Right) */}
      <div className="card-rank-icon">
        <Sprite type="rank" value={card.number} size="md" />
      </div>

      {/* Card Name (Bottom) */}
      {showName && (
        <div className="card-name-container">
            <span className="card-name-text">{card.name.replace(/_/g, ' ')}</span>
        </div>
      )}
    </div>
  ) : (
    <div className="card-face card-back">
        {/* Card Back Design */}
    </div>
  );

  return (
    <div
      className={`card-container ${isFaceUp ? 'flipped' : ''} ${className || ''}`}
      onClick={onClick}
      data-card-id={card.id}
    >
      <div className="card-inner">
        {cardContent}
      </div>
    </div>
  );
};

export default Card;
