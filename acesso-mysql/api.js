const db = require('./db')
const categories = require('./categories')(db)
const products = require('./products')(db)

const run = async() => {

    //await categories.create(['Super categoria'])
    //await categories.update (4, ['Categoria update'])
    //await categories.remove(4)
    //const list = await categories.findAll()
    //console.log(list)

    //await products.create(['Ibanez Universe', 123])
    //await products.update(3, ['Ibanez Universe updt', 1234])
    //await products.addImage(3, ['texto img', 'about:blank'])
    //await products.remove(3)

    //const list = await products.findAll()
    const list = await products.findAllByCategory(1)
    console.log(list)

}

run()
