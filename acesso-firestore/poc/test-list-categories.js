const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const catRef = db.collection('categories').get()

catRef.then(ss => {
    //console.log(ss)
    console.log('Vazio?', ss.empty)
    ss.forEach(doc => {
        console.log('id: ', doc.id, '=>', doc.data())
    })
})

