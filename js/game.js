
class Game {
  constructor() {
    this.gameScreen = document.querySelector(".game-screen")
    this.startScreen = document.querySelector(".start-screen")
    this.endScreen = document.querySelector(".end-screen")
    this.lifeContainer = document.querySelector(".life")
    this.scoreContainer = document.querySelector(".score")

    this.player = null
    this.ground = null

    this.foods = []
    this.obstacles = []

    this.foodInterval = null
    this.obstaclesInterval = null
    this.animationInterval = null

    this.lives = 10
    this.score = 0
    this.isGameOver = false
    this.isInvincible = false
    this.lastHitTime = 0
  }

  startGame() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "flex"
    this.endScreen.style.display = "none"

    this.lifeContainer.textContent = this.lives

    if (this.scoreContainer) {
      this.scoreContainer.textContent = this.score
    }

    this.ground = new Ground()
    this.player = new Player(this.ground)

    // Spawn food every 3 seconds
    this.foodInterval = setInterval(() => {
      this.spawnFood()
    }, 3000)

    // Spawn obstacle every 4 seconds
    this.obstaclesInterval = setInterval(() => {
      this.spawnObstacle()
    }, 4000)

    // Game animation
    this.animationInterval = setInterval(() => {
      this.animate()
    }, 15)
  }

  animate() {
    if (this.isGameOver) return

    this.player.update()

    // FOOD
    for (let i = this.foods.length - 1; i >= 0; i--) {
      const food = this.foods[i]

      food.move()

      // Remove food outside screen
      if (food.x + food.width < 0) {
        food.element.remove()
        this.foods.splice(i, 1)
        continue
      }

      // Player collects food
      if (this.checkCollision(this.player, food)) {
        this.score += 1

        if (this.scoreContainer) {
          this.scoreContainer.textContent = this.score
        }

        food.element.remove()
        this.foods.splice(i, 1)
      }
    }

    // OBSTACLES
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i]

      obstacle.move()

      // Remove obstacle outside screen
      if (obstacle.x + obstacle.width < 0) {
        obstacle.element.remove()
        this.obstacles.splice(i, 1)
        continue
      }

      // Player hits obstacle
      if (this.checkCollision(this.player, obstacle)) {
        const now = Date.now()

        // Prevent losing multiple lives from one collision
        if (now - this.lastHitTime >= 1000) {
          this.lives -= 1
          this.lastHitTime = now

          this.lifeContainer.textContent = this.lives

          obstacle.element.remove()
          this.obstacles.splice(i, 1)

          if (this.lives <= 0) {
            this.gameOver()
            return
          }
        }
      }
    }
  }

  spawnFood() {
    const foodTypes = [
      "food-berries.png",
      "food-fish.png",
      "food-honey.png",
      "food-nuts.png",
      "food-tubers.png",
      "food-roots.png"
    ]

    const randomIndex = Math.floor(
      Math.random() * foodTypes.length
    )

    const randomFood = foodTypes[randomIndex]

    const newFood = new Food(randomFood)

    this.foods.push(newFood)
  }

  spawnObstacle() {
    const newObstacle = new Obstacle()
    this.obstacles.push(newObstacle)
  }

  checkCollision(player, object) {
    return (
      player.x < object.x + object.width &&
      player.x + player.width > object.x &&
      player.y < object.y + object.height &&
      player.y + player.height > object.y
    )
  }

  gameOver() {
    this.isGameOver = true

    clearInterval(this.foodInterval)
    clearInterval(this.obstaclesInterval)
    clearInterval(this.animationInterval)

    this.gameScreen.style.display = "none"
    this.endScreen.style.display = "flex"
  }
}
