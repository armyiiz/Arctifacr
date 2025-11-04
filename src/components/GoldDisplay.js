import React from 'react';
import './GoldDisplay.css';

const GoldDisplay = ({ gold }) => {
  return (
    <div className="gold-display">
      <p>Gold: {gold}</p>
    </div>
  );
};

export default GoldDisplay;
