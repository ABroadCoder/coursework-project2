'use strict';

// Selecting elements and defining global variables
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRules = document.querySelector('.btn--rules');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const rulesText = document.querySelector('header');

let scores, currentScore, activePlayer, playing;

// Defining sound and sound settings
const diceSound = new Audio('PigGameDiceSound.wav');
diceSound.volume = 0.1;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

// function to refactor code and avoid repetition...DRY code 😊
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Display/hide rules
buttonRules.addEventListener('click', function () {
  if (rulesText.classList.contains('hidden') {
    rulesText.classList.remove('hidden');
  } 
  
  else {
    rulesText.classList.add('hidden');
  }
});

// Rolling dice functionality
buttonRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a pseudorandom die roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display the die
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Play the dice sound effect
    diceSound.play();

    // 4. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to other player
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (playing) {
    console.log('Hold button pressed');
    // 1. add current score to active player's total score
    scores[activePlayer] += currentScore;
    // e.g. scores[1] = scores[1] + currentScore;

    // 2. display updated total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 3. check whether total score is at least 20
    if (scores[activePlayer] >= 20) {
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent = `PLAYER ${
        activePlayer + 1
      } 👑`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      currentScore = 0;
      diceEl.classList.add('hidden');
    } else {
      // switch player
      switchPlayer();
      currentScore = 0;
    }
  }
});

// New Game button functionality
buttonNew.addEventListener('click', function () {
  document.getElementById(`name--${activePlayer}`).textContent = `PLAYER ${
    activePlayer + 1
  }`;
  init();
});
