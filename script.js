// Game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsAI = false;
const scores = { X: 0, O: 0, draws: 0 };

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');
const twoPlayersButton = document.getElementById('two-players');
const vsAIButton = document.getElementById('vs-ai');

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize game
function initGame() {
  cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
  });
  
  resetButton.addEventListener('click', resetGame);
  
  // Mode selection
  twoPlayersButton.addEventListener('click', () => {
    vsAI = false;
    twoPlayersButton.classList.add('active');
    vsAIButton.classList.remove('active');
    resetGame();
  });
  
  vsAIButton.addEventListener('click', () => {
    vsAI = true;
    vsAIButton.classList.add('active');
    twoPlayersButton.classList.remove('active');
    resetGame();
  });
  
  updateScoreboard();
}

// Handle cell click
function handleCellClick(cell) {
  const index = cell.getAttribute('data-index');
  
  // Check if cell is already filled or game is inactive
  if (board[index] !== "" || !gameActive) {
    return;
  }
  
  // Update board state
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  animateElement(cell);
  
  // Check game result
  if (checkWin()) {
    handleWin();
  } else if (checkDraw()) {
    handleDraw();
  } else {
    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`Player ${currentPlayer}'s turn`);
    
    // If playing against AI and it's O's turn, make AI move
    if (vsAI && currentPlayer === "O" && gameActive) {
      setTimeout(makeAIMove, 700); // Delay for better user experience
    }
  }
}

// Check for win
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

// Get winning combination
function getWinningCombination() {
  return winningCombinations.find(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

// Highlight winning cells
function highlightWinningCells() {
  const winningCombo = getWinningCombination();
  if (winningCombo) {
    winningCombo.forEach(index => {
      cells[index].classList.add('winning');
    });
  }
}

// Check for draw
function checkDraw() {
  return board.every(cell => cell !== "");
}

// Handle win
function handleWin() {
  gameActive = false;
  updateStatus(`Player ${currentPlayer} wins!`);
  
  // Update scores
  scores[currentPlayer]++;
  updateScoreboard();
  
  // Highlight winning cells
  highlightWinningCells();
}

// Handle draw
function handleDraw() {
  gameActive = false;
  updateStatus("Game ended in a draw!");
  
  // Update scores
  scores.draws++;
  updateScoreboard();
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  
  // Clear board UI
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('x', 'o', 'winning');
  });
  
  updateStatus(`Player X's turn`);
}

// Update status with animation
function updateStatus(message) {
  statusDisplay.textContent = message;
  animateElement(statusDisplay);
}

// Update scoreboard
function updateScoreboard() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draws;
}

// Animation helper
function animateElement(element) {
  element.classList.add('animate');
  setTimeout(() => {
    element.classList.remove('animate');
  }, 500);
}

// AI Functions
function makeAIMove() {
  // If game is no longer active, don't make a move
  if (!gameActive) return;
  
  // First check if AI can win in the next move
  const winningMove = findWinningMove("O");
  if (winningMove !== -1) {
    makeMove(winningMove);
    return;
  }
  
  // Then check if the player can win in their next move and block them
  const blockingMove = findWinningMove("X");
  if (blockingMove !== -1) {
    makeMove(blockingMove);
    return;
  }
  
  // Take center if available
  if (board[4] === "") {
    makeMove(4);
    return;
  }
  
  // Take corners if available
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === "");
  if (availableCorners.length > 0) {
    const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
    makeMove(randomCorner);
    return;
  }
  
  // Take any available side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(i => board[i] === "");
  if (availableSides.length > 0) {
    const randomSide = availableSides[Math.floor(Math.random() * availableSides.length)];
    makeMove(randomSide);
    return;
  }
}

function findWinningMove(player) {
  // Check each position to see if placing a marker there would result in a win
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      // Temporarily place the marker
      board[i] = player;
      
      // Check if this move would win
      const win = winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
      });
      
      // Remove the marker
      board[i] = "";
      
      if (win) {
        return i; // Return the winning position
      }
    }
  }
  
  return -1; // No winning move found
}

function makeMove(index) {
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());
  animateElement(cells[index]);
  
  // Check game result
  if (checkWin()) {
    handleWin();
  } else if (checkDraw()) {
    handleDraw();
  } else {
    // Switch player back to X
    currentPlayer = "X";
    updateStatus(`Player ${currentPlayer}'s turn`);
  }
}

// Start the game
initGame();