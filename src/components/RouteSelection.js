import React from 'react';
import './RouteSelection.css';

const RouteSelection = ({ onSelectRoute }) => {
  // Placeholder for route data
  const routes = [
    { id: 1, name: 'Forest Path', difficulty: 'Easy' },
    { id: 2, name: 'Mountain Pass', difficulty: 'Medium', locked: true },
    { id: 3, name: 'Cursed Swamp', difficulty: 'Hard', locked: true },
  ];

  return (
    <div className="route-selection-container">
      <h1 className="route-title">Choose Your Path</h1>
      <div className="routes-list">
        {routes.map(route => (
          <div
            key={route.id}
            className={`route-item ${route.locked ? 'locked' : ''}`}
            onClick={() => !route.locked && onSelectRoute(route.id)}
          >
            <h2>{route.name}</h2>
            <p>Difficulty: {route.difficulty}</p>
            {route.locked && <div className="lock-icon">🔒</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteSelection;
