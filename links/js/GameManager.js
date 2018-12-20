class GameManager {
    constructor(categoryObjects, grid) {
        this.categoryObjects = categoryObjects
        this.grid = grid

        this.player1 = new Player('Player1', 0, 'player1-score')
        this.player2 = new Player('Player2', 0, 'player2-score')

        this.turnElement = document.querySelector('#who-turn')
        this.answerValueElement = document.querySelector('#answer-input')
        this.questionBoxElement = document.querySelector('#answer-box')
        this.questionElement = document.querySelector('#question-display')

        this.showWhoTurnItIs()
    }
    showWhoTurnItIs() {
        this.whoseTurn = Math.floor(Math.random() * 2)

        if (this.whoseTurn == 0) {
            this.turnElement.innerHTML = `It is Player One's turn`
            this.playerTurn = this.player1
        }
        else {
            this.turnElement.innerHTML = `It is Player Two's turn`
            this.playerTurn = this.player2
        }
    }
    checkAnswer(questionAnswer, value) {
        let userAnswer = this.answerValueElement.value
        console.log(questionAnswer, userAnswer)
        if (userAnswer.toLowerCase() == questionAnswer.toLowerCase()) {
            this.playerTurn.score += Number(value)
        }
        else {
            this.playerTurn.score -= Number(value)
        }

        this.questionElement.innerHTML = questionAnswer
        setTimeout(() => {
            this.answerValueElement.value = ''
            this.questionBoxElement.style.display = 'none'
        }, 2000)

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


