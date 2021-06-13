const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const catRef = db.collection('products').get()

catRef.then(ss => {
    console.log('Vazio?', ss.empty)
    ss.forEach(doc => {
        
        const myData = doc.data()
        console.log('id: ', doc.id, '=>', myData)

        db
            .collection('products')
            .doc(doc.id)
            .collection('images')
            .get()
            .then(ss => {
                    ss.forEach(doc => {
                    console.log('id image', doc.id, '=>', doc.data())
                })
            })

    })
})

