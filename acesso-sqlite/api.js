const categories = require('./categories')('./banco.sqlite3')

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

daoCategories()
