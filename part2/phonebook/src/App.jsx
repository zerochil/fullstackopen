import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 12345678}
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps)
    if ( persons.some( person => person.name === formProps.name) ){
      alert( `${formProps.name} is alrady added to phonebook` )
      return
    }
    const newcopy = [...persons, formProps]
    setPersons(newcopy)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map( person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App