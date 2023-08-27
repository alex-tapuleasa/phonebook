import React from 'react'

const Contact = (props) => {
    const {name, phone, email, city, id } = props;

  return (
    <>
    <div><strong>{name}</strong>: {phone}</div>
    <button href={`/contacts/${id}`}>Details</button>
    </>
  )
}

export default Contact