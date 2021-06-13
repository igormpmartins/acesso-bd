const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const prodId = 'vAprMWTLBYBJUlnbgfov'
const catRef = db
    .collection('products').doc(prodId)
    .collection('images').doc()

catRef.set({
    description: 'DNA Image',
    url: 'about:blank'
}).then(res=> {
    console.log(res)
})




