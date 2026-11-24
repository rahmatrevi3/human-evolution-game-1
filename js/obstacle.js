class Obstacle {
    constructor(type) {
        this.gameScreen = document.querySelector(".game-screen")
        this.element = document.createElement("div")

        this.width = 70
        this.height = 70

        this.x = this.gameScreen.clientWidth
        this.y = this.gameScreen.clientHeight - 80 - this.height
        
        this.type = type
        this.image = `./assets/${this.type}`


        this.element.style.position = "absolute"
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
        this.element.style.backgroundImage = `url("${this.image}")`
        this.element.style.backgroundSize = "contain"
        this.element.style.backgroundPosition = "center"
        this.element.style.backgroundRepeat = "no-repeat"

        this.gameScreen.appendChild(this.element)

    }
    move() {
        this.x -= 5
        this.element.style.left = `${this.x}px`
    }
}