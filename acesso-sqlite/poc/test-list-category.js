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

const all = (db, query, values) => new Promise((res, rej) => {
    db.all(query, values, (err, rows) => {
        if (err) {
            rej(err)
        } else {
            res(rows)
        }
    })
})

const listCategory = async() => {
    const db = await initDB('banco.sqlite3')
    const res = await all(db, `SELECT * FROM categories`, [])
    console.log(res)
}

listCategory()