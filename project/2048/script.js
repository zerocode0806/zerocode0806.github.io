const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let score = 0;

function drawGrid() {
    gameContainer.innerHTML = "";
    grid.forEach(row => {
        row.forEach(cell => {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.textContent = cell > 0 ? cell : "";
            if (cell) tile.dataset.value = cell;
            gameContainer.appendChild(tile);
        });
    });
    scoreDisplay.textContent = score;
}

function generateNewTile() {
    let emptyTiles = [];
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 0) emptyTiles.push({ x: rowIndex, y: colIndex });
        });
    });

    if (emptyTiles.length > 0) {
        let { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function slideRow(row) {
    let newRow = row.filter(cell => cell);
    while (newRow.length < 4) newRow.push(0);
    return newRow;
}

function combineRow(row) {
    for (let i = 0; i < 3; i++) {
        if (row[i] === row[i + 1] && row[i] !== 0) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    return row;
}

function moveLeft() {
    let moved = false;
    grid = grid.map(row => {
        let newRow = slideRow(combineRow(slideRow(row)));
        if (newRow.toString() !== row.toString()) moved = true;
        return newRow;
    });
    if (moved) generateNewTile();
}

function moveRight() {
    let moved = false;
    grid = grid.map(row => {
        let reversedRow = row.slice().reverse();
        let newRow = slideRow(combineRow(slideRow(reversedRow))).reverse();
        if (newRow.toString() !== row.toString()) moved = true;
        return newRow;
    });
    if (moved) generateNewTile();
}

function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let column = [grid[0][col], grid[1][col], grid[2][col], grid[3][col]];
        let newColumn = slideRow(combineRow(slideRow(column)));
        if (newColumn.toString() !== column.toString()) moved = true;
        for (let row = 0; row < 4; row++) grid[row][col] = newColumn[row];
    }
    if (moved) generateNewTile();
}

function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let column = [grid[0][col], grid[1][col], grid[2][col], grid[3][col]].reverse();
        let newColumn = slideRow(combineRow(slideRow(column))).reverse();
        if (newColumn.toString() !== column.toString()) moved = true;
        for (let row = 0; row < 4; row++) grid[row][col] = newColumn[row];
    }
    if (moved) generateNewTile();
}

function handleKeyPress(event) {
    if (event.key === "ArrowLeft") moveLeft();
    else if (event.key === "ArrowRight") moveRight();
    else if (event.key === "ArrowUp") moveUp();
    else if (event.key === "ArrowDown") moveDown();
    drawGrid();
}

document.addEventListener("keydown", handleKeyPress);

function initGame() {
    generateNewTile();
    generateNewTile();
    drawGrid();
}

initGame();
