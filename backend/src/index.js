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

function mapTodoLists(lists) {
  const result = {}
  for (const id in lists) {
    result[id] = { id, ...lists[id] }
  }
  return result
}

app.get('/lists', (req, res) => res.json(mapTodoLists(todoLists)))

app.post('/lists', (req, res) => {
  const newList = req.body
  todoLists[newList.id] = newList
  res.json(mapTodoLists(todoLists))
})

app.put('/lists/:id', (req, res) => {
  const listId = req.params.id
  const updatedList = req.body

  if (!todoLists[listId]) {
    return res.status(404).json({ error: 'Todo list not found' })
  }

  console.log(`Updating todos for list ${listId}:`, JSON.stringify(updatedList, null, 2))
  todoLists[listId] = updatedList
  res.json(mapTodoLists(todoLists))
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
