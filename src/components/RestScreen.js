import React from 'react';
import './RestScreen.css';

const RestScreen = ({ stage, playerHP, maxHP, onContinue }) => {
  const isFullHeal = stage.fullHeal;
  const healAmount = isFullHeal ? (maxHP - playerHP) : Math.floor(playerHP / 2);

  const handleRest = () => {
    // In a real scenario, you'd update the player's HP state via a function passed in props
    console.log(`Player healed for ${healAmount} HP.`);
    onContinue(healAmount); // Pass heal amount to parent to update state
  };

  return (
    <div className="rest-screen">
      <h1>A Moment of Respite</h1>
      <div className="rest-options">
        <div className="rest-option">
          <img src="/art/icons/Campfire.png" alt="Rest" />
          <h2>Rest by the Campfire</h2>
          <p>
            You take a moment to catch your breath.
            {isFullHeal
              ? ' You feel fully rejuvenated.'
              : ' You recover some of your vitality.'}
          </p>
          <p>
            (Heals for {healAmount} HP)
          </p>
          <button onClick={handleRest}>
            {isFullHeal ? 'Heal to Full' : 'Rest'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestScreen;
