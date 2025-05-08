const secretNumberElement = document.getElementById('secretNumber');
const guessInputElement = document.getElementById('guessInput');
const checkButtonElement = document.getElementById('checkButton');
const againButtonElement = document.getElementById('againButton');
const messageElement = document.getElementById('gameMessage');
const currentScoreElement = document.getElementById('currentScore');
const highestScoreElement = document.getElementById('highestScore');
const bodyElement = document.body;

let secretNumber;
let score;
let highscore = 0;
let gameActive = true;

const MAX_NUMBER = 20;
const MIN_NUMBER = 1;
const STARTING_SCORE = 20;

const initGame = () => {
  secretNumber = generateRandomNumber(MIN_NUMBER, MAX_NUMBER);
  score = STARTING_SCORE;
  gameActive = true;
  
  secretNumberElement.textContent = '?';
  guessInputElement.value = '';
  messageElement.textContent = 'Start Guessing...';
  currentScoreElement.textContent = score;
  
  bodyElement.classList.remove('correct', 'wrong');
  secretNumberElement.style.width = '15rem';
  
  guessInputElement.focus();
};

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const displayMessage = (message) => {
  messageElement.textContent = message;
};

const updateScore = (newScore) => {
  score = newScore;
  currentScoreElement.textContent = score;
};

const checkGuess = () => {
  if (!gameActive) {
    displayMessage('Game over! Press Again to restart.');
    return;
  }
  
  const guess = Number(guessInputElement.value);
  
  if (!guess) {
    displayMessage('Enter a valid number!');
    bodyElement.classList.add('wrong');
    setTimeout(() => bodyElement.classList.remove('wrong'), 300);
    return;
  }
  
  if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
    displayMessage(`Number must be between ${MIN_NUMBER} and ${MAX_NUMBER}!`);
    bodyElement.classList.add('wrong');
    setTimeout(() => bodyElement.classList.remove('wrong'), 300);
    return;
  }
  
  if (guess === secretNumber) {
    handleCorrectGuess();
  } else {
    handleWrongGuess(guess);
  }
};

const handleCorrectGuess = () => {
  displayMessage('🎉 Correct Number!');
  secretNumberElement.textContent = secretNumber;
  bodyElement.classList.add('correct');
  
  if (score > highscore) {
    highscore = score;
    highestScoreElement.textContent = highscore;
    displayMessage('🏆 New High Score!');
  }
  
  gameActive = false;
  
  secretNumberElement.style.width = '18rem';

  saveHighscore();
};

const handleWrongGuess = (guess) => {
  if (score > 1) {
    const message = guess > secretNumber 
      ? 'Too high!' 
      : 'Too low!';
    displayMessage(message);
    updateScore(score - 1);
    
    bodyElement.classList.add('wrong');
    setTimeout(() => bodyElement.classList.remove('wrong'), 300);
    
  } else {
    displayMessage('💥 Game Over!');
    updateScore(0);
    gameActive = false;
  }
};


const saveHighscore = () => {
  localStorage.setItem('guessNumberHighscore', highscore);
};

const loadHighscore = () => {
  const savedHighscore = localStorage.getItem('guessNumberHighscore');
  if (savedHighscore) {
    highscore = Number(savedHighscore);
    highestScoreElement.textContent = highscore;
  }
};

checkButtonElement.addEventListener('click', checkGuess);
againButtonElement.addEventListener('click', initGame);

guessInputElement.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    checkGuess();
  }
});
const showWelcomeMessage = () => {
    displayMessage('Welcome! Guess a number between 1 and 20');
    setTimeout(() => {
      displayMessage('Start Guessing...');
    }, 1000);
};

document.addEventListener('DOMContentLoaded', () => {
  loadHighscore();
  initGame();
  showWelcomeMessage();
});

document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(2px)';
  });
  
  button.addEventListener('mouseup', function() {
    this.style.transform = '';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});
