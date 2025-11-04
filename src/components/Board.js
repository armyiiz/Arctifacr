import React from 'react';
import './Board.css';
import Card from './Card';

const Board = ({ playerSlots, opponentSlots, onCardDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    const cardInfo = {
      cardId: e.dataTransfer.getData('cardId')
    };
    onCardDrop(cardInfo, 'board', slotIndex);
  };

  const renderSlots = (slots, owner) => {
    return slots.map((card, index) => (
      <div
        key={`${owner}-slot-${index}`}
        className="card-slot"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
        data-slot-index={index}
      >
        {card ? <Card card={card} isFaceUp={card.faceUp} /> : <div className="empty-slot"></div>}
      </div>
    ));
  };

  return (
    <div className="board-container">
      <div className="board-row opponent-board">{renderSlots(opponentSlots, 'opponent')}</div>
      <div className="board-row player-board">{renderSlots(playerSlots, 'player')}</div>
    </div>
  );
};

export default Board;
