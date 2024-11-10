const board = Array(9).fill(null);
let currentPlayer = 'X';
const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');

function renderBoard() {
    gameBoard.querySelectorAll('.cell').forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => 
        combo.every(index => board[index] === currentPlayer)
    );
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || checkWin()) return;
    
    board[index] = currentPlayer;
    renderBoard();

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
    } else if (board.every(cell => cell)) {
        message.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board.fill(null);
    currentPlayer = 'X';
    renderBoard();
    message.textContent = "Player X's turn";
}

gameBoard.addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', resetGame);

renderBoard();
