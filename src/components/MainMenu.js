import React from 'react';
import './MainMenu.css';

const MainMenu = ({ onStartGame, onDeckEdit, onCollection, onOptions }) => {
  return (
    <div className="main-menu-container">
      <h1 className="game-title">Artifact</h1>
      <div className="menu-buttons">
        <button className="menu-button" onClick={onStartGame}>
          Story Mode
        </button>
        <button className="menu-button" onClick={onDeckEdit}>
          Deck Edit
        </button>
        <button className="menu-button" onClick={onCollection}>
          Collection
        </button>
        <button className="menu-button" onClick={onOptions}>
          Options
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
