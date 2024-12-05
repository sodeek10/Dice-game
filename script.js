'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // toggle player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    //to give each dice number a corresponding image
    diceEl.src = `dice-${dice}.png`;
    //check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if rolled 1, switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if player score is already 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
  //finish the game
  //switch player
});
const init = function () {
  //reset scores
  scores[0] = 0;
  scores[1] = 0;
  //reset active player
  activePlayer = 0;
  //reset current score
  currentScore = 0;
  //reset playing status
  playing = true;
  //remove winner class from players
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  //toggle colour between players
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  //hide dice
  diceEl.classList.add('hidden');
  //reset text content of scores and current scores
  score1El.textContent = 0;
  score2El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
};
//reset the game using button new
btnNew.addEventListener('click', function () {
  init();
});
