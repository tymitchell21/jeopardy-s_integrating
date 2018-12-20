class QuestionBox {
    constructor(categoryObjects, destination, questionDisplay, rowIndex, cellIndex, grid) {
        this.categoryObjects = categoryObjects
        this.rowIndex = rowIndex
        this.cellIndex = cellIndex
        this.grid = grid
        this.timeLeft = 15
        this.createQuestionBoxElements(destination, questionDisplay)
    }

    createQuestionBoxElements (destination, questionDisplay) {
        this.answerBoxElement = document.getElementById(destination)
        this.answerBoxElement.style.display = 'flex'
        this.answerInputElement = document.querySelector('#answer-input')
        this.answerInputElement.focus()

        timerVar = setInterval(questionTimer.bind(this), 1000)

        this.questionDisplayElement = document.getElementById(questionDisplay)
        this.questionDisplayElement.innerHTML = this.categoryObjects[this.rowIndex].clues[this.cellIndex].question

        this.submitButtonElement = document.getElementById('submit-form')
        this.boundCallCheckAnswerFunction = this.unboundCallCheckAnswerFunction.bind(this, timerVar)
        this.submitButtonElement.addEventListener('submit', this.boundCallCheckAnswerFunction)
    }

    unboundCallCheckAnswerFunction(timerVar) {
        event.preventDefault()
        clearInterval(timerVar)
        this.grid.gameManager.checkAnswer(this.rowIndex, this.cellIndex)
        this.submitButtonElement.removeEventListener('submit', this.boundCallCheckAnswerFunction)
    }
}

let timerVar

function questionTimer () {
    let timer = document.querySelector('#timer')
    timer.innerHTML = this.timeLeft
    if (this.timeLeft <= 0) {
        this.grid.gameManager.checkAnswer(this.rowIndex, this.cellIndex)
        this.submitButtonElement.removeEventListener('submit', this.boundCallCheckAnswerFunction)
        clearInterval(timerVar)
    }
    this.timeLeft--
}

