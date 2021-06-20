const mysql = require('mysql2/promise')

const run = async() => {

    try {
    
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })

        try {

            const [res] = await conn.query('INSERT INTO products (description, price) VALUES (?, ?)', ['Ibanez Jem DNA', 7777])
            await conn.query('INSERT INTO categories_products (category_id, product_id) VALUES (?, ?)', [1, res.insertId])
            console.log(res)
            
        } catch (error) {
            console.log(error)
        }

    } catch (err) {
        console.log('connection error:', err)
    }

}

run()