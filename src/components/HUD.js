// src/components/HUD.js

import React from 'react';
import './Game.css';

function HUD({ score, streak, timeLeft }) {
  return (
    <div className="HUD">
      <div className="HUD-item">
        <h4>Time Left</h4>
        <p>{timeLeft}</p>
      </div>
      <div className="HUD-item">
        <h4>Score</h4>
        <p>{score}</p>
      </div>
      <div className="HUD-item">
        <h4>Streak</h4>
        <p>{streak}</p>
      </div>
    </div>
  );
}

export default HUD;
