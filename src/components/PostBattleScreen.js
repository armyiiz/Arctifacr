import React from 'react';
import './PostBattleScreen.css';

const PostBattleScreen = ({ isWin, onContinue }) => {
  return (
    <div className={`post-battle-container ${isWin ? 'victory' : 'defeat'}`}>
      <div className="result-banner">
        <h1 className="result-title">{isWin ? 'Victory' : 'Defeat'}</h1>
      </div>

      <div className="rewards-section">
        <h2>Rewards</h2>
        <p>{isWin ? 'You have received 50 Gold.' : 'No rewards.'}</p>
        {/* Later, we can add card rewards here */}
      </div>

      <button className="continue-button" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
};

export default PostBattleScreen;
