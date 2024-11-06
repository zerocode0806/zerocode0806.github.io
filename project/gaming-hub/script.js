// Predefined list of games
const games = [
    {
        name: "2048 Game",
        url: "2048",
        image: "images/2048.png"
    },
    {
        name: "Memory Game",
        url: "memory-game",
        image: "images/memory-game.png"
    },
    {
        name: "Tic Tac Toe",
        url: "tic-tac-toe",
        image: "images/tic-tac-toe.png"
    },
    {
        name: "Quizz Game",
        url: "quizz-game",
        image: "images/quizz.png"
    }
];

// Function to display games
function displayGames() {
    const gamesContainer = document.getElementById('games');
    gamesContainer.innerHTML = ''; // Clear existing games

    // Retrieve games from localStorage
    const storedGames = JSON.parse(localStorage.getItem('games')) || games;

    // Create game items
    storedGames.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameItem.innerHTML = `
            <a href="${game.url}" target="_blank">
                <img src="${game.image}" alt="${game.name}">
                <p>${game.name}</p>
            </a>
        `;
        gamesContainer.appendChild(gameItem);
    });
}

// Function to save games to localStorage
function saveGames() {
    localStorage.setItem('games', JSON.stringify(games));
}

// Initial setup
saveGames();
displayGames();