class Player {
    constructor(name, score, scoreID) {
        this.name = name
        this.score = score
        this.scoreElement = document.getElementById(scoreID)
    }
    updateScore() {
        this.scoreElement.innerHTML = this.score
    }
}