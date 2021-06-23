const up = async(conn) => {
    console.log('version 11 - up')
}

const down = async(conn) => {
    console.log('version 11 - down')
}

module.exports = {
    up,
    down
}