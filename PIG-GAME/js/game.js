const rollButton = document.querySelector(".roll__dice");
const holdButton = document.querySelector(".hold__dice");
const newGameButton = document.querySelector(".new__game");
const currentDiceSpan = document.querySelector(".current__dice-num");
const player1Score = document.querySelector(".player__score.player1")
const player2Score = document.querySelector(".player__score.player2")
const currentScores = Array.from(document.querySelectorAll('.current__score.score'));
const currentScorePlayer1 = currentScores[0];
const currentScorePlayer2 = currentScores[1];
const cards = Array.from(document.querySelectorAll(".card"));

const player1 = {
    currentScore: 0,
}
const player2 = {
    currentScore: 0,
}
let currentDiceNum = -1;

function generateDiceNum(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function switchPlayers(){
    console.log(cards)
    cards.map((card)=>{
        card.classList.toggle("active")
    })
}


function updateUI(){
    currentDiceSpan.textContent = currentDiceNum;
    player1Score.textContent = "0";
    player2Score.textContent = "0";
    currentScorePlayer1.textContent = "0";
    currentScorePlayer2.textContent = "0";
}


function handleNewGameButtonClick(){
    currentDiceNum = "";
    player1.currentScore = 0;
    player2.currentScore = 0;
    updateUI();
}


newGameButton.addEventListener("click",handleNewGameButtonClick);