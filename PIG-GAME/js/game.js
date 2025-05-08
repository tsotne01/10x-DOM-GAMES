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

let accumulated = 0;

const player1 = {
    currentScore: 0,
    active: true,
}
const player2 = {
    currentScore: 0,
    active: false
}
let currentDiceNum = 0;

function generateDiceNum(min = 1, max = 6) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function switchPlayers() {
    console.log(cards)
    cards.map((card) => {
        card.classList.toggle("active")
    })
    player1.active = !player1.active
    player2.active = !player2.active
    accumulated = 0;
    updateUI();

}


function updateUI() {
    if (player1.currentScore >= 100) {
        holdButton.removeEventListener("click", handleHoldButtonClick)
        rollButton.removeEventListener("click", handleRollButtonClick);
        setWinner(player1)
        return;
    }
    if (player2.currentScore >= 100) {
        holdButton.removeEventListener("click", handleHoldButtonClick)
        rollButton.removeEventListener("click", handleRollButtonClick);
        setWinner(player2)
        return;
    }

    currentDiceSpan.textContent = currentDiceNum;

    if (player1.active) {
        player1Score.textContent = player1.currentScore;
        currentScorePlayer1.textContent = accumulated;
        return
    }

    if (player2.active) {
        player2Score.textContent = player2.currentScore;
        currentScorePlayer2.textContent = accumulated;
        return;
    }
}


function handleNewGameButtonClick() {
    rollButton.removeAttribute("disabled");
    holdButton.removeAttribute("disabled");
    currentDiceNum = "";
    player1.currentScore = 0;
    player2.currentScore = 0;
    cards[0].classList.add("active");
    cards[1].classList.remove("active");
    player1Score.textContent = "0";
    currentScorePlayer1.textContent = "0";
    player2Score.textContent = "0";
    currentScorePlayer2.textContent = "0";
    player1.active = true;
    player2.active = false;
    accumulated = 0;
    holdButton.addEventListener("click", handleHoldButtonClick)
    rollButton.addEventListener("click", handleRollButtonClick);
    updateUI();
}

function setWinner(player) {
    if (player === player1) {
        cards[0].classList.add("active");
        cards[1].classList.remove("active");
        player1Score.textContent = player1.currentScore + accumulated;
        currentDiceSpan.textContent = "Player 1 Won"
        return;
    }
    cards[1].classList.add("active")
    cards[0].classList.remove("active");
    player2Score.textContent = player2.currentScore + accumulated;
    currentDiceSpan.textContent = "Player 2 Won"
}

function handleRollButtonClick() {
    
    currentDiceNum = generateDiceNum();
    if (currentDiceNum === 1) {
        accumulated = 0;
        updateUI();
        switchPlayers();
        return;
    }
    accumulated += currentDiceNum;
    updateUI();
}

function handleHoldButtonClick() {
    if (player1.active && player1.currentScore < 100) {
        player1.currentScore += accumulated;
        accumulated = 0;
        updateUI();
        switchPlayers();
        return;
    }

    if (player2.active && player2.currentScore < 100) {
        player2.currentScore += accumulated;
        accumulated = 0;
        updateUI();
        switchPlayers();
        return;
    }

    if (currentDiceNum === 0) {
        switchPlayers();
        return;
    };
}

holdButton.addEventListener("click", handleHoldButtonClick)

rollButton.addEventListener("click", handleRollButtonClick);

newGameButton.addEventListener("click", handleNewGameButtonClick);