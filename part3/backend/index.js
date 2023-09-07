const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info/', (request, response) => {
  const d = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${d.toString()}</p>`)
})

app.get('/api/persons/', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id == id) 
  if (person) {
    response.json(person)
  } else {
      response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id != id )
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const maxId = (persons.length > 0) ? Math.max(...persons.map(person => person.id)) : 0
  const person = request.body
  person.id = maxId + 1
  persons = persons.concat(person)

  response.json(person)
}) 

app.listen(3000, () => {
  console.log('app listening on port 3000')
})