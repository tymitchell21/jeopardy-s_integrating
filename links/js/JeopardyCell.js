class JeopardyCell extends Cell {
    constructor(rowIndex, cellIndex, className, grid, categoryTitle = null) {
        super(rowIndex, cellIndex, className, grid)
        this.categoryTitle = categoryTitle
        this.createCell()
    }
    
    createCell() {
        Cell.prototype.createCell.call(this)
    
        if (this.categoryTitle) {
            this.element.dataset.category = this.categoryTitle
        }
        return this.element
    }

    populateValue () {
        const value = document.createElement('a')
        const category = this.grid.categoryObjects[this.rowIndex]
        value.innerHTML = category.clues[this.cellIndex].value
        this.element.appendChild(value)

        this.onClickBound = this.onClickUnbound.bind(this)
        this.element.addEventListener('click', this.onClickBound)
    }

    onClickUnbound() {
        this.grid.addNewQuestionBox(this.rowIndex, this.cellIndex)
        this.element.removeEventListener('click', this.onClickBound)
        this.element.innerHTML = ''
    }
}