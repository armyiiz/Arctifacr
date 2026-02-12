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

// The player's collection now stores the count of each card type they own.
const initialPlayerCollection = {
  'T01': 12, // The player starts with 12 Traveller cards.
};

const loadInitialState = (key, defaultValue) => {
  try {
    const savedItem = localStorage.getItem(key);
    // Ensure that if the collection is not in storage, it gets the default value.
    if (key === 'playerCollection' && !savedItem) {
      return defaultValue;
    }
    return savedItem ? JSON.parse(savedItem) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage`, error);
    return defaultValue;
  }
};

function App() {
  const [playerGold, setPlayerGold] = useState(() => loadInitialState('playerGold', 0));
  const [playerArtifacts, setPlayerArtifacts] = useState(() => loadInitialState('playerArtifacts', []));
  const [playerCollection, setPlayerCollection] = useState(() => loadInitialState('playerCollection', initialPlayerCollection));

  // New: Run State Persistence
  const [runState, setRunState] = useState(() => loadInitialState('runState', null));
  // Structure: { route: [], currentStageIndex: 0, hp: 10, maxHP: 10, deckConfig: [] }

  const [currentScreen, setCurrentScreen] = useState('main_menu');
  const [battleResult, setBattleResult] = useState(null);

  // Save game data to localStorage
  useEffect(() => {
    localStorage.setItem('playerGold', JSON.stringify(playerGold));
    localStorage.setItem('playerArtifacts', JSON.stringify(playerArtifacts));
    localStorage.setItem('playerCollection', JSON.stringify(playerCollection));
    localStorage.setItem('runState', JSON.stringify(runState));
  }, [playerGold, playerArtifacts, playerCollection, runState]);

  const handleStartGame = () => {
    setCurrentScreen('boss_selection');
  };

  const handleContinueRun = () => {
      if (runState) {
          setCurrentScreen('route_selection');
      }
  };

  const handleSelectBoss = (bossId) => {
    // Start New Run
    const newRoute = generateRoute(bossId);
    const newRunState = {
        route: newRoute,
        currentStageIndex: 0,
        hp: MAX_HP,
        maxHP: MAX_HP,
        deckConfig: JSON.parse(localStorage.getItem('active_deck')) || null, // Capture current deck
    };
    setRunState(newRunState);
    setCurrentScreen('route_selection');
  };

  const handleSelectStage = (stageIndex) => {
    if (!runState || stageIndex !== runState.currentStageIndex) return;

    const stage = runState.route[stageIndex];
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
        // Handle player loss - clear run state
        alert("You have been defeated!");
        setRunState(null); // Clear run
        setCurrentScreen('main_menu');
    } else {
        // For wins, go to a post-battle summary
        setCurrentScreen('post_battle');
    }
  };

  const proceedToNextStage = () => {
      if (!runState) return;

      if (runState.currentStageIndex < runState.route.length - 1) {
          setRunState(prev => ({
              ...prev,
              currentStageIndex: prev.currentStageIndex + 1
          }));
          setCurrentScreen('route_selection');
      } else {
          alert("Congratulations! You've cleared the path!");
          setRunState(null); // Clear run on victory
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
      // Update HP in Run State
      setRunState(prev => ({
          ...prev,
          hp: Math.min(prev.maxHP, prev.hp + healedAmount)
      }));
      proceedToNextStage();
  };

  // Wrapper for BattleScreen to update Run HP
  const updatePlayerHP = (update) => {
      setRunState(prev => {
          if (!prev) return null;
          const newHP = typeof update === 'function' ? update(prev.hp) : update;
          return { ...prev, hp: newHP };
      });
  };

  const goToDeckEdit = () => setCurrentScreen('deck_edit');
  const goToCollection = () => setCurrentScreen('collection');
  const goToMainMenu = () => setCurrentScreen('main_menu');

  const handleResetSave = () => {
      if(window.confirm("Are you sure you want to reset all save data?")) {
          localStorage.clear();
          window.location.reload();
      }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'boss_selection':
        return <BossSelectionScreen onSelectBoss={handleSelectBoss} playerGold={playerGold} />;
      case 'route_selection':
        return <RouteSelection
                    route={runState?.route || []}
                    currentStageIndex={runState?.currentStageIndex || 0}
                    onSelectStage={handleSelectStage}
                    playerGold={playerGold}
                />;
      case 'battle':
        return <BattleScreen
                  stage={runState?.route[runState.currentStageIndex]}
                  onGameOver={handleGameOver}
                  playerHP={runState?.hp || 0}
                  setPlayerHP={updatePlayerHP}
                />;
      case 'treasure':
        return <TreasureScreen stage={runState?.route[runState.currentStageIndex]} onContinue={handleTreasureContinue} />;
      case 'rest':
        return <RestScreen
                    stage={runState?.route[runState.currentStageIndex]}
                    playerHP={runState?.hp || 0}
                    maxHP={runState?.maxHP || MAX_HP}
                    onContinue={handleRestContinue}
                />;
      case 'post_battle':
        return <PostBattleScreen isWin={battleResult} onContinue={handlePostBattleContinue} />;
      case 'deck_edit':
        return <DeckEditScreen onBack={goToMainMenu} playerCollection={playerCollection} />;
      case 'collection':
        return <CollectionScreen onBack={goToMainMenu} playerCollection={playerCollection} />;
      case 'main_menu':
      default:
        return <MainMenu
                  onStartGame={handleStartGame}
                  onContinueRun={handleContinueRun}
                  activeRun={!!runState}
                  onDeckEdit={goToDeckEdit}
                  onCollection={goToCollection}
                  onOptions={handleResetSave}
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
