import { useState, useEffect } from 'react'
import 'axios'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  // const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3000/db").then(
      (response) => {
        setPersons(response.data.persons)
      }    
    )
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if ( persons.some( person => person.name === formProps.name) ){
      alert( `${formProps.name} is alrady added to phonebook` )
      return
    }

    formProps.id = persons.length+1

    // const newPersons = persons.concat(formProps)

    axios
    .post("http://localhost:3000/persons", formProps)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });

    setPersons(persons.concat(formProps))
  }


  const displayNumbers = () => {
    return (
      persons.filter( 
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      ).map(
        person => <p key={person.name}>{person.name} {person.number}</p>
      )
    )
  }


  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
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

export default App