class JeopardyGrid extends Grid {
    constructor(rowNum, columnNum, destination, cellConstructor, categoryObjects, categoryContainerID) {
        super(rowNum, columnNum, destination, cellConstructor)
        
        this.categoryObjects = categoryObjects
        this.categoryContainerID = categoryContainerID
        this.categoriesArray = []
        this.fillCellValues()
        
        this.gameManager = new GameManager(this.categoryObjects, this)
    }
    
    fillCellValues() {
        this.categoryObjects.map((category, categoryIndex) => {
            this.categoriesArray.push(new JeopardyCell('category', categoryIndex, 'cell', this, category.title))
            
            this.cells[categoryIndex].forEach(cell => cell.populateValue())
        })
        this.displayCategories()
    }

    displayCategories() {
        this.categoriesArray.map((categoryObject, index) => {
            const categoryTextH1 = document.createElement('h1')
            categoryTextH1.innerHTML = this.categoryObjects[index].title
    
            categoryObject.element.appendChild(categoryTextH1)
            categoryObject.element.className = 'categoryCell'
    
            const categoriesElement = document.getElementById(this.categoryContainerID)
            categoriesElement.appendChild(categoryObject.element)
        })
    }

    addNewQuestionBox(rowIndex, cellIndex) {
        let questionBox = new QuestionBox(this.categoryObjects, 'answer-box', 'question-display', rowIndex, cellIndex, this)
    }
}
