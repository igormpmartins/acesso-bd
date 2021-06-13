const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const catId = 'd7snPeiOpyvZSGNunAem'

const catRef = db.collection('categories').doc(catId)
const doc = db.collection('products').doc('bTADDpAsVZtdKWV6crTh')

doc.update({
    description: 'Ibanez Jem 77VWH',
    price: 55555,
    categories: admin.firestore.FieldValue.arrayUnion(catRef),
    categories2: admin.firestore.FieldValue.arrayUnion(catId)
    }).then(snap=> {
        console.log(snap)
    })


