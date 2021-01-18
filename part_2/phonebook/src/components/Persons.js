import React from 'react'

const Persons = ({numbersToShow}) => {
  return (
    <ul>
      {numbersToShow.map(person => {
        return <li key={person.name} >{person.name}:{person.number}</li>
      })}
    </ul>
  )
}

export default Persons
