const mysql = require('mysql2/promise')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cat-products'
})

module.exports = conn