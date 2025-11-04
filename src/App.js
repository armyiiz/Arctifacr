import React, { useState } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import RouteSelection from './components/RouteSelection';
import BattleScreen from './components/BattleScreen';
import PostBattleScreen from './components/PostBattleScreen';
import DeckEditScreen from './components/DeckEditScreen';
import CollectionScreen from './components/CollectionScreen';
import { generateRoute } from './gameLogic';

function App() {
  const [currentScreen, setCurrentScreen] = useState('main_menu');
  const [route, setRoute] = useState([]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [battleResult, setBattleResult] = useState(null); // 'win' or 'loss'

  const handleStartGame = () => {
    const newRoute = generateRoute();
    setRoute(newRoute);
    setCurrentStageIndex(0);
    setCurrentScreen('route_selection');
  };

  const handleSelectStage = (stageIndex) => {
    if (stageIndex === currentStageIndex) {
      setCurrentStageIndex(stageIndex);
      setCurrentScreen('battle');
    }
  };

  const handleGameOver = (win) => {
    setBattleResult(win);
    setCurrentScreen('post_battle');
  };

  const handlePostBattleContinue = () => {
    if (battleResult) { // If player won
      if (currentStageIndex < route.length - 1) {
        setCurrentStageIndex(prev => prev + 1);
        setCurrentScreen('route_selection');
      } else {
        alert("Congratulations! You've completed the route!");
        setCurrentScreen('main_menu');
      }
    } else { // If player lost
      setCurrentScreen('main_menu');
    }
    setBattleResult(null); // Reset battle result
  };

  const goToDeckEdit = () => setCurrentScreen('deck_edit');
  const goToCollection = () => setCurrentScreen('collection');
  const goToMainMenu = () => setCurrentScreen('main_menu');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'route_selection':
        return <RouteSelection route={route} currentStageIndex={currentStageIndex} onSelectStage={handleSelectStage} />;
      case 'battle':
        return <BattleScreen
                  stage={route[currentStageIndex]}
                  onGameOver={handleGameOver}
                />;
      case 'post_battle':
        return <PostBattleScreen isWin={battleResult} onContinue={handlePostBattleContinue} />;
      case 'deck_edit':
        return <DeckEditScreen onBack={goToMainMenu} />;
      case 'collection':
        return <CollectionScreen onBack={goToMainMenu} />;
      case 'main_menu':
      default:
        return <MainMenu
                  onStartGame={handleStartGame}
                  onDeckEdit={goToDeckEdit}
                  onCollection={goToCollection}
                  onOptions={() => alert('Options coming soon!')}
                />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;
