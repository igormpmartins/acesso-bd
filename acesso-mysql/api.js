const db = require('./db')
const categories = require('./categories')(db)
const products = require('./products')(db)

const run = async() => {

    //await categories.create(['Super categoria'])
    //await categories.update (4, ['Categoria update'])
    //await categories.remove(4)
    //const list = await categories.findAll()
    //console.log(list)

    //await products.create(['Ibanez RG550', 123])
    await products.updateCategories(5, [1, 3, 5])

    //await products.addImage(5, ['texto img RG550', 'about:blank'])
    //await products.remove(3)

    //const list = await products.findAll()
    //const list = await products.findAllByCategory(1)
    const list = await products.findAllPaginated({pageSize: 2, currentPage: 1})
    console.log(list)

}

run()
