import React, { useState } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import RouteSelection from './components/RouteSelection';
import BattleScreen from './components/BattleScreen';
import { generateRoute } from './gameLogic';

function App() {
  const [currentScreen, setCurrentScreen] = useState('main_menu');
  const [route, setRoute] = useState([]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const handleStartGame = () => {
    const newRoute = generateRoute();
    setRoute(newRoute);
    setCurrentStageIndex(0);
    setCurrentScreen('route_selection');
  };

  const handleSelectStage = (stageIndex) => {
    // Only allow selecting the current, unlocked stage
    if (stageIndex === currentStageIndex) {
      setCurrentStageIndex(stageIndex);
      setCurrentScreen('battle');
    }
  };

  const handleGameOver = (win) => {
    if (win) {
      // If there's a next stage, move to it. Otherwise, player won the run.
      if (currentStageIndex < route.length - 1) {
        setCurrentStageIndex(prev => prev + 1);
        setCurrentScreen('route_selection');
      } else {
        alert("Congratulations! You've completed the route!");
        setCurrentScreen('main_menu');
      }
    } else {
      // If player loses, go back to main menu
      alert("You have been defeated.");
      setCurrentScreen('main_menu');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'route_selection':
        return <RouteSelection route={route} currentStageIndex={currentStageIndex} onSelectStage={handleSelectStage} />;
      case 'battle':
        return <BattleScreen
                  stage={route[currentStageIndex]}
                  onGameOver={handleGameOver}
                />;
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
