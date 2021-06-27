const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({
	secret: 'fnAEMpuZqbACAliyR5UKtVKMOiKZ4BzqDuk_3G-d',
})

const createContact = (data) => {
	return client.query(q.Create(q.Collection('contacts'), { data }))
}

const getContactByRef = (ref) => {
	return client.query(q.Get(q.Ref(q.Collection('contacts'), ref)))
}

const findAll = () => {
	return client.query(
		q.Map(
			q.Paginate(q.Match('allContacts'), { size: 2 }),
			q.Lambda((i) => q.Get(i))
		)
	)
}

const getContactByNome = (nome) => {
	return client.query(q.Get(q.Match(q.Index('contactByNome'), [nome])))
}

/*
createContact({
    Nome: 'Gregory',
    Title: 'King, the 1st'
}).then(res=> {
    console.log(res)
})
*/

/*
getContactByRef('302475452393456131').then(res=> {
    console.log('Meu get', res)
})

getContactByRef('302474532086612483').then(res=> {
    console.log('Meu get 2', res)
})
*/

/*findAll().then(res=> {
    console.log(res)
})
*/
getContactByNome('Igor Martins').then((res) => {
	console.log(res)
})

const treku = 'treku'
