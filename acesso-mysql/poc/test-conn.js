const mysql = require('mysql2/promise')

const run = async() => {

    try {
    
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })

        try {

            const [res, fields] = await conn.query('select * from categories')
            console.log(res, fields)
            
        } catch (error) {
            console.log(error)
        }

    } catch (err) {
        console.log('connection error:', err)
    }

}

run()