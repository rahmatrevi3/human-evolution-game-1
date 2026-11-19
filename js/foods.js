class Food {
    constructor(type) {
        this.gameScreen = document.querySelector(".game-screen")
        this.element = document.createElement("div")
        this.x = this.gameScreen.clientWidth
        this.y = this.gameScreen.clientHeight - this.height
        this.width = 50
        this.height = 50
        // this.image = ".assets/-food-image goes here.img"


        this.element.style.position = "absolute"
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.top = `${this.y}px`
        this.element.style.left = `${this.x}px`
        this.element.style.backgroundImage = `url("this.image)`
        this.element.style.backgroundPosition = `center`
        this.element.style.backgroundSize = `cover`
        this.element.style.backgroundRepeat = "no-repeat"

        this.gameScreen.appendChild(this.element)

    }
    move() {
        this.x -= 5
        this.element.style.left = `${this.x}px`
    }
}