import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Contact from './Contact';

function ContactsList() {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        async function getData() {
            const res = axios.get(`/contacts/${id}`)
            setContacts(res.data)
        }
        getData() }, []
    )

  return (
    <>  
        {contacts.map(contact => (
        <Contact 
            name={contact.name}
            phone={contact.phone}
            id={contact._id}
            city={contact.city}
            email={contact.email}
        />
        ))}
    </>  
  )
}

export default ContactsList