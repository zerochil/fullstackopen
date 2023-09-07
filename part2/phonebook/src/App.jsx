import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  // const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.get("/").then(
      (response) => {
        setPersons(response.data)
      }    
    )
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    // const personExist = persons.filter( person => person.name === formProps.name)rson => 
    const index = persons.findIndex( person => person.name === formProps.name )
    if ( index >= 0 ){
      if ( formProps.number == persons[index].number ){
        alert( `${formProps.name} is alrady added to phonebook` )
      } else {
        if (confirm( `${formProps.name} is alrady added to phonebook, replace old number with new one?` )){
          persons[index].number = formProps.number
          personService.put(persons[index].id, persons[index]).then(
            () => setPersons([...persons])
          ).catch( () => {
            setMessage({content:`Infomation about ${formProps.name} has already been removed from server`, status:'error'})
            setTimeout(() => {setMessage(null)}, 5000)
          })
        }
      }
    } else {
      const largestId = Math.max(...persons.map(person=>person.id))
      formProps.id = largestId+1
      personService.post("/", formProps)
      setPersons(persons.concat(formProps))
      setMessage({content:`Added ${formProps.name}`, status:'success'})
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  const handleDelete = (e) => {
    const id = e.target.id
    setPersons( persons.filter(person => person.id != id) )
    personService.remove(id)
  }

  const displayNumbers = () => {
    return (
      persons.filter( 
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      ).map(
        person => {
          return (
            <p key={person.id}>
              {person.name} {person.number}
              <button onClick={handleDelete} id={person.id}>delete</button>
            </p>
          )
        }
      )
    )
  }


  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons display={displayNumbers} />
    </div>
  )
}

const Filter = ({handleFilter}) => {
  return (
    <div>filter: <input type="text" name="number" onKeyUp={handleFilter} /></div>
  )
}

const PersonForm = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input type="text" name="name" />
      </div>
      <div>number: <input type="text" name="number" /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({display}) => {
  return(display())
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <p className={`notification ${message.status}`}>
      {message.content}
    </p>
  )
}

export default App