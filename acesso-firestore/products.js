const db = require('./firestore')
const admin = require('firebase-admin')

const findAll = async() => {

    const prodsRef = await db.collection('products').orderBy('description').get()
    const prods = []
    
    if (prodsRef.empty) {
        return prods
    }

    prodsRef.forEach(doc=> {
        prods.push({
            id: doc.id,
            ...doc.data()
        })
    })

    prodsList = []

    for await (product of prods) {

        const imgs = []

        const imagesRef = await db
            .collection('products')
            .doc(product.id)
            .collection('images')
            .get()

        imagesRef.forEach(img => {
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })
        
        prodsList.push({
            ...product,
            images: imgs
        })
    
    }

    return prodsList
}

const findAllPaginated = async({pageSize = 10, startAfter = ''}) => {

    const productsDB = await db
                        .collection('products')
                        .orderBy('description')
                        .limit(pageSize+1)
                        .startAfter(startAfter)
                        .get()

    const products = []
    let total = 0

    productsDB.forEach(doc => {
        if (total < pageSize) {
            products.push({
                id: doc.id,
                ...doc.data()
            })
        }
        total++
    })

    prodsList = []

    for await (product of products) {

        const imgs = []

        const imagesRef = await db
            .collection('products')
            .doc(product.id)
            .collection('images')
            .get()

        imagesRef.forEach(img => {
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })
        
        prodsList.push({
            ...product,
            images: imgs
        })
    
    }

    const hasNext = total > pageSize

    const res =  {
        data: prodsList,
        total: prodsList.length,
        hasNext,
        startAfter: hasNext? prodsList[prodsList.length-1].description: ''
    }

    return res

}

const create = async({categories, ...data}) => {
    const doc = db.collection('products').doc()
    const categoriesRef = categories.map(item => db.collection('categories').doc(item))

    await doc.set({
        ...data,
        categories: categoriesRef,
        categories2: categories
    })
}

const remove = async(id) => {

    const imageRef = await db
                            .collection('products').doc(id)
                            .collection('images')
                            .get()
    const exc = []

    imageRef.forEach(item=> {
        exc.push(
            db
            .collection('products').doc(id)
            .collection('images').doc(item.id)
            .delete())
    })

    Promise.all(exc)
    const doc = db.collection('products').doc(id)
    await doc.delete()
}

const update = async(id, {categories, ...data}) => {
    const categoriesRef = categories.map(item => db.collection('categories').doc(item))
    const doc = db.collection('products').doc(id)

    await doc.update({
        ...data,
        categories: admin.firestore.FieldValue.arrayUnion(...categoriesRef),
        categories2: admin.firestore.FieldValue.arrayUnion(...categories)
    })
}

const addImage = async(id, data) => {
    const imgRef = db
        .collection('products').doc(id)
        .collection('images').doc()
    
    await imgRef.set(data)
}

module.exports = {
    findAll,
    findAllPaginated,
    create,
    remove,
    update,
    addImage


}