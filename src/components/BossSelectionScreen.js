import React from 'react';
import GoldDisplay from './GoldDisplay';
import './BossSelectionScreen.css';

const bosses = [
  { id: 'ender', name: 'Ender' },
  { id: 'gamma', name: 'Gamma' },
  { id: 'razortail', name: 'Razortail' },
  { id: 'evergreen', name: 'Evergreen' },
  { id: 'oryu', name: 'Oryu' },
  { id: 'chrome', name: 'Chrome' },
  { id: 'escalon', name: 'Escalon' },
  { id: 'fresia', name: 'Fresia' },
  { id: 'specter', name: 'Specter' },
];

const BossSelectionScreen = ({ onSelectBoss, playerGold }) => {
  return (
    <div className="boss-selection-screen">
      <GoldDisplay gold={playerGold} />
      <h1>Select Your Route</h1>
      <div className="boss-list">
        {bosses.map(boss => (
          <div key={boss.id} className="boss-card" onClick={() => onSelectBoss(boss.id)}>
            <img src={`/art/routes/${boss.name}.png`} alt={boss.name} />
            <h3>{boss.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BossSelectionScreen;
