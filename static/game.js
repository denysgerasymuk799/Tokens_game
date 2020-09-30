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
const resultTokens = document.getElementById("resultTokens")
const falling = document.getElementById("guessProcess")

// balls to show other tokens, when first is randomly chosen

// This one is in guessToken (one coloroud among 6)
const ballToShow = document.getElementById("ballToShow")

// These will be portrayed in resultTokens container
const ballUpperFace = document.getElementById("fallingBallUpperFace")
const ballLowerFace = document.getElementById("fallingBallLowerFace")
const ballUpperFace2 = document.getElementById("fallingBallUpperFace2")
const ballLowerFace2 = document.getElementById("fallingBallLowerFace2")
const ballUpperFace3 = document.getElementById("fallingBallUpperFace3")
const ballLowerFace3 = document.getElementById("fallingBallLowerFace3")

const ballsColors = ['red', 'green', 'white'];
const ballsFaces = [
    ballUpperFace, ballLowerFace,
    ballUpperFace2, ballLowerFace2,
    ballUpperFace3, ballLowerFace3,
]

const notification = document.getElementById("notificationResult")


// Initiate variables to track the statistics + set tokens
let totalTries = 0
let guessed = 0
let guessedToAll = 0
const tokens = [new Token("green", "green"),
    new Token("red", "red"), new Token("red", "green")]

let pageShowTokens = [new Token("white", "white"),
    new Token("white", "white"), new Token("white", "white")]

let tokensInOrder;
// Initiate variables for ball movement animation
let token, token2, token3, speed = 0, opposite = false, gravity = 4, distance = 0

function setTokenToColorFromRandom(){
    // Iterate from 2, because first token colors for both faces you already set
    let j = -1
    for (let i = 0; i < pageShowTokens.length; i++) {
        j++
        if (j === 0){
            console.log(ballsFaces[j])
        }
        ballsFaces[j].classList.add(pageShowTokens[i].upperFace)
        j++
        ballsFaces[j].classList.add(pageShowTokens[i].lowerFace)
    }
}

function updateStatistics(token, choice){
    const userCorrect = match(token, choice)

    if (userCorrect) {
        guessedField.innerHTML = ++guessed
        notification.innerHTML = "You are right !!!"
    } else {
        notification.innerHTML = "Wrong guess :("
    }
    notification.classList.add('pb-4')

    totalTriedField.innerHTML = ++totalTries
    guessedToAll = Math.round(guessed / totalTries * 10000) / 100
    guessedToAllField.innerHTML = guessedToAll + '%'
}

// Logic of guess
function game(token, choice) {
    console.log("start game")
    ballsFaces.forEach(tok => {removePreviousColors(tok)})
    setTokenToColorFromRandom()
    updateStatistics(token, choice)
}

// Check if token's lower face matches with user guess
function match(token, userChoice) {

    return token.lowerFace === userChoice
}


function removePreviousColors(token){
    // Remove previously set colors
    for (let i = 0; i < ballsColors.length; i++) {
        token.classList.remove(ballsColors[i])
    }
}

function setTokenToWhite(token){
    removePreviousColors(token)
    token.classList.add('white')
}

// Randommly choose one out of three tokens
function getRandomToken(tokens) {
    // Chose random token
    random = Math.floor(Math.random()*tokens.length)
    token = tokens[random]

    // save positions of other tokens after random function
    token2 = tokens[(random + 1) % tokens.length]
    token3 = tokens[(random + 2) % tokens.length]

    // At chance 0.5 to swap sides
    token.flipToken()

    // Add to DOM
    removePreviousColors(ballToShow)
    ballToShow.classList.add(token.upperFace)
    pageShowTokens = [token, token2, token3]

    return {token, token2, token3}
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
    notification.classList.remove('pb-4')

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
    // prepare random token before start
    const tokensInOrder = getRandomToken(tokens)
    token = tokensInOrder["token"]
    token2 = tokensInOrder["token2"]
    token3 = tokensInOrder["token3"]

    result.classList.add("fadeIn")
    falling.classList.remove("fadeIn")
})