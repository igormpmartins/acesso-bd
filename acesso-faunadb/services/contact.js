import { client, q } from '../utils/db'

export const createContact = (data) => {
	return client.query(q.Create(q.Collection('contacts'), { data }))
}

export const getContactByRef = (ref) => {
	return client.query(q.Get(q.Ref(q.Collection('contacts'), ref)))
}

export const findAll = () => {
	return client.query(
		q.Map(
			q.Paginate(q.Match('allContacts'), { size: 3 }),
			q.Lambda((i) => q.Get(i))
		)
	)
}

export const deleteContact = ref => {
    return client.query(q.Delete(q.Ref(q.Collection('contacts'), ref)))
}

export const getContactByNome = (nome) => {
	return client.query(q.Get(q.Match(q.Index('contactByNome'), [nome])))
}

