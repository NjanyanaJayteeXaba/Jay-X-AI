import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TicTacToeCellProps {
  value: string;
  onClick: () => void;
  isWinning: boolean;
}

export default function TicTacToeCell({ 
  value, 
  onClick, 
  isWinning 
}: TicTacToeCellProps) {
  const [animate, setAnimate] = useState(false);
  
  // Trigger animation when cell value changes
  useEffect(() => {
    if (value) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-md border-2 border-gray-200 bg-gray-50 text-4xl font-bold transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        value === 'X' && 'text-blue-500',
        value === 'O' && 'text-red-500',
        isWinning && value === 'X' && 'bg-blue-100',
        isWinning && value === 'O' && 'bg-red-100',
        animate && 'animate-pulse-once',
        !value && 'cursor-pointer',
        value && 'cursor-not-allowed'
      )}
      disabled={!!value}
    >
      {value}
    </button>
  );
}