'use strict';

const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const scoreInput = document.querySelector('#maxScore');

let score = [];
let currentScore = 0;
let activePlayer = 0;
let maxScore = 10;
let play = true;
let diceImage = document.querySelector('.dice');
let textScore1 = document.getElementById('score--0');
let textScore2 = document.getElementById('score--1');

textScore1.textContent = 0;
textScore2.textContent = 0;

const hideModal = function () {
  modalWindow.classList.add('hide');
  overlay.classList.add('hide');
};
const showModal = function () {
  modalWindow.classList.remove('hide');
  overlay.classList.remove('hide');
};

// Resets the game
const reset = function () {
  score = [];
  currentScore = 0;
  activePlayer = 0;
  play = true;
  textScore1.textContent = 0;
  textScore2.textContent = 0;
  diceImage.classList.remove('hide');

  playerOne.classList.add('player--active');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerTwo.classList.remove('player--active');
};

// Rolls a dice 1-6
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (play) {
    // Generates a number between 1-6
    let dice = Math.trunc(Math.random() * 6) + 1;
    // Displays dice image
    diceImage.src = 'dice-' + dice + '.png';

    if (dice !== 1) {
      // Add dice to current score of active player and displays it
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      playerOne.classList.toggle('player--active');
      playerTwo.classList.toggle('player--active');
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// Tracks players Scores
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (play) {
    score[activePlayer] = Number(
      document.getElementById(`score--${activePlayer}`).textContent
    );
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= maxScore) {
      play = false;
      diceImage.classList.add('hide');
      console.log(`player ${activePlayer + 1} won`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    }
    // Switch players when a one is rolled
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerOne.classList.toggle('player--active');
    playerTwo.classList.toggle('player--active');
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
});

// New Game button
document.querySelector('.btn--new').addEventListener('click', reset);

//Settings Button
document.querySelector('.btn--sett').addEventListener('click', showModal);

// Skip button functionality
document.querySelector('.close-modal').addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

//Submit button functionality
document.querySelector('#submit').addEventListener('click', function () {
  let p1name = document.querySelector('#player0').value;
  let p2name = document.querySelector('#player1').value;

  reset();
  hideModal();

  if (p1name == '') {
    p1name = 'PLAYER 1';
  }
  if (p2name == '') {
    p2name = 'PLAYER 2';
  }
  if (scoreInput.value == '') {
    document.querySelector('.btn--score').textContent = '🏆 10';
  } else {
    document.querySelector('.btn--score').textContent = '🏆 ' + maxScore;
  }

  document.querySelector('#name--0').textContent = p1name;
  document.querySelector('#name--1').textContent = p2name;
});

// Tracks user input on Score field
scoreInput.addEventListener('keyup', function (tecla) {
  if (tecla.keyCode === 189 || tecla.keyCode === 109) {
    scoreInput.value = '';
  } else if (scoreInput.value > 100 || scoreInput.value < 1) {
    scoreInput.value = '';
  } else {
    maxScore = scoreInput.value;
  }
});
