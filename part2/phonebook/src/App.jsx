import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  // const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if ( persons.some( person => person.name === formProps.name) ){
      alert( `${formProps.name} is alrady added to phonebook` )
      return
    }

    setPersons([...persons, formProps])
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
      <div>number: <input type="text" name="number" onKeyUp={handleFilter} /></div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" name="name" />
        </div>
        <div>number: <input type="text" name="number" /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayNumbers()}
      {/* {persons.map( person => <p key={person.name}>{person.name} {person.number}</p>)} */}
    </div>
  )
}

export default App