const mysql = require('mysql2/promise')

const run = async() => {

    try {
    
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })

        try {

            const [res] = await conn.query('UPDATE products SET description = ?, price = ? WHERE id = ?', ['Ibanez JEM Dna update', 456, 2])
            await conn.query('DELETE FROM categories_products WHERE product_id = ? LIMIT 1', 2)
            await conn.query('INSERT INTO categories_products (category_id, product_id) VALUES (?, ?)', [1, 2])

            console.log(res)
            
        } catch (error) {
            console.log(error)
        }

    } catch (err) {
        console.log('connection error:', err)
    }

}

run()