const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
const statusDisplay = document.getElementById('status');
const gameModeSelector = document.getElementById('game-mode');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let gameMode = 'vsComputer'; // Default mode

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Listen to mode selection
gameModeSelector.addEventListener('change', () => {
    gameMode = gameModeSelector.value;
    restartGame();
});

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    makeMove(cell, index);

    if (gameMode === 'vsComputer' && isGameActive && currentPlayer === 'O') {
        setTimeout(computerMove, 500); // Delay for computer move
    }
}

function makeMove(cell, index) {
    cell.innerText = currentPlayer;
    cell.classList.add('taken');
    board[index] = currentPlayer;
    checkResult();

    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerText = 'Draw!';
        isGameActive = false;
        return;
    }
}

function computerMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    cells[move].innerText = 'O';
    cells[move].classList.add('taken');
    board[move] = 'O';
    checkResult();

    currentPlayer = 'X';
}

function minimax(newBoard, depth, isMaximizing) {
    if (checkWinner('O')) return 10 - depth;
    if (checkWinner('X')) return depth - 10;
    if (!newBoard.includes('')) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'O';
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'X';
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(player) {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusDisplay.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('taken');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
