const up = async(conn) => {
    console.log('version 2 - up')
}

const down = async(conn) => {
    console.log('version 2 - down')
}

module.exports = {
    up,
    down
}