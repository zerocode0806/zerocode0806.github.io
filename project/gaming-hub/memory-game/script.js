const gameContainer = document.getElementById('gameContainer');
const resultMessage = document.getElementById('resultMessage');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Symbols to use for the memory game
const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥭'];

// Function to start the game
function startGame() {
    matches = 0;
    resultMessage.textContent = '';
    gameContainer.innerHTML = '';
    const cards = [...symbols, ...symbols]; // Duplicate symbols for matching pairs
    shuffle(cards);

    // Create card elements
    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

// Function to shuffle the cards
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Function to handle card flip
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkMatch();
    }
}

// Function to check if two cards match
function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches += 1;
        if (matches === symbols.length) {
            resultMessage.textContent = 'You won! 🎉';
        }
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

// Function to reset the board state
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Start the game when the page loads
window.onload = startGame;
