const db = require('./firestore')

const findAll = async() => {

    const catsRef = await db.collection('categories').orderBy('category').get()
    const cats = []
    
    if (catsRef.empty) {
        return cats
    }

    catsRef.forEach(doc=> {
        cats.push({
            id: doc.id,
            ...doc.data()
        })
    })

    return cats

}

const findAllPaginated = async({pageSize = 10, startAfter = ''}) => {

    const catDB = await db
                        .collection('categories')
                        .orderBy('category')
                        .limit(pageSize+1)
                        .startAfter(startAfter)
                        .get()

    const cats = []
    let total = 0

    catDB.forEach(doc => {
        if (total < pageSize) {
            cats.push({
                id: doc.id,
                ...doc.data()
            })
        }
        total++
        
    })

    const hasNext = total > pageSize

    const res =  {
        data: cats,
        total: cats.length,
        hasNext,
        startAfter: hasNext? cats[cats.length-1].category: ''
    }

    return res

}

const create = async(data) => {
    const doc = db.collection('categories').doc()
    await doc.set(data)
}

const remove = async(id) => {
    const doc = db.collection('categories').doc(id)
    await doc.delete()
}

const update = async(id, data) => {
    const doc = db.collection('categories').doc(id)
    await doc.set(data)
}

module.exports = {
    findAll,
    findAllPaginated,
    create,
    remove,
    update
}