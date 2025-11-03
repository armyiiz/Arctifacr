import React from 'react';
import './Card.css';

const Card = ({ card, faceUp = false, onClick, isDraggable = false, onDragStart }) => {
  if (!card) {
    return <div className="card-container empty"></div>;
  }

  const { id, name, number, art } = card;

  const handleDragStart = (e) => {
    if (onDragStart) {
      // Send the card's id and its original location ('hand')
      e.dataTransfer.setData('cardInfo', JSON.stringify({ cardId: id, origin: 'hand' }));
      onDragStart(e, { cardId: id, origin: 'hand' });
    }
  };

  const numberIcon = `/art/icons/Num_${number}.png`;
  const cardArt = `/art/cards/${art}.png`;

  return (
    <div
      className="card-container"
      onClick={onClick}
      draggable={isDraggable}
      onDragStart={isDraggable ? handleDragStart : undefined}
    >
      <div className={`card ${faceUp ? 'face-up' : ''}`}>
        <div className="card-face card-back"></div>
        <div className="card-face card-front">
          <img src={cardArt} alt={name} className="card-art" onError={(e) => { e.target.style.display = 'none'; }} />
          <img src={numberIcon} alt={`Number ${number}`} className="card-number" onError={(e) => { e.target.style.display = 'none'; }}/>
          <div className="card-name">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
