import useSWR from 'swr'
import Link from 'next/link'

const deleteRequest = async(url) => {

    const res = await fetch(url, {
        method:'DELETE'
    })

    const retData = await res.json()
    return retData

}

const Index = () => {
	const { data, mutate } = useSWR('/api/contacts')
    const deleteContact = async(ref) => {
        await deleteRequest('/api/contacts/' + ref)
        mutate()
    }

	if (!data) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<h1>List Contacts</h1>
            <p>
                <Link a href='/create'>Create Contact</Link>
            </p>
			{data.data.map((contact, index) => {
				return (
					<div key={index}>
						{contact.data.name} - {contact.data.email} {' '}
                        <button type="button" onClick={() => {deleteContact(contact.ref['@ref'].id)}}>Remove</button>
						<br />
						<hr />
					</div>
				)
			})}
			{/* <pre>{JSON.stringify(data.after, null, 2)}</pre> */}
		</div>
	)
}

export default Index
