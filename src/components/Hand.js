import React from 'react';
import Card from './Card';
import './Hand.css';

const Hand = ({ cards, onSelectCard, selectedCard }) => {
  return (
    <div className="hand-container">
      {cards.map((card, index) => {
        const isSelected = selectedCard && selectedCard.index === index;
        return (
          <Card
            key={card.id || index}
            card={card}
            isFaceUp={true}
            onClick={() => onSelectCard(card, index)}
            className={isSelected ? 'selected' : ''}
          />
        );
      })}
    </div>
  );
};

export default Hand;
