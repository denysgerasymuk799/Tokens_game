// Token class
class Token {
    constructor(face1, face2) {
        this.upperFace = face1
        this.lowerFace = face2
    }

    rotateSides () {
        [this.upperFace, this.lowerFace] = [this.lowerFace, this.upperFace]
    }

    flipToken() {
        // Imitation of flipping token
        let rotateAtOnce = Math.floor(Math.random()*2)
        if (rotateAtOnce) {
            this.rotateSides()
        }
    }
}

// Define all handler buttons and screens to be listened
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


// Initiate variables to track the statistics + set tokens
let totalTries = 0
let guessed = 0
let guessedToAll = 0
const tokens = [new Token("green", "green"), new Token("red", "red"), new Token("red", "green")]


// Initiate variables for ball movement animation
let token, speed = 0, opposite = false, gravity = 4, distance = 0,
 container = document.getElementById("fallingBallContainer"), limit = container.clientHeight - ball.clientHeight;

// Performs the affect of falling ball
function simulateFalling() {
    if (opposite){
        speed = speed > 0 ? -speed: speed
    }
    speed += gravity
    distance += speed
    ball.style.top = `${distance}px`
    if (distance >= limit) {
        opposite = true
    }
    if (speed <= 0) {
        opposite = false
    }
    if (distance >= limit && speed <= 0){
        distance = 0
        speed = 0
    } else {
        requestAnimationFrame(simulateFalling)
    }
}
// Finish animating falling ball


// Logic of guess
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

// Check if token's lower face matches with user guess
function match(token, userChoice) {
    return token.lowerFace == userChoice
}

// Randommly choose one out of three tokens
function getRandomToken(tokens) {
    // Remove previously set colors
    ball.classList.remove("green")
    ball.classList.remove("red")
    // Chose random token
    random = Math.floor(Math.random()*tokens.length)
    const token = tokens[random]
    // At chance 0.5 to swap sides
    token.flipToken()
    // Add to DOM
    ball.classList.add(token.upperFace)
    return token
}
// Finish logic

// Adding event listeners

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
    ball.style.top = "5px"
    result.classList.remove("fadeIn")
    falling.classList.add("fadeIn")
})

againBtn.addEventListener("click", () => {
    // prepare random token before start
    token = getRandomToken(tokens)
    // reset ball postion
    ball.style.top = "0px"
    requestAnimationFrame(simulateFalling)
    result.classList.add("fadeIn")
    falling.classList.remove("fadeIn")
})