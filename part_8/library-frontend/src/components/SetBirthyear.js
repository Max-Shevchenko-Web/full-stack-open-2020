import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from './../query';

const SetBirthyear = ({authors}) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [ editAuthorBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [  {query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthorBorn({ variables: {name, setBornTo: +born} })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author, id) =>
                <option key={authors.length + id} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear