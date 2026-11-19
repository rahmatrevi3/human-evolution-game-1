class Obstacle {
    constructor() {
        this.gameScreen = document.querySelector(".game-screen")
        this.element = document.createElement("div")
        this.x = 1400
        this.y = 430
        this.width = 70
        this.height = 70
        // this.image = ".assets/-food-image goes here.img"


        this.element.style.position = "absolute"
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.top = `${this.y}px`
        this.element.style.left = `${this.x}px`
        this.element.style.backgroundImage = `url("this.image)`
        this.element.style.backgroundPosition = `center`
        this.element.style.backgroundSize = `cover`

        this.gameScreen.appendChild(this.element)

    }
    move() {
        this.x -= 5
        this.element.style.left = `${this.x}px`
    }
}