"use strict";
document.addEventListener('keydown', function () {
    console.log("Key pressed! Transitioning to page 3...");
    window.location.href = "page3.html";
});

// Flip card images and configurations
const flipcardFrontImages = [
    'BlackC.png',
    'BlackA.png',
    'HeartA.png',
    'DimondA.png',
    'DimondAV.png',
    'BlackAV.png',
    '10B.png',
];
const flipcardBackImage = 'backC.png'; // Back of all cards
const numberOfCards = 8; // Must be even for pairing logic
const gameboard = document.getElementById("game-board");

// Helper function: Generate random numbers without duplicates
function generateRandomNumbers(total, max) {
    const numbers = [];
    while (numbers.length < total) {
        const rand = Math.floor(Math.random() * max);
        if (!numbers.includes(rand)) {
            numbers.push(rand);
        }
    }
    return numbers;
}

// Generate and render cards on the game board
function createCards() {
    if (!gameboard) return;

    // Randomly select pairs and shuffle
    const randomNumbers = generateRandomNumbers(numberOfCards / 2, flipcardFrontImages.length);
    const cardOrder = [...randomNumbers, ...randomNumbers].sort(() => Math.random() - 0.5);

    cardOrder.forEach(num => {
        // Create flipcard structure
        const flipcard = document.createElement("div");
        flipcard.classList.add("flipcard");

        const flipcardInner = document.createElement("div");
        flipcardInner.classList.add("flipcard-inner");

        const flipcardFront = document.createElement("div");
        flipcardFront.classList.add("flipcard-front");
        flipcardFront.style.backgroundImage = `url('${flipcardFrontImages[num]}')`;

        const flipcardBack = document.createElement("div");
        flipcardBack.classList.add("flipcard-back");

        flipcardInner.appendChild(flipcardFront);
        flipcardInner.appendChild(flipcardBack);
        flipcard.appendChild(flipcardInner);

        // Add flip functionality
        flipcard.addEventListener("click", () => {
            flipcard.classList.toggle("flipped");
            checkGameStatus();
        });

        gameboard.appendChild(flipcard);
    });
}

// Logic to check the game status
let flippedCards = [];
function checkGameStatus() {
    flippedCards = Array.from(document.querySelectorAll(".flipcard.flipped"));
    if (flippedCards.length === 2) {
        // Check if the flipped cards match
        const [card1, card2] = flippedCards;
        const front1 = card1.querySelector(".flipcard-front").style.backgroundImage;
        const front2 = card2.querySelector(".flipcard-front").style.backgroundImage;

        if (front1 === front2) {
            // Match found, leave cards flipped
            flippedCards = [];
        } else {
            // Not a match, unflip cards after a short delay
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                flippedCards = [];
            }, 1000);
        }
    }
}

// Initialize the game
createCards();
