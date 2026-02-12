import React from 'react';
import GoldDisplay from './GoldDisplay';
import './MainMenu.css';

const MainMenu = ({ onStartGame, onContinueRun, activeRun, onDeckEdit, onCollection, onOptions, playerGold }) => {
  return (
    <div className="main-menu-container">
      <GoldDisplay gold={playerGold} />
      <h1 className="game-title">Artifact</h1>
      <div className="menu-buttons">
        {activeRun && (
            <button className="menu-button continue-button" onClick={onContinueRun}>
                Continue Run
            </button>
        )}
        <button className="menu-button" onClick={onStartGame}>
          {activeRun ? 'New Run' : 'Start Game'}
        </button>
        <button className="menu-button" onClick={onDeckEdit}>
          Deck Edit
        </button>
        <button className="menu-button" onClick={onCollection}>
          Collection
        </button>
        <button className="menu-button" onClick={onOptions}>
          Options (Reset Save)
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
