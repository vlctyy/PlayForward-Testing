// src/components/GameScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import GameGrid from './GameGrid';
import HUD from './HUD';
import './Game.css';

const GAME_DURATION = 30;

function GameScreen() {
  const [gameState, setGameState] = useState('ready');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activePad, setActivePad] = useState(null);
  const [finalTickets, setFinalTickets] = useState(0);

  const calculateTickets = useCallback(() => {
    const baseScore = score;
    const streakBonusMultiplier = 1.0 + Math.floor(streak / 10) * 0.1;
    const finalScore = baseScore * streakBonusMultiplier;
    const ticketsEarned = Math.floor(finalScore * 2);
    setFinalTickets(ticketsEarned);
  }, [score, streak]);

  useEffect(() => {
    if (gameState !== 'playing') {
      return;
    }

    if (timeLeft === 0) {
      setGameState('finished');
      setActivePad(null);
      calculateTickets();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, calculateTickets]);

  const pickNextPad = () => {
    let nextPad;
    do {
      nextPad = Math.floor(Math.random() * 9);
    } while (nextPad === activePad);
    setActivePad(nextPad);
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
    pickNextPad();
  };

  const handlePadClick = (padIndex) => {
    if (gameState !== 'playing' || padIndex !== activePad) {
      setStreak(0);
      return;
    }

    setScore(prevScore => prevScore + 1);
    setStreak(prevStreak => prevStreak + 1);
    pickNextPad();
  };

  return (
    <div className="GameScreen">
      <HUD score={score} streak={streak} timeLeft={timeLeft} />

      {gameState === 'ready' && (
        <div className="Game-overlay">
          <button className="Button" onClick={startGame}>START</button>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="Game-overlay">
          <h2>Time's Up!</h2>
          <p>Final Score: {score}</p>
          <p>Tickets Earned: {finalTickets}</p>
          <button className="Button" onClick={startGame}>PLAY AGAIN</button>
        </div>
      )}

      <GameGrid activePad={activePad} onPadClick={handlePadClick} />
    </div>
  );
}

export default GameScreen;
