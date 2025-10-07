import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const todoLists = {
  '0000000001': {
    title: 'First List',
    todos: [
      {
        title: 'First todo of first list!',
        completed: false,
      },
    ],
  },
  '0000000002': {
    title: 'Second List',
    todos: [
      {
        title: 'First todo of second list!',
        completed: false,
      },
      {
        title: 'Second todo of second list!',
        completed: false,
      },
    ],
  },
}

const mapTodoLists = (todoLists) => {
  return Object.keys(todoLists).map((key) => {
    return {
      id: key,
      ...todoLists[key],
    }
  })
}

app.get('/lists', (req, res) => res.json(mapTodoLists(todoLists)))

app.post('/lists', (req, res) => {
  const newList = req.body
  todoLists[newList.id] = newList
  res.json(mapTodoLists(todoLists))
})

app.put('/lists/:id', (req, res) => {
  setTimeout(() => {
    const listId = req.params.id
    const updatedTodos = req.body

    if (!todoLists[listId]) {
      return res.status(404).json({ error: 'Todo list not found' })
    }

    if (!updatedTodos || !Array.isArray(updatedTodos)) {
      return res.status(400).json({ error: 'Invalid request body: todos must be an array' })
    }

    console.log(`Updating todos for list ${listId}:`, JSON.stringify(updatedTodos, null, 2))
    todoLists[listId].todos = updatedTodos
    res.json(mapTodoLists(todoLists))
  }, 1000)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
