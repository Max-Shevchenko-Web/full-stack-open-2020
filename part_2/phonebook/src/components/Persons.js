import React from 'react'

const Persons = ({numbersToShow, deleteNote}) => {
  return (
    <ul>
      {numbersToShow.map(person => {
        return (
          <div key={person.name} style={{display: 'flex'}}>
            <li  style={{marginRight: '5px'}}>{person.name}:{person.number}</li>
            <button onClick={() => deleteNote(person)}>delete</button>
          </div>
        )
      })}
    </ul>
  )
}

export default Persons
