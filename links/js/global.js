const categoryIDs = [2124, 309, 554, 1371, 4616, 254]
const categoryFetchURL = 'https://cors-anywhere.herokuapp.com/http://www.jservice.io/api/category?id='

const categoryPromises = categoryIDs
    .map(id =>
        fetch(categoryFetchURL + id)
            .then(categoryObject => categoryObject.json())
    )
Promise.all(categoryPromises).then(function(categoryObjects) {
    let jeopardyGrid = new JeopardyGrid(6, 5, 'questions', JeopardyCell, categoryObjects, 'categories')
})