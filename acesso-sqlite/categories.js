const db = require('./db')

const init = database => {

    const create = async(data) => {
        const dbConn = await db.init(database)
        await db.queryRun(dbConn, `INSERT INTO categories (id, category) VALUES (?,?)`, data)
    }

    const remove = async(id) => {
        const dbConn = await db.init(database)
        await db.queryRun(dbConn, `DELETE FROM categories WHERE id = ?`, [id])
    }

    const update = async(id, data) => {
        const dbConn = await db.init(database)
        await db.queryRun(dbConn, `UPDATE categories SET category = ? WHERE id = ?`, [...data, id])
    }

    const findAll = async() => {
        const dbConn = await db.init(database)
        const res = await db.queryOpenWithoutParams(dbConn, `SELECT * FROM categories`)
        return res
    }

    const findAllPaginated = async({pageSize, currentPage}) => {
        const dbConn = await db.init(database)
        const res = await db.queryOpen(dbConn, `SELECT * FROM categories limit ${currentPage*pageSize}, ${pageSize+1}`)
        const hasNext = res.length > pageSize

        if (hasNext) {
            res.pop()
        }

        return {
            data: res,
            hasNext: hasNext
        }
    }

    return {
        create, update, remove, findAll, findAllPaginated
    }

}

module.exports = init
