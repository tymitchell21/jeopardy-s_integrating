class QuestionBox {
    constructor(categoryObjects, destination, questionDisplay, value, categoryIndex, grid) {
        this.categoryObjects = categoryObjects
        this.value = value
        this.categoryIndex = categoryIndex
        this.grid = grid
        this.timeLeft = 15
        this.createQuestionBoxElements(destination, questionDisplay)
    }

    createQuestionBoxElements (destination, questionDisplay) {
        this.findValidQuestionAndAnswer()
        this.answerBoxElement = document.getElementById(destination)
        this.answerBoxElement.style.display = 'flex'
        this.answerInputElement = document.querySelector('#answer-input')
        this.answerInputElement.focus()

        timerVar = setInterval(questionTimer.bind(this), 1000)

        this.questionDisplayElement = document.getElementById(questionDisplay)
        this.questionDisplayElement.innerHTML = this.question

        this.submitButtonElement = document.getElementById('submit-form')
        this.boundCallCheckAnswerFunction = this.unboundCallCheckAnswerFunction.bind(this, timerVar)
        this.submitButtonElement.addEventListener('submit', this.boundCallCheckAnswerFunction)
    }

    unboundCallCheckAnswerFunction(timerVar) {
        event.preventDefault()
        clearInterval(timerVar)
        this.grid.gameManager.checkAnswer(this.answer, this.value)
        this.submitButtonElement.removeEventListener('submit', this.boundCallCheckAnswerFunction)
    }

    findValidQuestionAndAnswer() {
        let questionObject = this.categoryObjects[this.categoryIndex].clues
        for (let index=0; index<questionObject.length; index++) {
            if (questionObject[index].invalid_count) {
                questionObject.splice(index, 1)
            } else if (questionObject[index].question.length < 3 || containsHTML(questionObject[index].question)) {
                questionObject.splice(index, 1)
            } else if (questionObject[index].answer.length < 2 || containsHTML(questionObject[index].answer)) {
                questionObject.splice(index, 1)
            } else if (questionObject[index].value == this.value) {
                this.question = questionObject[index].question
                this.answer = questionObject[index].answer
                questionObject.splice(index, 1)
                return
            }
        }
    }
}

const containsHTML = text => /(<.+?>)|(&.{1,6}?;)/.test(text)

let timerVar
function questionTimer () {
    let timer = document.querySelector('#timer')
    timer.innerHTML = this.timeLeft
    if (this.timeLeft <= 0) {
        this.grid.gameManager.checkAnswer(this.answer, this.value)
        this.submitButtonElement.removeEventListener('submit', this.boundCallCheckAnswerFunction)
        clearInterval(timerVar)
    }
    this.timeLeft--
}

