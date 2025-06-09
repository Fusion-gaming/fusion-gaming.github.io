// script.js

// This part of the code initializes the "Guess the Number" game.
function createGuessTheNumberGame(containerId) {
    const gameContainer = document.getElementById(containerId);

    if (!gameContainer) {
        console.error(`Game container with ID '${containerId}' not found.`);
        return;
    }

    // Clear existing content and set up game elements
    gameContainer.innerHTML = `
        <h4>Guess the Number (1-10)</h4>
        <p>I'm thinking of a number...</p>
        <input type="number" id="guessInput" min="1" max="10" placeholder="Enter your guess">
        <button id="submitGuess">Guess!</button>
        <p id="message"></p>
        <button id="resetGame" style="display:none; margin-top:10px;">Play Again</button>
    `;

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    let attempts = 0;
    const maxAttempts = 3;

    const guessInput = document.getElementById('guessInput');
    const submitButton = document.getElementById('submitGuess');
    const messageDisplay = document.getElementById('message');
    const resetButton = document.getElementById('resetGame');

    function checkGuess() {
        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            messageDisplay.textContent = 'Please enter a valid number between 1 and 10.';
            return;
        }

        attempts++;

        if (userGuess === randomNumber) {
            messageDisplay.textContent = `Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts!`;
            messageDisplay.style.color = 'var(--secondary-color)'; // Using CSS variable for consistency
            endGame(true);
        } else if (attempts >= maxAttempts) {
            messageDisplay.textContent = `Game Over! The number was ${randomNumber}.`;
            messageDisplay.style.color = 'red';
            endGame(false);
        } else {
            messageDisplay.textContent = `Too ${userGuess < randomNumber ? 'low' : 'high'}! Try again. Attempts left: ${maxAttempts - attempts}`;
            messageDisplay.style.color = 'orange';
        }
        guessInput.value = ''; // Clear input after guess
    }

    function endGame(won) {
        guessInput.disabled = true;
        submitButton.disabled = true;
        resetButton.style.display = 'block';
    }

    function resetGame() {
        // Re-initialize the game
        createGuessTheNumberGame(containerId);
    }

    submitButton.addEventListener('click', checkGuess);
    guessInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });
    resetButton.addEventListener('click', resetGame);

    // Basic styling for the game elements (can be moved to CSS if preferred)
    gameContainer.style.padding = '20px';
    gameContainer.style.backgroundColor = 'var(--dark-bg)'; // Use CSS variable
    gameContainer.style.borderRadius = '10px';
    gameContainer.style.border = '1px solid var(--border-dark)'; // Use CSS variable
    gameContainer.style.marginTop = '20px';
    gameContainer.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.2)'; // Subtle glow

    guessInput.style.padding = '12px';
    guessInput.style.margin = '15px 0';
    guessInput.style.width = 'calc(100% - 24px)'; // Account for padding
    guessInput.style.borderRadius = '8px';
    guessInput.style.border = '1px solid var(--border-dark)';
    guessInput.style.boxSizing = 'border-box';
    guessInput.style.backgroundColor = '#2a2a2a'; // Match form inputs
    guessInput.style.color = 'var(--light-text)';
    guessInput.style.textAlign = 'center';

    submitButton.style.backgroundColor = 'var(--accent-color)'; // Use accent color
    submitButton.style.color = 'var(--light-text)';
    submitButton.style.padding = '12px 25px';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '5px';
    submitButton.style.cursor = 'pointer';
    submitButton.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
    submitButton.style.fontWeight = '700'; // Make it bold
    submitButton.style.textTransform = 'uppercase';

    submitButton.onmouseover = function() { this.style.backgroundColor = 'var(--primary-color)'; this.style.transform = 'translateY(-2px)'; };
    submitButton.onmouseout = function() { this.style.backgroundColor = 'var(--accent-color)'; this.style.transform = 'translateY(0)'; };

    resetButton.style.backgroundColor = 'var(--primary-color)'; // Use primary color
    resetButton.style.color = 'var(--light-text)';
    resetButton.style.padding = '10px 20px';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
    resetButton.style.fontWeight = '700'; // Make it bold
    resetButton.style.textTransform = 'uppercase';
    resetButton.onmouseover = function() { this.style.backgroundColor = 'var(--secondary-color)'; this.style.transform = 'translateY(-2px)'; };
    resetButton.onmouseout = function() { this.style.backgroundColor = 'var(--primary-color)'; this.style.transform = 'translateY(0)'; };


    messageDisplay.style.fontWeight = 'bold';
    messageDisplay.style.marginTop = '15px';
    messageDisplay.style.fontSize = '1.1em';
    messageDisplay.style.color = 'var(--light-text)';
}

// Ensure the DOM is fully loaded before trying to access elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the "Guess the Number" game
    createGuessTheNumberGame('guess-game-container');

    // Functionality for the "Start Playing Now!" button in the hero section
    const startPlayingButton = document.querySelector('#hero button');
    const gamesSection = document.getElementById('games');

    if (startPlayingButton && gamesSection) {
        startPlayingButton.addEventListener('click', () => {
            gamesSection.scrollIntoView({ behavior: 'smooth' }); // Smoothly scrolls to the games section
        });
    }
});
