class Ground {
    constructor() {
        this.gameScreen = document.querySelector(".game-screen")

        this.height = 80

        this.element = document.createElement("div")

        this.element.style.position = "absolute"
        this.element.style.bottom = "0px"
        this.element.style.left = "0px"
        this.element.style.width = "100px"
        this.element.height = `${this.height}px`

        this.element.style.backgroundImage = `url("./assets/ground.png")`
        this.element.style.backgroundSize = "cover"

        this.gameScreen.appendChild(this.element)

    }
}