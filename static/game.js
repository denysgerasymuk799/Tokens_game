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
const ballUpperFace = document.getElementById("fallingBallUpperFace")
const ballLowerFace = document.getElementById("fallingBallLowerFace")
const ballUpperFace2 = document.getElementById("fallingBallUpperFace2")
const ballLowerFace2 = document.getElementById("fallingBallLowerFace2")
const ballUpperFace3 = document.getElementById("fallingBallUpperFace3")
const ballLowerFace3 = document.getElementById("fallingBallLowerFace3")

const ballsColors = ['red', 'green'];
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


// Initiate variables for ball movement animation
let token, token2, token3, speed = 0, opposite = false, gravity = 4, distance = 0
 // container = document.getElementById("fallingBallContainer"), limit = container.clientHeight - ballUpperFace.clientHeight;

function setTokenToColorFromRandom(){
    // Iterate from 2, because first token colors for both faces you already set
    let j = 1
    for (let i = 1; i < pageShowTokens.length; i++) {
        j = j + 1
        ballsFaces[j].classList.add(pageShowTokens[i].upperFace)
        j = j + 1
        ballsFaces[j].classList.add(pageShowTokens[i].lowerFace)
    }
}

function updateStatistics(token, choice){
    const userCorrect = match(token, choice)
    console.log("after match")

    if (userCorrect) {
        guessedField.innerHTML = ++guessed
        notification.innerHTML = "You are right !!!"
    } else {
        notification.innerHTML = "Wrong trial :("
    }
    console.log("after if")

    totalTriedField.innerHTML = ++totalTries
    guessedToAll = guessed / totalTries
    guessedToAllField.innerHTML = guessedToAll
}

// Logic of guess
function game(token, choice) {
    console.log("start game")
    ballLowerFace.classList.remove("green")
    ballLowerFace.classList.remove("red")
    ballLowerFace.classList.add(pageShowTokens[0].lowerFace)
    setTokenToColorFromRandom()

    // add and remove fadeIn to replace other white tokens on result colored tokens
    // after click on Green or Red button
    falling.classList.add("fadeIn")
    resultTokens.classList.remove("fadeIn")

    // set timeout to show user the result tokens
    let intervalID = 0;
    while (intervalID < 50000){
        intervalID = setTimeout(setTimer, 1000)
        console.log("interval2", intervalID)
    }
    resultTokens.classList.add("fadeIn")

    updateStatistics(token, choice)
}

// Check if token's lower face matches with user guess
function match(token, userChoice) {
    console.log("start match")
    console.log(token)

    return token.lowerFace === userChoice
}

function setTimer(){
    console.log("Run delay timer")
}

function removePreviousColors(token){
    // Remove previously set colors
    for (let i = 0; i < ballsColors.length; i++) {
        token.classList.remove(ballsColors[i])
    }
}

function setTokenToWhite(token){
    token.classList.add('white')
}

// Randommly choose one out of three tokens
function getRandomToken(tokens) {
    ballsFaces.forEach(removePreviousColors)
    ballsFaces.forEach(setTokenToWhite)
    ballUpperFace.classList.remove('white')

    // Chose random token
    random = Math.floor(Math.random()*tokens.length)
    const token = tokens[random]

    // save positions of other tokens after random function
    console.log("random", random)
    const token2 = tokens[(random + 1) % tokens.length]
    const token3 = tokens[(random + 2) % tokens.length]
    console.log("rand", token2, token3)

    // At chance 0.5 to swap sides
    token.flipToken()

    // Add to DOM
    ballUpperFace.classList.add(token.upperFace)
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
    console.log("after green game")

    ballUpperFace.style.top = "5px"
    ballUpperFace2.style.top = "5px"
    ballUpperFace3.style.top = "5px"

    result.classList.remove("fadeIn")
    falling.classList.add("fadeIn")
})

againBtn.addEventListener("click", () => {
    // prepare random token before start
    const tokensInOrder = getRandomToken(tokens)
    console.log("againBtn0", tokensInOrder)
    token = tokensInOrder["token"]
    token2 = tokensInOrder["token2"]
    token3 = tokensInOrder["token3"]
    console.log("againBtn", token, token2, token3)

    // reset ball postion
    ballUpperFace.style.top = "0px"
    ballUpperFace2.style.top = "0px"
    ballUpperFace3.style.top = "0px"

    // requestAnimationFrame(simulateFalling)
    result.classList.add("fadeIn")
    falling.classList.remove("fadeIn")
})