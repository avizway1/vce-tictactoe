/**
 * Tic-Tac-Toe Game Logic
 * Professional 2-Player Local Multiplayer
 */

// Game state management
const GameState = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    isGameActive: true,
    
    // Winning combinations (indices)
    winningConditions: [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ]
};

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

/**
 * Initialize the game
 */
function initGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetButton.addEventListener('click', resetGame);
}

/**
 * Handle cell click event
 */
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Ignore if cell is already taken or game is over
    if (GameState.board[clickedCellIndex] !== '' || !GameState.isGameActive) {
        return;
    }

    // Update game state and UI
    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

/**
 * Update cell with current player's mark
 */
function updateCell(cell, index) {
    GameState.board[index] = GameState.currentPlayer;
    cell.textContent = GameState.currentPlayer;
    cell.classList.add('taken');
    cell.classList.add(GameState.currentPlayer.toLowerCase());
}

/**
 * Check for win or draw
 */
function checkResult() {
    let roundWon = false;
    let winningCombination = null;

    // Check all winning conditions
    for (let i = 0; i < GameState.winningConditions.length; i++) {
        const condition = GameState.winningConditions[i];
        const a = GameState.board[condition[0]];
        const b = GameState.board[condition[1]];
        const c = GameState.board[condition[2]];

        // Skip if any cell in the combination is empty
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // Check if all three cells match
        if (a === b && b === c) {
            roundWon = true;
            winningCombination = condition;
            break;
        }
    }

    if (roundWon) {
        handleWin(winningCombination);
        return;
    }

    // Check for draw
    const isDraw = !GameState.board.includes('');
    if (isDraw) {
        handleDraw();
        return;
    }

    // Continue game - switch player
    switchPlayer();
}

/**
 * Handle win condition
 */
function handleWin(winningCombination) {
    statusDisplay.textContent = `Player ${GameState.currentPlayer} wins! 🎉`;
    statusDisplay.classList.add('winner');
    GameState.isGameActive = false;

    // Highlight winning cells
    winningCombination.forEach(index => {
        cells[index].classList.add('winning');
    });
}

/**
 * Handle draw condition
 */
function handleDraw() {
    statusDisplay.textContent = "It's a draw! 🤝";
    statusDisplay.classList.add('draw');
    GameState.isGameActive = false;
}

/**
 * Switch to the other player
 */
function switchPlayer() {
    GameState.currentPlayer = GameState.currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${GameState.currentPlayer}'s turn`;
}

/**
 * Reset the game to initial state
 */
function resetGame() {
    // Reset game state
    GameState.board = ['', '', '', '', '', '', '', '', ''];
    GameState.currentPlayer = 'X';
    GameState.isGameActive = true;

    // Reset UI
    statusDisplay.textContent = "Player X's turn";
    statusDisplay.classList.remove('winner', 'draw');

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'x', 'o', 'winning');
    });
}

// Initialize game when DOM is loaded
initGame();
