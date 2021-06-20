const mysql = require('mysql2/promise')

const run = async() => {

    try {
    
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })

        try {

            const [res] = await conn.query(`
                select * from products p 
                where 
                    exists (select * from categories_products c 
                            where c.product_id = p.id and c.category_id = ?)`, 
                [1])
            console.log(res)
            
        } catch (error) {
            console.log(error)
        }

    } catch (err) {
        console.log('connection error:', err)
    }

}

run()