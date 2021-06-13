const categories = require('./categories')
const products  = require('./products')

const sequencia = async() => {

    //await categories.remove('d7snPeiOpyvZSGNunAem')
    /*await categories.update('26KZt6q9QtUYlA35u9R4', {
        category: 'trekao agora'
    })

    await categories.create({
        category: 'Testao'
    })*/

    /*
    await categories.findAll().then(lista => {
        console.log(lista)
    })
    */

    const allCats = await categories.findAll()
    console.log(allCats)

    const cats = await categories.findAllPaginated({pageSize: 1, startAfter: 'Testao'})
    console.log(cats)

}

const outraSequencia = async() => {

    /*
    const prod = await products.update(
        'ZJSRc4bAQNPjqGG7Z46O',
        {
            description: 'Ibanez DNA - update 2!',
            price: 5555,
            categories: ['DmDkwmTJPmSqsvUGMUZK']
        })

    console.log('foi!')
    */

    //await products.remove('Gn7iGGmgcYKvPmfJoA4m')
    
    /*await products.addImage('bTADDpAsVZtdKWV6crTh', 
         {description: 'image 1', url: 'about:blank'}
    )*/

    //const prods = await products.findAll()
    const prods = await products.findAllPaginated({pageSize: 2, startAfter: ''})
    console.log(prods)
    //console.log(prods.data[1].images)
}

//sequencia()
outraSequencia()
