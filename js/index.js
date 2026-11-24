
const startScreen = document.querySelector(".start-screen")
const gameScreen = document.querySelector(".game-screen")
const endScreen = document.querySelector(".end-screen")
const startBtn = document.querySelector(".start-btn")
const retryButton = document.querySelector(".retry-btn")

let game

window.addEventListener("load", () => {

    startBtn.addEventListener("click", () => {
        game = new Game()
        game.startGame()
    })

    retryButton.addEventListener("click", () => {
        if (game) {
            game.restartGame()
        }
    })

    document.addEventListener("keydown", (e) => {
        if (
            game &&
            game.player &&
            !game.isGameOver &&
            e.key === "ArrowUp"
        ) {
            e.preventDefault()
            game.player.jump()
        }
    })

})
