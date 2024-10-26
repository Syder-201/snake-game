const gameArea = document.getElementById('game');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');
const gameCountElement = document.getElementById('gameCount');
const gameSize = 400;
const blockSize = 20;

let snake = [{ x: 8 * blockSize, y: 8 * blockSize }];
let direction = { x: 0, y: 0 };
let food = { 
    x: Math.floor(Math.random() * (gameSize / blockSize)) * blockSize, 
    y: Math.floor(Math.random() * (gameSize / blockSize)) * blockSize 
};
let gameCount = 0; // Contador de jogos

function updateGame() {
    const newHead = { x: snake[0].x + direction.x * blockSize, y: snake[0].y + direction.y * blockSize };

    // Verifica se a cobrinha colidiu com a borda
    if (newHead.x < 0 || newHead.x >= gameSize || newHead.y < 0 || newHead.y >= gameSize) {
        alert('Você perdeu! Reiniciando...');
        resetGame();
        return;
    }

    snake.unshift(newHead);

    // Verifica se a cobrinha comeu a comida
    if (newHead.x === food.x && newHead.y === food.y) {
        placeFood();
    } else {
        snake.pop(); // Remove a cauda
    }

    draw();
}

function draw() {
    snakeElement.innerHTML = ''; // Limpa o elemento da cobra
    snake.forEach((part) => {
        const snakePart = document.createElement('div');
        snakePart.style.width = blockSize + 'px';
        snakePart.style.height = blockSize + 'px';
        snakePart.style.position = 'absolute';
        snakePart.style.left = part.x + 'px';
        snakePart.style.top = part.y + 'px';
        snakePart.style.backgroundColor = 'green';
        snakeElement.appendChild(snakePart);
    });

    foodElement.style.width = blockSize + 'px';
    foodElement.style.height = blockSize + 'px';
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    foodElement.style.backgroundColor = 'red';
}

function placeFood() {
    food.x = Math.floor(Math.random() * (gameSize / blockSize)) * blockSize;
    food.y = Math.floor(Math.random() * (gameSize / blockSize)) * blockSize;
}

function move(dir) {
    if (dir === 'up' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (dir === 'down' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (dir === 'left' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (dir === 'right' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

function resetGame() {
    snake = [{ x: 8 * blockSize, y: 8 * blockSize }];
    direction = { x: 0, y: 0 };
    placeFood();
    gameCount++; // Incrementa o contador
    gameCountElement.innerText = gameCount; // Atualiza a contagem de jogos
}

setInterval(updateGame, 100);