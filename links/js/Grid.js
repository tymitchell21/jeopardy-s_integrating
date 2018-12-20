class Grid {
    constructor(rowNum, columnNum, destination, cellConstructor = Cell) {
        this.rowNum = rowNum
        this.columnNum = columnNum
        this.destination = destination
        this.cellConstructor = cellConstructor
        this.cells = []
        this.createGrid()
        this.drawGrid(destination)
    }
    createRow(row) {
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')
        return rowDiv
    }
    createGrid() {
        for (let row = 0; row < this.rowNum; row++) {
            this.cells.push([])
            for (let column = 0; column < this.columnNum; column++) {
                this.cells[row].push(new this.cellConstructor(row, column, 'cell', this))
            }
        }
    }
    findCell(row, column) {
        return this.cells[row][column]
    }
    drawGrid(destinationID) {
        const destination = document.getElementById(destinationID)
        for (let row = 0; row < this.rowNum; row++) {
            const rowDiv = this.createRow()
            for (let column = 0; column < this.columnNum; column++) {
                rowDiv.appendChild(this.findCell(row, column).element)
            }
            destination.appendChild(rowDiv)
        }
    }
    neighborCells(cell) {
        const neighborsArray = []
        const cellRow = Number(cell.element.dataset.row)
        const cellColumn = Number(cell.element.dataset.column)
        for (let neighborRow = cellRow - 1; neighborRow <= cellRow + 1; neighborRow++) {
            for (let neighborColumn = cellColumn - 1; neighborColumn <= cellColumn + 1; neighborColumn++) {
                if (neighborRow === cellRow && neighborColumn === cellColumn)
                    continue
                if (neighborRow >= this.rowNum || neighborColumn >= this.columnNum)
                    continue
                if (neighborRow < 0 || neighborColumn < 0)
                    continue
                neighborsArray.push(this.findCell(neighborRow, neighborColumn))
            }
        }
        return neighborsArray
    }
}





