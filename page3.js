const cardDeck = [
    "2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S",
    "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S",
    "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S",
    "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S",
    "10C", "10D", "10H", "10S", "AC", "AD", "AH", "AS",
    "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS",
    "KC", "KD", "KH", "KS"
].map(name => `${name}.png`);

let level = 1;
let score = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cardBoard = document.getElementById('card-board');
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', startGame);

function startGame() {
    level = 1;
    score = 0;
    updateScore();
    generateLevel();
}

function updateScore() {
    levelDisplay.textContent = `Level: ${level}`;
    scoreDisplay.textContent = `Score: ${score}`;
}

function generateLevel() {
    cardBoard.innerHTML = '';
    const numCards = level * 2 + 2;
    const cards = [...cardDeck].sort(() => Math.random() - 0.5).slice(0, numCards / 2);
    const cardPairs = [...cards, ...cards].sort(() => Math.random() - 0.5);

    cardBoard.style.gridTemplateColumns = `repeat(${Math.ceil(numCards / 4)}, 1fr)`;
    cardPairs.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.addEventListener('click', flipCard);
        cardBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    console.log(this.dataset.card);
    this.style.backgroundImage = `url(${this.dataset.card})`;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;

    if (isMatch) {
        disableCards();
        score++;
        if (cardBoard.querySelectorAll('.card:not(.matched)').length === 0) {
            level++;
            setTimeout(generateLevel, 1000);
        }
    } else {
        unflipCards();
    }

    updateScore();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard.style.backgroundImage = `url(backC.png)`;
        secondCard.style.backgroundImage = `url(backC.png)`;
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Initialize the game
startGame();
