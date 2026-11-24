
class Ground {
  constructor() {
    this.gameScreen = document.querySelector(".game-screen")

    this.height = 140
    this.speed = 5
    this.position = 0

    this.element = document.createElement("div")

    this.element.style.position = "absolute"
    this.element.style.bottom = "0px"
    this.element.style.left = "0px"
    this.element.style.width = "100%"
    this.element.style.height = `${this.height}px`

    this.element.style.backgroundImage = `url("./assets/ground.png")`
    this.element.style.backgroundSize = "auto 100%"
    this.element.style.backgroundRepeat = "repeat-x"
    this.element.style.backgroundPosition = "0px bottom"

    this.gameScreen.appendChild(this.element)
  }

  move() {
    this.position -= this.speed

    this.element.style.backgroundPosition =
      `${this.position}px bottom`
  }
}
