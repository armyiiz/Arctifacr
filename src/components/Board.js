import React from 'react';
import './Board.css';
import Card from './Card';

const Board = ({ playerSlots, opponentSlots, onDrop, onDragOver }) => {
  const renderSlots = (slots, owner, isPlayer) => {
    return slots.map((slot, index) => (
      <div
        key={`${owner}-slot-${index}`}
        className="card-slot"
        onDrop={(e) => isPlayer ? onDrop(e, index) : null}
        onDragOver={onDragOver}
      >
        {slot.card ? <Card card={slot.card} isFaceUp={slot.card.faceUp} /> : <div className="empty-slot"></div>}
      </div>
    ));
  };

  return (
    <div className="board-container">
      <div className="board-row opponent-board">{renderSlots(opponentSlots, 'opponent', false)}</div>
      <div className="board-row player-board">{renderSlots(playerSlots, 'player', true)}</div>
    </div>
  );
};

export default Board;
