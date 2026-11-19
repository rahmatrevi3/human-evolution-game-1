class Game {
    constructor() {
        this.gameScreen = document.querySelector(".game-screen")
        this.startScreen = document.querySelector(".start-screen")
        this.endScreen = document.querySelector(".end-screen")
        this.lifeContainer = document.querySelector(".life")

        this.player = null
        this.foods = []
        this.obstacle = []
        this.obstaclesInterval = null
        this.animationInterval = null
        this.foodInterval = null
        this.lives = 10
        this.score = 0

        this.isGameOver = false
    }

    startGame() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "flex"

    this.lifeContainer.textContent = this.lives

    this.ground = new Ground()
    this.player = new Player(this.ground)

    this.foodInterval = setInterval(() => {
        this.spawnFoods()
    }, 3000)

    this.animationInterval = setInterval(() => {
        this.animate()
    }, 15)
    }

    animate() {
        if(this.isGameOver) return
        
        this.player.update()

        //FOOD
        this.foods.forEach((food, i) => {

            if (food.x <= 0) {
                this.foods.splice(i, 1)
                food.element.remove()
            }

            food.move() 

            if (this.checkCollision(this.player, food)) {
                this.score += 1
                 this.foods.splice(i, 1)
                food.element.remove()
            }
        })

        //OBSTACLE

        this.obstacles.forEach((obstacle, i) => {
            obstacle.move()

            if(this.checkCollision(this.player, obstacle)) {
                this.gameOver()
                return
            }
        })
    }

    spawnFoods() {
        const randomIndex = Math.floor(Math.random() * foodTypes.length)
        const randomType = foodType[randomIndex]
        const food = new Food(randomType)

        this.foods.push(food)
    }
}