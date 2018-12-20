class GameManager {
    constructor(categoryObjects, grid) {
        this.categoryObjects = categoryObjects
        this.grid = grid
        this.player1 = new Player('Player1', 0, 'player1-score')
        this.player2 = new Player('Player2', 0, 'player2-score')
        this.turnElement = document.querySelector('#who-turn')
        this.answerValueElement = document.querySelector('#answer-input')
        this.questionBoxElement = document.querySelector('#answer-box')
        this.whoseTurn = Math.floor(Math.random() * 2)
        this.showWhoTurnItIs()
    }
    showWhoTurnItIs() {
        if (this.whoseTurn == 0) {
            this.turnElement.innerHTML = `It is Player One's turn`
            this.playerTurn = this.player1
        }
        else {
            this.turnElement.innerHTML = `It is Player Two's turn`
            this.playerTurn = this.player2
        }
    }
    checkAnswer(rowIndex, cellIndex) {
        let answer = this.answerValueElement.value
        let category = this.categoryObjects[rowIndex]
        let question = category.clues[cellIndex]
        if (answer.toLowerCase() == question.answer.toLowerCase()) {
            this.playerTurn.score += question.value
        }
        else {
            this.playerTurn.score -= question.value
        }
        this.answerValueElement.value = ''
        this.questionBoxElement.style.display = 'none'
        this.playerTurn.updateScore()
        this.whoseTurn = !this.whoseTurn
        this.showWhoTurnItIs()
        this.checkEndGame()
    }
    checkEndGame() {
        let endGame = true
        this.grid.cells.map(row => {
            row.map(cell => {
                if (cell.element.innerHTML != '') {
                    endGame = false
                }
            })
        })
        if (endGame) {
            this.showWinner()
        }
    }
    showWinner() {
        this.questionBoxElement.style.display = 'flex'
        this.questionBoxElement.style.fontSize = '3em'
        if (this.player1.score == this.player2.score) {
            this.questionBoxElement.innerHTML = `It is a tie!`
        } else if (this.player1.score > this.player2.score) {
            this.questionBoxElement.innerHTML = `${this.player1.name} won!`
        } else {
            this.questionBoxElement.innerHTML = `${this.player2.name} won!`
        }
    }
}


