// script.js

// This part of the code initializes the "Guess the Number" game.
function createGuessTheNumberGame(containerId) {
    const gameContainer = document.getElementById(containerId);

    if (!gameContainer) {
        console.error(`Guess Game: Container with ID '${containerId}' not found.`);
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
            messageDisplay.style.color = 'var(--secondary-color)';
            endGame(true);
        } else if (attempts >= maxAttempts) {
            messageDisplay.textContent = `Game Over! The number was ${randomNumber}.`;
            messageDisplay.style.color = 'red';
            endGame(false);
        } else {
            messageDisplay.textContent = `Too ${userGuess < randomNumber ? 'low' : 'high'}! Try again. Attempts left: ${maxAttempts - attempts}`;
            messageDisplay.style.color = 'orange';
        }
        guessInput.value = '';
    }

    function endGame(won) {
        guessInput.disabled = true;
        submitButton.disabled = true;
        resetButton.style.display = 'block';
    }

    function resetGame() {
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
    gameContainer.style.backgroundColor = 'var(--dark-bg)';
    gameContainer.style.borderRadius = '10px';
    gameContainer.style.border = '1px solid var(--border-dark)';
    gameContainer.style.marginTop = '20px';
    gameContainer.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.2)';

    guessInput.style.padding = '12px';
    guessInput.style.margin = '15px 0';
    guessInput.style.width = 'calc(100% - 24px)';
    guessInput.style.borderRadius = '8px';
    guessInput.style.border = '1px solid var(--border-dark)';
    guessInput.style.boxSizing = 'border-box';
    guessInput.style.backgroundColor = '#2a2a2a';
    guessInput.style.color = 'var(--light-text)';
    guessInput.style.textAlign = 'center';

    submitButton.style.backgroundColor = 'var(--accent-color)';
    submitButton.style.color = 'var(--light-text)';
    submitButton.style.padding = '12px 25px';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '5px';
    submitButton.style.cursor = 'pointer';
    submitButton.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
    submitButton.style.fontWeight = '700';
    submitButton.style.textTransform = 'uppercase';

    submitButton.onmouseover = function() { this.style.backgroundColor = 'var(--primary-color)'; this.style.transform = 'translateY(-2px)'; };
    submitButton.onmouseout = function() { this.style.backgroundColor = 'var(--accent-color)'; this.style.transform = 'translateY(0)'; };

    resetButton.style.backgroundColor = 'var(--primary-color)';
    resetButton.style.color = 'var(--light-text)';
    resetButton.style.padding = '10px 20px';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
    resetButton.style.fontWeight = '700';
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
    console.log('DOM Content Loaded. Running main script.');

    // Initialize the "Guess the Number" game if its container exists
    const guessGameContainer = document.getElementById('guess-game-container');
    if (guessGameContainer) {
        console.log('Guess game container found. Initializing game.');
        createGuessTheNumberGame('guess-game-container');
    }

    // Functionality for the "Start Playing Now!" button in the hero section
    const startPlayingButton = document.querySelector('#hero button');
    const gamesSection = document.getElementById('games');

    if (startPlayingButton && gamesSection) {
        console.log('Hero button and games section found. Adding scroll event listener.');
        startPlayingButton.addEventListener('click', () => {
            gamesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Fullscreen button functionality for game wrapper pages (will only run on game pages)
    const fullscreenButton = document.querySelector('.fullscreen-button');
    const gameIframe = document.querySelector('.game-iframe'); // Selects the first iframe with this class

    if (fullscreenButton && gameIframe) {
        console.log('Fullscreen button and game iframe found. Adding click listener.');
        fullscreenButton.addEventListener('click', () => {
            console.log('Fullscreen button clicked.');
            try {
                // Check for various browser implementations of fullscreen API
                if (gameIframe.requestFullscreen) {
                    gameIframe.requestFullscreen().then(() => {
                        console.log('Fullscreen request initiated successfully.');
                    }).catch(error => {
                        console.error('Fullscreen request rejected or failed promise:', error);
                        alert(`Fullscreen request failed: ${error.message || error.name}. This is often due to browser security or the game itself.`);
                    });
                } else if (gameIframe.mozRequestFullScreen) { /* Firefox */
                    gameIframe.mozRequestFullScreen();
                    console.log('Fullscreen request (Firefox) initiated successfully.');
                } else if (gameIframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    gameIframe.webkitRequestFullscreen();
                    console.log('Fullscreen request (WebKit) initiated successfully.');
                } else if (gameIframe.msRequestFullscreen) { /* IE/Edge */
                    gameIframe.msRequestFullscreen();
                    console.log('Fullscreen request (MS) initiated successfully.');
                } else {
                    console.warn('Fullscreen API not supported by this browser or element for iframe.');
                    alert('Your browser does not support the Fullscreen API for this game.');
                }
            } catch (error) {
                console.error('Caught error during fullscreen API call:', error);
                // Specific error message for common fullscreen issues
                if (error.name === 'SecurityError' || error.name === 'NotAllowedError' || error.name === 'InvalidStateError') {
                    alert('Could not go fullscreen. This is likely due to browser security restrictions, the game not allowing fullscreen when embedded, or cross-origin issues.');
                } else {
                    alert('An unexpected error occurred while trying to go fullscreen: ' + error.message);
                }
            }
        });
    } else {
        console.log('Fullscreen button or game iframe not found on this page (expected on game wrapper pages).');
    }
});
    ```

---

**Instructions to update `script.js`:**

1.  Go to your `fusion-gaming.github.io` repository on GitHub.
2.  Click on the `script.js` file.
3.  Click the "pencil" icon to edit the file.
4.  **Replace all the existing code** in the editor with the JavaScript code provided above.
5.  Add a commit message (e.g., "Regenerated script.js with enhanced fullscreen logging and error handling").
6.  Click **"Commit changes"**.

---

**After you commit this:**

1.  **Wait 5-10 minutes** for GitHub Pages to build and deploy.
2.  Go to a game page (e.g., `https://fusion-gaming.github.io/games/snowrider-embed-page.html`).
3.  **Perform a hard refresh:** (`Ctrl + F5` or `Cmd + Shift + R`).
4.  **Open the Developer Console (F12 or Cmd+Option+I -> Console tab).**
5.  **Click the "Fullscreen" button.**

**Now, please report any new or changed messages you see in the Console.** These messages will be crucial. If you see alerts about "SecurityError" or "NotAllowedError," that confirms it's a browser security restriction with the embedded game content itself, which is beyond what standard web code can directly control.
