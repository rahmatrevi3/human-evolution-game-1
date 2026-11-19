
class Player {
    constructor(ground) {
        this.gameScreen = document.querySelector(".game-screen")
        this.element = document.createElement("div")

        this.x = 0
        this.width = 70
        this.height = 70

        this.gravity = 0.5
        this.velocityY = 0
        this.isJumping = false

        this.groundHeight = ground.height

        this.y = this.gameScreen.clientHeight - this.height - ground.height

        this.image = "./assets/australopithecus.png"

        this.element.style.position = "absolute"
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`

        this.element.style.backgroundImage = `url("${this.image}")`
        this.element.style.backgroundPosition = "center"
        this.element.style.backgroundSize = "cover"
        this.element.style.backgroundRepeat = "no-repeat"

        this.gameScreen.appendChild(this.element)

        console.log("PLAYER CREATED")
        console.log("Ground height:", ground.height)
        console.log("Player element:", this.element)
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = -12
            this.isJumping = true
        }
    }

    update() {
        if (this.isJumping) {
            this.velocityY += this.gravity
            this.y += this.velocityY

            const groundY = this.gameScreen.clientHeight - this.height - this.groundHeight

            if (this.y >= groundY) {
                this.y = groundY
                this.velocityY = 0
                this.isJumping = false
            }

            this.element.style.top = `${this.y}px`
        }
    }
}

