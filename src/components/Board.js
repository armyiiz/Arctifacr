import React from 'react';
import './Board.css';
import Card from './Card';

const Board = ({ playerSlots, opponentSlots, onSelectSlot }) => {
  const renderSlots = (slots, owner) => {
    const isPlayer = owner === 'player';
    return slots.map((card, index) => (
      <div
        key={`${owner}-slot-${index}`}
        className="card-slot"
        onClick={isPlayer ? () => onSelectSlot(index) : undefined}
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
