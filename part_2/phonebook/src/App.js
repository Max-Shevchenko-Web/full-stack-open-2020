import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/personsService'
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    typeOfClass: ''
  })

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons);
      })
  }, [])

  const dispatchNotification = (newNotification) => {
    setNotification(newNotification)
    setTimeout(() => {
      setNotification({message: null, typeOfClass: ''})
    }, 5000)
  }

  const addPerson =(event) => {
    event.preventDefault();

    const newObject = {
      name: newName,
      number: newNumber
    }

    // if such a name is already in the list
    const isContains = persons.some(item => {
      if (item.name === newName) {
        // suggest updating
        const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

        if (result) {
          personsService
              .update(item.id, newObject)
              .then(data => {
                // update the list only in the place we need
                setPersons(persons.map(person => person.id !== item.id ? person : data))
                dispatchNotification({
                    message : `${newName} updated`,
                    typeOfClass : 'info'
                })
              })
              .catch(err => {
                setPersons(
                  persons.filter(person => {
                    return person.id !== item.id;
                  })
                );
                dispatchNotification({
                  message : `Information of ${newName}  has already been removed from the server`,
                  typeOfClass : 'info'
                })
              });
        }
        return true
      } else {
        return false
      }
    });

    // if this name does not exist, create a new one
    if(!isContains) {
      personsService.create(newObject).then(person=> {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
        dispatchNotification({
          message : `Added ${person.name}`,
          typeOfClass : 'info'
        })
      })
      .catch(error => {
        console.log(error.response.data)
        dispatchNotification({
          // message: JSON.stringify(error.response.data),
          message: `${newName} not added`,
          typeOfClass: 'error'
        })
      })
    }
}

  const toCompare = (str1, str2) => {
    const regExp = new RegExp(str2, 'gi')
    return regExp.test(str1.toString())
  }

  const deleteNote = ({name, id}) => {
    const result = window.confirm(`Delete ${name} ?`);
    if (result) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          dispatchNotification({
            message : `${name} was removed`,
            typeOfClass : 'info'
          })
        })
        .catch(error => {
          console.log(error);
          dispatchNotification({
            message: `Information of ${name} has already been removed from server`,
            typeOfClass: 'error'
          })
          setPersons(persons.filter(p => p.id !== id))
        })

    } else {
      return null
    }
  }

  const numbersToShow = search
  ? persons.filter(person => toCompare(person.name, search))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} className={notification.typeOfClass}/>
      <Filter  value={search} onChange={(event) => setSearch(event.target.value)}/>
      <h2>Add a new numbers</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        onChangeName={(event) => setNewName(event.target.value)}
        onChangeNumber={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons numbersToShow={numbersToShow} deleteNote={deleteNote} />
    </div>
  )
}

export default App
