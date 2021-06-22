const db = require('./db')
const fs = require('fs')

const migrate = async() => {

    const conn = await db
    const migrateFiles = fs.readdirSync('./migrations')

    for await (file of migrateFiles) {
        const m = require('./migrations/' + file)
        await m.up(conn)
        //await m.down(conn)
    }

}

migrate()


