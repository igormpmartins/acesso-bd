const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const prodId = 'vAprMWTLBYBJUlnbgfov'
const prodRef = db.collection('products').doc(prodId)

const imageDt = db.collection('products').doc(prodId).collection('images').get()

imageDt.then(ss=> {

    const exc = []
    ss.forEach(item=> {
        exc.push(db.collection('products').doc(prodId).collection('images').doc(item.id).delete())
    })

    Promise.all(exc).then(()=> {

        console.log('se foram as imagens!')

        prodRef.delete().then(()=> {
            console.log('se foi o produto!')
        })

    })
    
    /*Promise.all(ss.forEach(item=> {
        return item.delete()
    })).then(()=> {
        console.log('apagou imagens!')
    })*/

})

//prodRef.then(ss=> {
    


    /*
    imageDt.then(imgSS => {

        Promise.all(imgSS.docs.forEach(item => {
           return db.collection('products').doc(ss.id).collection('images').doc(item.id).delete()
        })).then(() => {
                console.log('foram as imagens')
    
                prodRef.delete().then(()=> {
                    console.log('foi tudo!')
                })
            })
    })
    */
//})


