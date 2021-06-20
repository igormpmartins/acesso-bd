const db = require('./db')

const init = database => {

    const create = async(data) => {
        const dbConn = await db.init(database)
        await db.queryRun(dbConn, `INSERT INTO products (id, description, price) VALUES (?,?,?)`, data)
    }
    
    const addImage = async(product_id, data) => {
        const dbConn = await db.init(database)
        await db.queryRun(dbConn, `INSERT INTO images (id, description, url, product_id) VALUES (?,?,?,?)`,[...data, product_id])
    }

    const remove = async(id) => {
        const dbConn = await db.init(database)
        await db.queryRun(dbConn, `DELETE FROM images WHERE product_id = ?`, [id])
        await db.queryRun(dbConn, `DELETE FROM categories_products WHERE product_id = ?`, [id])
        await db.queryRun(dbConn, `DELETE FROM products WHERE id = ?`, [id])
    }

    const update = async(id, data) => {
        const dbConn = await db.init(database)
        await db.queryRun(dbConn, `UPDATE products SET description = ?, price = ? WHERE id = ?`, [...data, id])
    }
    
    const updateCategories = async(id, categories) => {
        const dbConn = await db.init(database)
        await db.queryRun(dbConn, `DELETE FROM categories_products WHERE product_id = ?`, [id])

        for await(cat of categories) {
            await db.queryRun(dbConn, `INSERT INTO categories_products (product_id, category_id) VALUES (?,?)`,[id, cat])
        }
    }

    const findAll = async() => {
        const prods = await findAllPaginated({pageSize: 0, currentPage: 0})
        return prods.data
    }

    const findAllByCategory = async(category) => {
        const prods = await findAllPaginated({pageSize: 0, currentPage: 0, category})
        return prods.data
    }

    const findAllPaginated = async({pageSize, currentPage, category}) => {
        const dbConn = await db.init(database)
        let sqlProducts = `SELECT * FROM products p` 

        if (category) {
            sqlProducts +=` WHERE 
                                EXISTS (SELECT * FROM categories_products c 
                                        WHERE c.product_id = p.id AND c.category_id=${category})`
        }
        
        if (pageSize > 0) {
            sqlProducts +=` limit ${currentPage*pageSize}, ${pageSize+1}`
        }

        const productDB = await db.queryOpen(dbConn, sqlProducts)
        const hasNext = productDB.length > pageSize

        if (pageSize > 0 && hasNext) {
            productDB.pop()
        }

        //montar essa lista, depois do pop!
        const listIds = productDB.map(prod => prod.id)
        const imgDB = await db.queryOpenWithoutParams(dbConn, `select * from images where product_id in (${listIds.join(',')}) group by product_id`)        

        const mapImgs = imgDB.reduce( (prev, curr) => {
            return {
                ...prev,
                [curr.product_id]: curr
            }
        }, {})

        const prods = productDB.map(prod => {
            return {
                ...prod,
                images: mapImgs[prod.id]
            }
        })

        return {
            data: prods,
            hasNext: hasNext
        }
    }

    return {
        create, addImage, update, updateCategories, remove, 
        findAll, findAllPaginated, findAllByCategory
    }

}

module.exports = init
