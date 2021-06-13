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

const updateProduct = async() => {
    const db = await initDB('banco.sqlite3')
    await run(db, `UPDATE products SET description = ?, price = ? WHERE id = ?`, ['Ibanez Jem 77UW - UPD', 777, 3])
    await run(db, `DELETE FROM categories_products WHERE product_id = ?`, [3])
    await run(db, `INSERT INTO categories_products (category_id, product_id) VALUES (?,?)`, [4, 3])
}

updateProduct()
