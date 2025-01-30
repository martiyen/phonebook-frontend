import { useState, useEffect } from 'react'

import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Delete from './components/Delete'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotification, setNewNotification] = useState(null)
  const [isSuccessful, setIsSuccessfull] = useState(null)

  useEffect(() => {
    personService
    .showAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])
  

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updatePhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const updateNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    console.log("found: " + {existingPerson})

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          ... existingPerson,
          number: newPhoneNumber
        }
        personService
          .updateNumber(updatedPerson)
          .then(() => {
            setPersons(persons.map((p) => p.id === updatedPerson.id ? updatedPerson : p))
            setNewName('')
            setNewPhoneNumber('')
            setNewNotification(`Number of ${updatedPerson.name} was updated`)
            setIsSuccessfull(true)
            setTimeout(() => {
              setNewNotification(null)
            }, 5000)}
          )
          .catch(error => {
            if (error.response.status === 404) {
              setNewNotification(`The person ${updatedPerson.name} was already deleted from the server`)
              setPersons(persons.filter(p => p.id !== updatedPerson.id))
              setNewName('')
              setNewPhoneNumber('')
              
            } else {
              setNewNotification(`${error.response.data.error}`)
            }
            setIsSuccessfull(false)
            setTimeout(() => {
              setNewNotification(null)
            }, 5000)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber,
      }
      console.log(newPerson);
      
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewPhoneNumber("")
          setNewNotification(`${returnedPerson.name} was added to the phonebook`)
          setIsSuccessfull(true)
          setTimeout(() => {
            setNewNotification(null)
          }, 5000);
        })
        .catch(error => {
          setNewNotification(`${error.response.data.error}`)
          console.log(error.response)
          setIsSuccessfull(false)
          setTimeout(() => {
            setNewNotification(null)
          }, 5000)
        })
    }
  }

  const removePerson = ({p}) => {
    if (window.confirm(`Delete ${p.name}?`)) {
      personService.remove(p.id).then(() => {
        setPersons(persons.filter((person) => person.id !== p.id))
      })
    }
  }

  const filteredPersons = persons.filter((p) => p.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Notification message={newNotification} successful={isSuccessful} />
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={updateNewFilter} />
      <h3>Add a new</h3>
      <PersonForm
        nameValue={newName}
        onNameChange={updateNewName}
        numberValue={newPhoneNumber}
        onNumberChange={updatePhoneNumber}
        addNewPerson={addNewPerson}
      />
      <h3>Numbers</h3>
      {filteredPersons.map(p => (
        <div key={p.id}>
        <Person person={p} /> <Delete onClick={() => removePerson({p})} />
        </div>
      ))}
    </div>
  )
}

export default App