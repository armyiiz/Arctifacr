import React from 'react';
import Card from './Card';

const Hand = ({ cards }) => {
  return (
    <div className="hand" style={{ display: 'flex', justifyContent: 'center', padding: '10px', minHeight: '150px' }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          faceUp={true}
          isDraggable={true}
        />
      ))}
    </div>
  );
};

export default Hand;
