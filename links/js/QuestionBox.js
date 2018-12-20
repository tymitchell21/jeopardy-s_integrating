class QuestionBox {
    constructor(categoryObjects, destination, questionDisplay, rowIndex, cellIndex, grid) {
        this.categoryObjects = categoryObjects;
        this.rowIndex = rowIndex;
        this.cellIndex = cellIndex;
        this.grid = grid;
        this.createElements(destination, questionDisplay)
    }

    createElements (destination, questionDisplay) {
        this.answerBoxElement = document.getElementById(destination);
        this.answerBoxElement.style.display = 'flex';

        this.answerInputElement = document.querySelector('#answer-input')
        this.answerInputElement.focus()

        let timeLeft = 5
        let timerVar = setInterval(questionTimer.bind(this), 1000)
        
        function questionTimer () {
            let timer = document.querySelector('#timer')
            timer.innerHTML = timeLeft
            if (timeLeft <= 0) {
                this.grid.gameManager.checkAnswer(this.rowIndex, this.cellIndex)
                this.submitButtonElement.removeEventListener('submit', this.boundCallCheckAnswerFunction);
                clearInterval(timerVar)
            }
            timeLeft--
        }

        this.questionDisplayElement = document.getElementById(questionDisplay);
        this.questionDisplayElement.innerHTML = this.categoryObjects[this.rowIndex].clues[this.cellIndex].question;

        this.submitButtonElement = document.getElementById('submit-form');
        this.boundCallCheckAnswerFunction = this.unboundCallCheckAnswerFunction.bind(this, timerVar);
        this.submitButtonElement.addEventListener('submit', this.boundCallCheckAnswerFunction);
    }

    unboundCallCheckAnswerFunction(timerVar) {
        event.preventDefault()
        clearInterval(timerVar)
        this.grid.gameManager.checkAnswer(this.rowIndex, this.cellIndex);
        this.submitButtonElement.removeEventListener('submit', this.boundCallCheckAnswerFunction);
    }
}


