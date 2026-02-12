import React from 'react';
import Card from './Card';
import './Board.css';
import Sprite from './Sprite';

const Board = ({ playerSlots, opponentSlots, onSelectSlot, intelData }) => {
  return (
    <div className="board-container">
      {/* Opponent Row */}
      <div className="board-row opponent-row">
        {opponentSlots.map((card, index) => (
          <div key={`opp-${index}`} className="board-slot opponent-slot">
            {card ? (
              <div className="card-wrapper">
                <Card card={card} isFaceUp={card.faceUp} />
                {/* Intel Overlay: Show if card is face down AND we have intel */}
                {!card.faceUp && intelData && intelData[index] && (
                  <div className="intel-overlay">
                    <Sprite type="faction" value={intelData[index]} size="md" />
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-slot-placeholder"></div>
            )}
          </div>
        ))}
      </div>

      {/* Spacer / Mid-line */}
      <div className="board-divider">
        <span>VS</span>
      </div>

      {/* Player Row */}
      <div className="board-row player-row">
        {playerSlots.map((card, index) => (
          <div
            key={`player-${index}`}
            className="board-slot player-slot"
            onClick={() => onSelectSlot(index)}
          >
            {card ? (
              <Card card={card} isFaceUp={card.faceUp} />
            ) : (
              <div className="empty-slot-placeholder tap-target">
                <span>Tap to Place</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
