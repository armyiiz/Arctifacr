import React from 'react';
import Card from './Card';

const Board = ({ playerSlots, opponentSlots, onCardDrop }) => {
  const boardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: '20px',
    margin: '20px auto',
    backgroundColor: '#3d2a1d',
    borderRadius: '10px',
    width: 'fit-content',
  };

  const slotStyle = {
    width: '100px',
    height: '140px',
    border: '2px dashed #5e4a3a',
    borderRadius: '8px',
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // This is necessary to allow dropping
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    if (onCardDrop) {
      const cardInfo = JSON.parse(e.dataTransfer.getData('cardInfo'));
      onCardDrop(cardInfo, 'board', slotIndex);
    }
  };

  const renderSlots = (slots, isPlayerBoard) => {
    return slots.map((card, index) => (
      <div
        key={index}
        className="card-slot"
        style={slotStyle}
        onDragOver={isPlayerBoard ? handleDragOver : undefined}
        onDrop={isPlayerBoard ? (e) => handleDrop(e, index) : undefined}
      >
        {card ? <Card card={card} faceUp={card.faceUp} /> : null}
      </div>
    ));
  };

  return (
    <div className="board-area">
      <div className="opponent-board" style={boardStyle}>
        {renderSlots(opponentSlots, false)}
      </div>
      <div className="player-board" style={boardStyle}>
        {renderSlots(playerSlots, true)}
      </div>
    </div>
  );
};

export default Board;
