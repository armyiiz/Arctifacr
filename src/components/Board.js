import React from 'react';
import Card from './Card';

const Board = ({ playerSlots, opponentSlots }) => {
  return (
    <div className="board">
      <div className="opponent-board">
        {opponentSlots.map((card, index) => (
          <div key={index} className="card-slot">
            {card ? <Card card={card} /> : <div className="empty-slot"></div>}
          </div>
        ))}
      </div>
      <div className="player-board">
        {playerSlots.map((card, index) => (
          <div key={index} className="card-slot">
            {card ? <Card card={card} /> : <div className="empty-slot"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
