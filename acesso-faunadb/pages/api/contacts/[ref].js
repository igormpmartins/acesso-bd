import {deleteContact} from '../../../services/contact'

const handler = async(req, res) => {
    if (req.method ==='DELETE') {
        const ref = req.query.ref
        const retDelete = await deleteContact(ref)
        res.json({ok: true, data: retDelete})
    }
}

export default handler