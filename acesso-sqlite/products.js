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

    const findAll = async() => {
        const dbConn = await db.init(database)
        const productDB = await db.queryOpenWithoutParams(dbConn, `SELECT * FROM products`)

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

        return prods

    }

    const findAllPaginated = async({pageSize, currentPage}) => {
        const dbConn = await db.init(database)
        const productDB = await db.queryOpen(dbConn, `SELECT * FROM products limit ${currentPage*pageSize}, ${pageSize+1}`)
        const hasNext = productDB.length > pageSize

        if (hasNext) {
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
        create, addImage, update, remove, 
        findAll, findAllPaginated
    }

}

module.exports = init
