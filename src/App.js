import React, { useState, useEffect } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import BossSelectionScreen from './components/BossSelectionScreen';
import RouteSelection from './components/RouteSelection';
import BattleScreen from './components/BattleScreen';
import PostBattleScreen from './components/PostBattleScreen';
import DeckEditScreen from './components/DeckEditScreen';
import CollectionScreen from './components/CollectionScreen';
import TreasureScreen from './components/TreasureScreen';
import RestScreen from './components/RestScreen';
import { generateRoute, STAGE_TYPES } from './gameLogic';

const MAX_HP = 10;

function App() {
  const [playerGold, setPlayerGold] = useState(0);
  const [playerArtifacts, setPlayerArtifacts] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('main_menu');
  const [route, setRoute] = useState([]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [battleResult, setBattleResult] = useState(null);
  const [playerHP, setPlayerHP] = useState(MAX_HP);

  // Load game data from localStorage
  useEffect(() => {
    const savedGold = localStorage.getItem('playerGold');
    if (savedGold) {
      setPlayerGold(JSON.parse(savedGold));
    }
    const savedArtifacts = localStorage.getItem('playerArtifacts');
    if (savedArtifacts) {
      setPlayerArtifacts(JSON.parse(savedArtifacts));
    }
  }, []);

  // Save game data to localStorage
  useEffect(() => {
    localStorage.setItem('playerGold', JSON.stringify(playerGold));
    localStorage.setItem('playerArtifacts', JSON.stringify(playerArtifacts));
  }, [playerGold, playerArtifacts]);

  const handleStartGame = () => {
    setCurrentScreen('boss_selection');
  };

  const handleSelectBoss = (bossId) => {
    const newRoute = generateRoute(bossId);
    setRoute(newRoute);
    setCurrentStageIndex(0);
    setPlayerHP(MAX_HP); // Reset HP at the start of a new run
    setCurrentScreen('route_selection');
  };

  const handleSelectStage = (stageIndex) => {
    if (stageIndex !== currentStageIndex) return;

    const stage = route[stageIndex];
    switch (stage.type) {
      case STAGE_TYPES.BATTLE:
      case STAGE_TYPES.BOSS:
        setCurrentScreen('battle');
        break;
      case STAGE_TYPES.TREASURE:
        setCurrentScreen('treasure');
        break;
      case STAGE_TYPES.REST:
        setCurrentScreen('rest');
        break;
      default:
        console.error("Unknown stage type:", stage.type);
    }
  };

  const handleGameOver = (win) => {
    setBattleResult(win);
    if (!win) {
        // Handle player loss - maybe a specific game over screen
        alert("You have been defeated!");
        setCurrentScreen('main_menu');
    } else {
        // For wins, go to a post-battle summary
        setCurrentScreen('post_battle');
    }
  };

  const proceedToNextStage = () => {
      if (currentStageIndex < route.length - 1) {
          setCurrentStageIndex(prev => prev + 1);
          setCurrentScreen('route_selection');
      } else {
          alert("Congratulations! You've cleared the path!");
          setCurrentScreen('main_menu');
      }
  };

  const handlePostBattleContinue = () => {
    proceedToNextStage();
    setBattleResult(null);
  };

  const handleTreasureContinue = () => {
      // Logic for adding treasure can be handled here or in TreasureScreen
      proceedToNextStage();
  };

  const handleRestContinue = (healedAmount) => {
      setPlayerHP(prev => Math.min(MAX_HP, prev + healedAmount));
      proceedToNextStage();
  };


  const goToDeckEdit = () => setCurrentScreen('deck_edit');
  const goToCollection = () => setCurrentScreen('collection');
  const goToMainMenu = () => setCurrentScreen('main_menu');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'boss_selection':
        return <BossSelectionScreen onSelectBoss={handleSelectBoss} playerGold={playerGold} />;
      case 'route_selection':
        return <RouteSelection route={route} currentStageIndex={currentStageIndex} onSelectStage={handleSelectStage} playerGold={playerGold} />;
      case 'battle':
        return <BattleScreen
                  stage={route[currentStageIndex]}
                  onGameOver={handleGameOver}
                  playerHP={playerHP}
                  setPlayerHP={setPlayerHP}
                />;
      case 'treasure':
        return <TreasureScreen stage={route[currentStageIndex]} onContinue={handleTreasureContinue} />;
      case 'rest':
        return <RestScreen stage={route[currentStageIndex]} playerHP={playerHP} maxHP={MAX_HP} onContinue={handleRestContinue} />;
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
                  playerGold={playerGold}
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
