const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const key = 'd7snPeiOpyvZSGNunAem'
const doc = db.collection('categories').doc(key)

doc.set({
    category: 'Sony update!'
    }).then(snap=> {
        console.log(snap)
    })


