const dbName = './banco.sqlite3'
const categories = require('./categories')(dbName)
const products = require('./products')(dbName)

const daoCategories = async() => {

    //await categories.create([6, 'Super Teste Go rá!'])
    //await categories.create([8, 'Super Teste Go again!'])
   

    //await categories.update(6, ['Super Teste Update returns!'])
    //await categories.remove(6)

    const lista = await categories.findAll()
    console.log(lista)

    const listaPg = await categories.findAllPaginated({pageSize: 3, currentPage: 2})
    console.log(listaPg)

}

const daoProducts = async() => {


    await products.create([5, 'Ibanez JEM DNA', 123])
    //await products.update(4, ['Ibanez JEM DNA - update!', 555])
    //await products.addImage(4, [2, 'Imagem 2', 'about:chrome'])
    //await products.addImage(3, [3, 'Imagem 1', '777 1'])
    //await products.addImage(3, [4, 'Imagem 2', '777 2'])
    //await products.remove(4)

    //await products.updateCategories(4, [8])

    //const lista = await products.findAll()
    const lista = await products.findAllByCategory(8)
    //const lista = await products.findAllPaginated({pageSize: 2, currentPage: 0})
    console.log(lista)

    //const listaPg = await products.findAllPaginated({pageSize: 3, currentPage: 2})
    //console.log(listaPg)

}

//daoCategories()
daoProducts()