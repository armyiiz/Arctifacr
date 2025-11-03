import React from 'react';
import './MainMenu.css';

const MainMenu = ({ onStartGame, onOptions }) => {
  return (
    <div className="main-menu-container">
      <h1 className="game-title">Artifact</h1>
      <div className="menu-buttons">
        <button className="menu-button" onClick={onStartGame}>
          Start Game
        </button>
        <button className="menu-button" onClick={onOptions}>
          Options
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
