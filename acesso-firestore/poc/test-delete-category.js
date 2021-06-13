const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const key = '7g33wDZMS2v2XogY9BTg'
const doc = db.collection('categories').doc(key)

doc.delete().then(() => {
        console.log('se fue!')
    })


