// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Buttons
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// Game state variables
let gameState = 'start'; // 'start', 'playing', 'gameOver'
let score = 0;
let level = 1;
let playerHealth = 100;

// Player object
let player = {
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    color: 'red',
    speed: 5,
    velocityX: 0,
    velocityY: 0,
};

// Enemies array
let enemies = [];

// Power-ups array
let powerUps = [];

// Key tracking
let keys = {};

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Start button listener
startBtn.addEventListener('click', () => {
    gameState = 'playing';
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    spawnEnemies();
    spawnPowerUps();
    gameLoop();
});

// Restart button listener
restartBtn.addEventListener('click', () => {
    resetGame();
});

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'playing') {
        updateGame();
    }

    if (gameState === 'gameOver') {
        displayGameOver();
    } else {
        // Request the next frame
        requestAnimationFrame(gameLoop);
    }
}

// Update game state (playing mode)
function updateGame() {
    handlePlayerMovement();
    handleEnemyAI();
    checkCollisions();
    handlePowerUps();
    drawEntities();
    drawHUD();
}

// Display game over message
function displayGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333';
    ctx.font = '36px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
    restartBtn.style.display = 'inline-block';
}

// Handle player movement
function handlePlayerMovement() {
    if (keys['ArrowUp']) player.velocityY = -player.speed;
    else if (keys['ArrowDown']) player.velocityY = player.speed;
    else player.velocityY = 0;

    if (keys['ArrowLeft']) player.velocityX = -player.speed;
    else if (keys['ArrowRight']) player.velocityX = player.speed;
    else player.velocityX = 0;

    player.x += player.velocityX;
    player.y += player.velocityY;

    // Boundary checking
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Draw all game entities (player, enemies, power-ups)
function drawEntities() {
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Add CSS animation class for player
    canvas.classList.add('player');

    // Draw enemies
    enemies.forEach((enemy) => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        // Add animation class for enemies
        canvas.classList.add('enemy');
    });

    // Draw power-ups
    powerUps.forEach((powerUp) => {
        ctx.fillStyle = powerUp.color;
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);

        // Add animation class for power-ups
        canvas.classList.add('power-up');
    });
}

// ... (other functions remain unchanged) ...
