// Winning combinations - rows, columns, and diagonals
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

/**
 * Check if the current player has won
 */
export function checkWin(board: string[], player: string): boolean {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === player;
    });
  });
}

/**
 * Get the winning combination if there is one
 */
export function getWinningCombination(board: string[], player: string): number[] | null {
  const winningCombo = winningCombinations.find(combination => {
    return combination.every(index => {
      return board[index] === player;
    });
  });
  
  return winningCombo || null;
}

/**
 * Check if the game is a draw
 */
export function checkDraw(board: string[]): boolean {
  return board.every(cell => cell !== "");
}