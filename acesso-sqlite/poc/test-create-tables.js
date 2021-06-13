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

const run = (db, query) => new Promise((res, rej) => {
    db.run(query, (err) => {

        if (err) {
            rej(err)
        } else {
            res()
        }
    })
})

const createTables = async() => {

    const db = await initDB('banco.sqlite3')
    
    //categories
    run(db, `
    CREATE TABLE categories (
        id INTEGER NOT NULL PRIMARY KEY,
        category TEXT
    );
    `)

    //products
    run(db, `
    CREATE TABLE products (
        id INTEGER NOT NULL PRIMARY KEY,
        description TEXT,
        price REAL
    );
    `)
    //images
    run(db, `
    CREATE TABLE images (
        id INTEGER NOT NULL PRIMARY KEY,
        description TEXT,
        url TEXT,
        product_id INTEGER REFERENCES products(id)
    );
    `)

    //categories_products
    run(db, `
    CREATE TABLE categories_products (
        category_id INTEGER REFERENCES categories(id),
        product_id INTEGER REFERENCES products(id),
        PRIMARY KEY (category_id, product_id)
    );
    `)

}

createTables()