const sqlite = require('sqlite3').verbose()

const openDataBase = dbFile => new Promise((res, rej) =>{
    const db = new sqlite.Database(dbFile, (err) => {
        if (err) {
            rej(err)
        } else {
            res(db)
        }
    })
    return db
})

const init = async(dbFile) => {
    const db = await openDataBase(dbFile)
    const exists = await queryOpen(db, `select name from sqlite_master where type = 'table' and name = 'categories'`)

    if (exists.length === 0) {
        //categories
        await queryRunWithoutParams(db, `
        CREATE TABLE categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT
        );
        `)

        //products
        await queryRunWithoutParams(db, `
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            price REAL
        );
        `)
        //images
        await queryRunWithoutParams(db, `
        CREATE TABLE images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            url TEXT,
            product_id INTEGER REFERENCES products(id)
        );
        `)

        //categories_products
        await queryRunWithoutParams(db, `
        CREATE TABLE categories_products (
            category_id INTEGER REFERENCES categories(id),
            product_id INTEGER REFERENCES products(id),
            PRIMARY KEY (category_id, product_id)
        );
        `)


    }

    return db
}

const queryRunWithoutParams = (db, query) => new Promise((res, rej) => {
    db.run(query, err => {
        if (err) {
            rej(err)
        } else {
            res()
        }
    })
})

const queryRun = (db, query, values) => new Promise((res, rej) => {
    db.run(query, values, err => {
        if (err) {
            rej(err)
        } else {
            res()
        }
    })
})

const queryOpen = (db, query, values) => new Promise((res, rej) => {
    db.all(query, values, (err, rows) => {
        if (err) {
            rej(err)
        } else {
            res(rows)
        }
    })
})

const queryOpenWithoutParams = (db, query) => new Promise((res, rej) => {
    db.all(query, (err, rows) => {
        if (err) {
            rej(err)
        } else {
            res(rows)
        }
    })
})

module.exports = {
    init,
    queryRun,
    queryRunWithoutParams,
    queryOpen,
    queryOpenWithoutParams
}