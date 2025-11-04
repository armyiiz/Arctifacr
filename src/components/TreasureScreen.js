import React from 'react';
import './TreasureScreen.css';

const TreasureScreen = ({ onContinue }) => {
  return (
    <div className="treasure-screen">
      <h1>You found a Treasure Chest!</h1>
      <p>Rewards will be implemented in a future phase.</p>
      <button className="continue-button" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
};

export default TreasureScreen;
