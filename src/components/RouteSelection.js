import React from 'react';
import GoldDisplay from './GoldDisplay';
import './RouteSelection.css';
import { STAGE_TYPES } from '../gameLogic';

const getStageIcon = (type) => {
  switch (type) {
    case STAGE_TYPES.BATTLE: return '⚔️';
    case STAGE_TYPES.TREASURE: return '💎';
    case STAGE_TYPES.REST: return '🔥';
    case STAGE_TYPES.BOSS: return '👑';
    default: return '?';
  }
};

const RouteSelection = ({ route, currentStageIndex, onSelectStage, playerGold }) => {
  return (
    <div className="route-selection-container">
      <GoldDisplay gold={playerGold} />
      <h1 className="route-title">Choose Your Next Encounter</h1>
      <h2 className="stage-counter">Stage: {currentStageIndex + 1} / {route.length}</h2>
      <div className="route-map">
        {route.map((stage, index) => {
          const isCurrent = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          const isLocked = index > currentStageIndex;

          let stageClass = 'stage-node';
          if (isCurrent) stageClass += ' current';
          if (isCompleted) stageClass += ' completed';
          if (isLocked) stageClass += ' locked';

          return (
            <React.Fragment key={stage.id}>
              <div
                className={stageClass}
                onClick={() => onSelectStage(index)}
              >
                <div className="stage-icon">{getStageIcon(stage.type)}</div>
                <div className="stage-name">{stage.type}</div>
              </div>
              {index < route.length - 1 && <div className="route-connector"></div>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default RouteSelection;
