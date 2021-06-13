const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const pgSize = 1

//const catRef = db.collection('categories').limit(pgSize+1).get()
//const catRef = db.collection('categories').orderBy('category').limit(pgSize+1).startAt('Musical Instruments').get()
const catRef = db.collection('categories').orderBy('category').limit(pgSize+1).startAfter('SmartTV').get()

catRef.then(ss => {
    //console.log(ss)
    console.log('Vazio?', ss.empty)
    let total = 0

    ss.forEach(doc => {
        total++
        if (total <= pgSize) {
            console.log('id: ', doc.id, '=>', doc.data())
        }
    })

    if (total > pgSize) {
        console.log('More? Yes')
    } else {
        console.log('More? No')
    }



})

