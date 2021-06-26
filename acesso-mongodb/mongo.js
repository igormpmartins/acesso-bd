const mongodb = require('mongodb')
const uri = 'mongodb://localhost:27017/teste-mongo'

const cli = new mongodb.MongoClient(uri, { useUnifiedTopology: true })

const run = async() => {

    conn = await cli.connect()
    const pessoa = conn.db().collection('pessoa')

    const ret = await pessoa.insertOne({
            Nome: 'Igor Martins (clone 3)',
            Date: '26/12/1984'
    })

    const idPes = ret.insertedId

    await pessoa.updateOne(
    {
        _id: mongodb.ObjectID(idPes)
        //_id: idPes
    },
    {
        $set:{
            Nome: 'Igor updated aká'
        }
    }, (err, res) => console.log(err))


    /*
    pessoa.removeOne(
    {
        _id: mongodb.ObjectID('60d650a4a66a08496800c597')
    },(err, res) => console.log(err))
    */

    const lista = await pessoa.find({})

    await lista.forEach(doc => {
        console.log(doc)
    })

    console.log('foi')
    conn.close()

}

run()