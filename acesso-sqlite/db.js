const sqlite = require('sqlite3').verbose()

const init = databaseFile => new Promise((res, rej) =>{
    const db = new sqlite.Database(databaseFile, (err) => {
        if (err) {
            rej(err)
        } else {
            res(db)
        }
    })
    return db
})

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