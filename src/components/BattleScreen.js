import React, { useState } from 'react';
import Board from './Board';
import Hand from './Hand';

const BattleScreen = () => {
  // Mock data for now
  const [playerHand, setPlayerHand] = useState([{id: 1, name: 'Card 1'}, {id: 2, name: 'Card 2'}]);
  const [playerBoard, setPlayerBoard] = useState([null, null, null, null]);
  const [opponentBoard, setOpponentBoard] = useState([null, null, null, null]);

  return (
    <div className="battle-screen">
      <h1>Battle Screen</h1>
      <Board playerSlots={playerBoard} opponentSlots={opponentBoard} />
      <h2>Your Hand</h2>
      <Hand cards={playerHand} />
    </div>
  );
};

export default BattleScreen;
