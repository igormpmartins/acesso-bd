const init = db => {

    const create = async(data) => {
        const conn = await db
        await conn.query('INSERT INTO products (description, price) VALUES (?, ?)', data)
    }

    const addImage = async(productId, data) => {
        const conn = await db
        await conn.query('INSERT INTO images (product_id, description, url) VALUES (?, ?, ?)', [productId, ...data])
    }

    const update = async(id, data) => {
        const conn = await db
        await conn.query('UPDATE products SET description = ?, price = ? WHERE id = ?', [...data, id])
    }

    const remove = async(id) => {
        const conn = await db
        await conn.query('DELETE FROM products WHERE id =? LIMIT 1', id)
    }

    const findImages = async(products) => {
        const conn = await db

        const listIds = products.map(item=>item.id).join(',')
        const [imagesDB] = await conn.query(`select * from images where product_id in (${listIds})`)

        const mapImages = imagesDB.reduce((prev, curr)=> {
            return {
                ...prev,
                [curr.product_id]:curr
            }
        }, {})

        const productsImg = products.map(prod=> {
            return {
                ...prod,
                images: mapImages[prod.id]
            }
        })

        return productsImg

    }

    const findAll = async() => {
        const conn = await db
        const [res] = await conn.query('select * from products')

        const prodImgs = findImages(res)
        return prodImgs
    }

    const findAllByCategory = async(categoryId) => {
        const conn = await db
        const [res] = await conn.query(`select * from products 
                                        where id in (select product_id from categories_products where category_id = ${categoryId})`)
        const prodImgs = findImages(res)
        return prodImgs
    }

    return {

        create,
        update,
        remove,
        addImage,
        findAll,
        findAllByCategory

    }

}

module.exports = init