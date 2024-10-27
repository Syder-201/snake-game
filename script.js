const gameArea = document.getElementById('game');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameSize = 400;
const blockSize = 20;

let snake = [{ x: 8 * blockSize, y: 8 * blockSize }];
let direction = { x: 0, y: 0 };
let food = { 
    x: Math.floor(Math.random() * (gameSize / blockSize)) * blockSize, 
    y: Math.floor(Math.random() * (gameSize / blockSize)) * blockSize 
};
let score = 0; // Pontuação atual
let highScore = 0; // Pontuação mais alta (recorde)

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
        score++;
        if (score > highScore) {
            highScore = score; // Atualiza o recorde, se aplicável
        }
        placeFood();
    } else {
        snake.pop(); // Remove a cauda
    }

    draw();
    updateScoreDisplay();
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
    score = 0; // Reseta a pontuação atual
    placeFood();
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreDisplay.innerText = `${score} / ${highScore}`; // Exibe a pontuação e o recorde
}

setInterval(updateGame, 100);
