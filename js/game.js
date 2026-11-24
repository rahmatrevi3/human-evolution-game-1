
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
    this.evolutionStage = 0
    
  }

  startGame() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "flex"
    this.endScreen.style.display = "none"

    this.lifeContainer.textContent = `Life: ${this.lives}`
    this.scoreContainer.textContent = `Score: ${this.score}`
    

    this.ground = new Ground()
    this.player = new Player(this.ground)

    
    this.foodInterval = setInterval(() => {
      this.spawnFood()
    }, 3000)

    
    this.obstaclesInterval = setInterval(() => {
      this.spawnObstacle()
    }, 4000)

    
    this.animationInterval = setInterval(() => {
      this.animate()
    }, 15)
  }



restartGame() {
    console.log("Restart function called!")

    clearInterval(this.foodInterval)
    clearInterval(this.obstaclesInterval)
    clearInterval(this.animationInterval)

    this.foods.forEach(food => food.element.remove())
    this.obstacles.forEach(obstacle => obstacle.element.remove())

    
    this.player.element.remove()
    this.ground.element.remove()
    
    this.foods = []
    this.obstacles = []

    
    this.lives = 10
    this.score = 0
    this.isGameOver = false
    this.evolutionStage = 0

    
    this.startGame()
}


animate() {
  if (this.isGameOver) return

  this.player.update()

  // GROUND
  this.ground.move()

  // FOOD
  for (let i = this.foods.length - 1; i >= 0; i--) {
    const food = this.foods[i]

    food.move()

    if (food.x + food.width < 0) {
      food.element.remove()
      this.foods.splice(i, 1)
      continue
    }

    if (this.checkCollision(this.player, food)) {
      this.score += 1
      this.scoreContainer.textContent = `Score: ${this.score}`

      this.checkEvolution()

      food.element.remove()
      this.foods.splice(i, 1)
    }
  }

  // OBSTACLES
  for (let i = this.obstacles.length - 1; i >= 0; i--) {
    const obstacle = this.obstacles[i]

    obstacle.move()

    if (obstacle.x + obstacle.width < 0) {
      obstacle.element.remove()
      this.obstacles.splice(i, 1)
      continue
    }

    if (this.checkCollision(this.player, obstacle)) {
      this.lives -= 1
      this.lifeContainer.textContent = `Life: ${this.lives}`

      obstacle.element.remove()
      this.obstacles.splice(i, 1)

      if (this.lives <= 0) {
        this.gameOver()
        return
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
  const obstacleTypes = [
    "predator-1.png",
    "predator-2.png",
    "predator-3.png",
    "predator-4.png"
  ]

  const randomIndex = Math.floor(
    Math.random() * obstacleTypes.length
  )

  const randomType = obstacleTypes[randomIndex]

  const obstacle = new Obstacle(randomType)

  this.obstacles.push(obstacle)
}

  checkCollision(player, object) {
    return (
      player.x < object.x + object.width &&
      player.x + player.width > object.x &&
      player.y < object.y + object.height &&
      player.y + player.height > object.y
    )
  }

  
checkEvolution() {
  if (this.score >= 40 && this.evolutionStage < 4) {
    this.player.evolve("homo-sapiens.png")
    this.evolutionStage = 4

  } else if (this.score >= 30 && this.evolutionStage < 3) {
    this.player.evolve("neanderthalensis.png")
    this.evolutionStage = 3

  } else if (this.score >= 20 && this.evolutionStage < 2) {
    this.player.evolve("homo-erectus.png")
    this.evolutionStage = 2

  } else if (this.score >= 10 && this.evolutionStage < 1) {
    this.player.evolve("homo-habilis.png")
    this.evolutionStage = 1
  }
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
