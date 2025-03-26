import React, { useState, useEffect } from 'react';
import { 
  checkWin, 
  getWinningCombination, 
  checkDraw 
} from '@/lib/tictactoe';
import TicTacToeBoard from '@/components/TicTacToeBoard';
import TicTacToeStatus from '@/components/TicTacToeStatus';
import TicTacToeScoreboard from '@/components/TicTacToeScoreboard';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function TicTacToe() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameActive, setGameActive] = useState(true);
  const [vsAI, setVsAI] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [status, setStatus] = useState("Player X's turn");
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameActive(true);
    setWinningCombo(null);
    setStatus("Player X's turn");
  };

  // Handle cell click
  const handleCellClick = (index: number) => {
    // If cell is already filled or game is over, do nothing
    if (board[index] !== '' || !gameActive) return;

    // Update board
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for win or draw
    if (checkWin(newBoard, currentPlayer)) {
      handleWin(newBoard);
    } else if (checkDraw(newBoard)) {
      handleDraw();
    } else {
      // Switch player
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      setStatus(`Player ${nextPlayer}'s turn`);
    }
  };

  // Handle win
  const handleWin = (currentBoard: string[]) => {
    setGameActive(false);
    setStatus(`Player ${currentPlayer} wins!`);
    setWinningCombo(getWinningCombination(currentBoard, currentPlayer));
    
    // Update scores
    setScores(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1
    }));
  };

  // Handle draw
  const handleDraw = () => {
    setGameActive(false);
    setStatus("Game ended in a draw!");
    
    // Update scores
    setScores(prev => ({
      ...prev,
      draws: prev.draws + 1
    }));
  };

  // AI logic
  useEffect(() => {
    if (vsAI && currentPlayer === 'O' && gameActive) {
      // Delay for better UX
      const timer = setTimeout(() => {
        makeAIMove();
      }, 700);
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, vsAI, gameActive, board]);
  
  // Make AI move
  const makeAIMove = () => {
    // Check if AI can win
    const winningMove = findBestMove('O');
    if (winningMove !== -1) {
      handleCellClick(winningMove);
      return;
    }
    
    // Check if player can win and block
    const blockingMove = findBestMove('X');
    if (blockingMove !== -1) {
      handleCellClick(blockingMove);
      return;
    }
    
    // Take center if available
    if (board[4] === '') {
      handleCellClick(4);
      return;
    }
    
    // Take corner if available
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === '');
    if (availableCorners.length > 0) {
      const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
      handleCellClick(randomCorner);
      return;
    }
    
    // Take any available side
    const sides = [1, 3, 5, 7];
    const availableSides = sides.filter(i => board[i] === '');
    if (availableSides.length > 0) {
      const randomSide = availableSides[Math.floor(Math.random() * availableSides.length)];
      handleCellClick(randomSide);
      return;
    }
  };

  // Find best move for AI
  const findBestMove = (player: string) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        // Try this move
        const newBoard = [...board];
        newBoard[i] = player;
        
        // Check if this move would win
        if (checkWin(newBoard, player)) {
          return i;
        }
      }
    }
    return -1; // No winning move
  };

  return (
    <div className="container max-w-md py-8 px-4">
      <div className="rounded-lg bg-white shadow-md p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center">Jay-XO</h1>
        
        {/* Game Mode Selection */}
        <ToggleGroup 
          type="single" 
          value={vsAI ? "ai" : "2p"}
          onValueChange={(value) => {
            if (value) {
              setVsAI(value === "ai");
              resetGame();
            }
          }}
          className="justify-center"
        >
          <ToggleGroupItem value="2p" aria-label="Two Players">2 Players</ToggleGroupItem>
          <ToggleGroupItem value="ai" aria-label="Play against AI">vs AI</ToggleGroupItem>
        </ToggleGroup>
        
        {/* Game Status */}
        <TicTacToeStatus status={status} />
        
        {/* Game Board */}
        <TicTacToeBoard 
          board={board} 
          onCellClick={handleCellClick} 
          currentPlayer={currentPlayer}
          winningCombo={winningCombo}
        />
        
        {/* Reset Button */}
        <Button onClick={resetGame} className="w-full">
          Reset Game
        </Button>
        
        {/* Scoreboard */}
        <TicTacToeScoreboard scores={scores} />
      </div>
    </div>
  );
}