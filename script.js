// script.js

// Function to initialize a simple Guess the Number game
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
            messageDisplay.style.color = 'green';
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

    // Add some basic styling for the game elements
    gameContainer.style.padding = '15px';
    gameContainer.style.backgroundColor = '#e6f7ff';
    gameContainer.style.borderRadius = '8px';
    gameContainer.style.border = '1px solid #cceeff';
    gameContainer.style.marginTop = '10px'; /* Space from title/description */

    guessInput.style.padding = '8px';
    guessInput.style.margin = '10px 0';
    guessInput.style.width = 'calc(100% - 16px)';
    guessInput.style.borderRadius = '5px';
    guessInput.style.border = '1px solid #ccc';
    guessInput.style.boxSizing = 'border-box';

    submitButton.style.backgroundColor = '#007bff';
    submitButton.style.color = 'white';
    submitButton.style.padding = '10px 15px';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '5px';
    submitButton.style.cursor = 'pointer';
    submitButton.style.transition = 'background-color 0.3s ease';

    submitButton.onmouseover = function() { this.style.backgroundColor = '#0056b3'; };
    submitButton.onmouseout = function() { this.style.backgroundColor = '#007bff'; };

    messageDisplay.style.fontWeight = 'bold';
    messageDisplay.style.marginTop = '10px';
}

// Initialize the game when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    createGuessTheNumberGame('guess-game-container');
});
