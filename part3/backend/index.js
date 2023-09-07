const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

morgan.token('req-body', (req) => JSON.stringify(req.body));


app.use(cors());
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :req-body')
);

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
];

app.get('/info/', (request, response) => {
  const d = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${d.toString()}</p>`);
});

app.get('/api/persons/', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(person => person.id == id) ;
  if (person) {
    response.json(person);
  } else {
      response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter(person => person.id != id );
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const person = request.body;

  if (!person.name || !person.number) {
    return response.status(400).json({ 
      error: 'missing person\'s details.' 
    });
  };

  if (persons.some(p => p.name == person.name)) {
    return response.status(400).json({ 
      error: 'This name exists already.' 
    });
  };

  person.id = Math.floor(Math.random()*10000000);
  persons = persons.concat(person);

  response.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(3000, () => {
  console.log('app listening on port 3000');
});