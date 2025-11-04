import React, { useState, useEffect } from 'react';
import './TreasureScreen.css';
import { getAllCards } from '../gameLogic';

// Helper to get a random integer
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const TreasureScreen = ({ stage, onContinue }) => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    // Generate rewards when the component mounts
    const generateRewards = () => {
      const allCards = getAllCards(); // Assuming this returns a list of all possible cards
      const generatedRewards = [];
      const isGoldReward = Math.random() < 0.2; // 20% chance for gold

      if (isGoldReward) {
        // GDD: Random gold between 1-50, skewed towards lower numbers
        const goldAmount = Math.floor(1 / (Math.random() * 0.2 + 0.02)) + 1;
        generatedRewards.push({ type: 'gold', amount: Math.min(goldAmount, 50) });
      } else {
        // GDD: 5 random cards from the current route's theme (or all cards for now)
        for (let i = 0; i < 5; i++) {
          const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
          // Prevent duplicates in the reward selection
          if (!generatedRewards.some(r => r.type === 'card' && r.name === randomCard.name)) {
            generatedRewards.push({ type: 'card', name: randomCard.name, art: randomCard.art });
          } else {
            i--; // try again
          }
        }
      }
      setRewards(generatedRewards);
    };

    generateRewards();
  }, [stage]); // Reroll if the stage somehow changes

  const handleSelectReward = (reward) => {
    // In a real implementation, you'd add this to the player's state
    console.log('Reward selected:', reward);
    onContinue(); // Proceed to the next stage
  };

  return (
    <div className="treasure-screen">
      <h1>You found a Treasure Chest!</h1>
      <p>Choose one reward:</p>
      <div className="rewards-list">
        {rewards.map((reward, index) => (
          <div key={index} className="reward-card" onClick={() => handleSelectReward(reward)}>
            {reward.type === 'card' ? (
              <>
                <img src={`/art/cards/${reward.art}.png`} alt={`Card: ${reward.name}`} />
                <p>{reward.name}</p>
              </>
            ) : (
              <>
                <img src="/art/icons/Gold.png" alt="Gold Reward" />
                <p>{reward.amount} Gold</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreasureScreen;
