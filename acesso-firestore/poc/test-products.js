const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const catId = 'W5ncBHWURsU0jNmwICuP'

const catRef = db.collection('categories').doc(catId)

const doc = db.collection('products').doc()

doc.set({
    description: 'Ibanez Jem 77VWH DNA',
    price: 50,
    categories: [catRef],
    categories2: [catId]
    }).then(snap=> {
        console.log(snap)
    })


