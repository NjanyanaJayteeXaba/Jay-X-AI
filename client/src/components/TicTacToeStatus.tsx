import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TicTacToeStatusProps {
  status: string;
}

export default function TicTacToeStatus({ status }: TicTacToeStatusProps) {
  const [animate, setAnimate] = useState(false);
  
  // Animate when status changes
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className={cn(
      "text-center text-lg font-medium py-2 px-4 bg-gray-100 rounded-md transition-all",
      animate && "animate-pulse-once"
    )}>
      {status}
    </div>
  );
}