# Jay-XO Game (React Version)

A modern Tic-Tac-Toe game built with React, TypeScript, and Tailwind CSS. Play against a friend or challenge the AI opponent.

## Features

- Clean, responsive design with modern UI components
- Two game modes: 2 Players or vs AI
- Score tracking for X wins, O wins, and draws
- Winning combination highlighting
- Smooth animations and transitions
- Reset functionality
- Responsive layout that works on mobile and desktop

## How to Play

1. Choose a game mode: "2 Players" or "vs AI"
2. In 2 Players mode, players take turns placing X and O on the board
3. In vs AI mode, you play as X and the computer plays as O
4. The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins
5. If the board fills up without a winner, the game is a draw
6. Use the "Reset Game" button to start a new game at any time
7. The scoreboard keeps track of wins and draws

## AI Strategy

The AI opponent follows these strategies:
- Win if possible in the next move
- Block the player from winning
- Take the center if available
- Take corners when strategic
- Take available sides

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Vite build tool

## How to Run Locally

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open your browser to the URL shown in the terminal (usually http://localhost:5000)

## How to Deploy to GitHub Pages

### Option 1: Deploy the production build directly

1. Create a new GitHub repository
2. Build the project with `npm run build`
3. Upload the contents of the `dist` folder to the `gh-pages` branch of your repository
4. Configure GitHub Pages to use the `gh-pages` branch as the source
5. Your game will be published at `https://[your-username].github.io/[repo-name]/`

### Option 2: Use GitHub Actions for automatic deployment

1. Create a new GitHub repository
2. Push your code to the repository
3. Create a `.github/workflows/deploy.yml` file with GitHub Actions configuration for building and deploying to GitHub Pages
4. Your game will be automatically built and deployed whenever you push to the main branch

## License

This project is licensed under the MIT License - see the LICENSE file for details.