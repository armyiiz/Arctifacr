import React, { useState } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import RouteSelection from './components/RouteSelection';
import BattleScreen from './components/BattleScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('main_menu'); // main_menu, route_selection, battle
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleStartGame = () => {
    setCurrentScreen('route_selection');
  };

  const handleSelectRoute = (routeId) => {
    setSelectedRoute(routeId);
    setCurrentScreen('battle');
  };

  // A simple function to go back to main menu for now
  const handleGameOver = () => {
      setCurrentScreen('main_menu');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'route_selection':
        return <RouteSelection onSelectRoute={handleSelectRoute} />;
      case 'battle':
        // We can pass routeId to BattleScreen later to load specific enemies
        return <BattleScreen onGameOver={handleGameOver} />;
      case 'main_menu':
      default:
        return <MainMenu onStartGame={handleStartGame} onOptions={() => alert('Options coming soon!')} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;
