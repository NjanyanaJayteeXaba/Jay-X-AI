import React from 'react';

interface TicTacToeScoreboardProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

export default function TicTacToeScoreboard({ scores }: TicTacToeScoreboardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-2">
      <div className="text-center">
        <div className="font-semibold text-blue-500">Player X</div>
        <div className="text-2xl font-bold">{scores.X}</div>
      </div>
      <div className="text-center">
        <div className="font-semibold text-gray-500">Draws</div>
        <div className="text-2xl font-bold">{scores.draws}</div>
      </div>
      <div className="text-center">
        <div className="font-semibold text-red-500">Player O</div>
        <div className="text-2xl font-bold">{scores.O}</div>
      </div>
    </div>
  );
}