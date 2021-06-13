const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise((res, rej) =>{
    db = new sqlite.Database('banco.sqlite3', (err) => {
        if (err) {
            rej(err)
        } else {
            res(db)
        }
    })
})

const run = (db, query, values) => new Promise((res, rej) => {
    db.run(query, values, err => {
        if (err) {
            rej(err)
        } else {
            res()
        }
    })
})

const createProduct = async() => {
    const db = await initDB('banco.sqlite3')
    await run(db, `INSERT INTO products (id, description, price) VALUES (?,?, ?)`, [3, 'Ibanez Jem 77UW', 7777])
    await run(db, `INSERT INTO categories_products (category_id, product_id) VALUES (?,?)`, [2, 3])
}

createProduct()