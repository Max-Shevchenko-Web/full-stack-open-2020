import React, { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const addNote =(event) => {
    event.preventDefault();

    const isContains = persons.some(item => item.name === newName);;
    console.log(isContains);
    if (isContains) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newObject));
    setNewName('');
    setNewNumber('');
  }

  const toCompare = (str1, str2) => {
    const regExp = new RegExp(str2, 'gi')
    return regExp.test(str1.toString())
  }

  const numbersToShow = search
  ? persons.filter(person => toCompare(person.name, search))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter  value={search} onChange={(event) => setSearch(event.target.value)}/>
      <h2>Add a new numbers</h2>
      <PersonForm
        onSubmit={addNote}
        newName={newName}
        newNumber={newNumber}
        onChangeName={(event) => setNewName(event.target.value)}
        onChangeNumber={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons numbersToShow={numbersToShow} />
    </div>
  )
}

export default App
