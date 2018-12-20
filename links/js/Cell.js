class Cell {
    constructor(rowIndex, cellIndex, className, grid) {
        this.rowIndex = rowIndex;
        this.cellIndex = cellIndex;
        this.className = className;
        this.grid = grid;
    }
    createCell() {
        this.element = document.createElement('div');
        this.element.dataset.rowIndex = this.rowIndex;
        this.element.dataset.cellIndex = this.cellIndex;
        this.element.classList.add(this.className);
        return this.element;
    }
    changeClass(oldClass, newClass) {
        this.className = newClass;
        this.element.classList.remove(oldClass);
        this.element.classList.add(newClass);
    }
}


