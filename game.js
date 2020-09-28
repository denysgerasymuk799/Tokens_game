const startBtn = document.getElementById("startBtn")
const quitBtn = document.getElementById("quitBtn")
const againBtn = document.getElementById("againBtn")
const startScreen = document.querySelector(".startGameScreen")
const gameScreen = document.querySelector(".gameScreen")
const redBtn = document.getElementById("redBtn")
const greenBtn = document.getElementById("greenBtn")
const totalTriedField = document.getElementById("totalTried")
const guessedField = document.getElementById("guessed")
const guessedToAllField = document.getElementById("guessedToAll")
const result = document.getElementById("result")
const falling = document.getElementById("guessProcess")
const ball = document.getElementById("fallingBall")
const notification = document.getElementById("notificationResult")


console.log(startBtn)
console.log(guessedField)
console.log(guessedToAllField)
console.log(totalTriedField)


class Token {
    constructor(face1, face2) {
        this.upperFace = face1
        this.lowerFace = face2
    }

    rotateSides () {
        [this.upperFace, this.lowerFace] = [this.lowerFace, this.upperFace]
    }
}


let totalTries = 0
let guessed = 0
let guessedToAll = 0
let token;

const tokens = [new Token("green", "green"), new Token("red", "red"), new Token("red", "green")]


function simulateFalling() {
    
}

function game(token, choice) {
    const userCorrect = match(token, choice)
    if (userCorrect) {
        guessedField.innerHTML = ++guessed
        notification.innerHTML = "Correct guess"
    } else {
        notification.innerHTML = "Wrong guess"
    }
    totalTriedField.innerHTML = ++totalTries
    guessedToAll = guessed / totalTries
    guessedToAllField.innerHTML = guessedToAll
}


function match(token, userChoice) {
    return token.lowerFace == userChoice
}

function getRandomToken(tokens) {
    // Remove previously set colors
    ball.classList.remove("green")
    ball.classList.remove("red")
    // Chose random token
    random = Math.floor(Math.random()*tokens.length)
    const token = tokens[random]
    // At chance 0.5 to swap sides
    let rotateAtOnce = Math.floor(Math.random()*2)
    if (rotateAtOnce) {
        token.rotateSides()
    }
    // Add to DOM
    console.log(token.upperFace)
    ball.classList.add(token.upperFace)
    return token
}

startBtn.addEventListener("click", () => {
    gameScreen.classList.remove("fadeIn")
    startScreen.classList.add("fadeIn")
})


quitBtn.addEventListener("click", () => {
    startScreen.classList.remove("fadeIn")
    gameScreen.classList.add("fadeIn")
    // Reset all data
    guessed = 0
    totalTries = 0
    guessedToAll = 0
    guessedField.innerHTML = guessed
    totalTriedField.innerHTML = totalTries
    guessedToAllField.innerHTML = guessedToAll
    notification.innerHTML = ""
})

redBtn.addEventListener("click", () => {
    game(token, "red")
    result.classList.remove("fadeIn")
    falling.classList.add("fadeIn")
})

greenBtn.addEventListener("click", () => {
    game(token, "green")
    result.classList.remove("fadeIn")
    falling.classList.add("fadeIn")
})

againBtn.addEventListener("click", () => {
    token = getRandomToken(tokens)
    result.classList.add("fadeIn")
    falling.classList.remove("fadeIn")
})