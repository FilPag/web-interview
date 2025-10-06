import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const todoLists = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: ['First todo of first list!'],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: ['First todo of second list!'],
  },
}

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/lists', (req, res) => res.json(todoLists))

app.post('/lists', (req, res) => {
  const newList = req.body;
  todoLists[newList.id] = newList;
  res.json(newList);
})

// Expects a body with a todos array
app.post('/lists/:id', (req, res) => {
  const listId = req.params.id;
  const listToUpdate = req.body;

  if (!todoLists[listId]) {
    return res.status(404).json({ error: 'Todo list not found' });
  }

  if (!listToUpdate || !Array.isArray(listToUpdate.todos)) {
    return res.status(400).json({ error: 'Invalid request body: todos must be an array' });
  }

  console.log('listToUpdate', listToUpdate);
  todoLists[listId].todos = listToUpdate.todos;
  res.sendStatus(200);
})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
