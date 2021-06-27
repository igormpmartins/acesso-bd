import {createContact, findAll} from '../../../services/contact'

const handler = async (req, res) => {

    if (req.method === 'POST') {
        const create = await createContact(req.body)
        res.json(create)

    } else {
        const lista = await findAll()
        res.json(lista)
    }
}

export default handler
