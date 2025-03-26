import React from 'react';
import TicTacToeCell from './TicTacToeCell';

interface TicTacToeBoardProps {
  board: string[];
  onCellClick: (index: number) => void;
  currentPlayer: "X" | "O";
  winningCombo: number[] | null;
}

export default function TicTacToeBoard({ 
  board, 
  onCellClick, 
  winningCombo 
}: TicTacToeBoardProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-square">
      {board.map((value, index) => (
        <TicTacToeCell 
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinning={winningCombo?.includes(index) || false}
        />
      ))}
    </div>
  );
}