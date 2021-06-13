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

const removeProduct = async() => {
    const db = await initDB('banco.sqlite3')
    await run(db, `DELETE FROM categories_products WHERE product_id = ?`, [3])
    await run(db, `DELETE FROM products WHERE id = ?`, [3])
}

removeProduct()
