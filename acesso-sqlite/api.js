const categories = require('./categories')

const daoCategories = async() => {

    //await categories.create([9, 'Super Teste Go rá!'])
    //await categories.create([8, 'Super Teste Go again!'])
    

    //await categories.remove(7)
    //await categories.update(6, ['Super Teste Update!'])

    const lista = await categories.findAll()
    console.log(lista)

    const listaPg = await categories.findAllPaginated({pageSize: 3, currentPage: 2})
    console.log(listaPg)

}

daoCategories()
