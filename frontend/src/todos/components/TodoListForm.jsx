import React, { useState, useRef } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'

const TYPING_TIMEOUT = 500

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const [isSaving, setIsSaving] = useState(false)
  const timeoutRef = useRef(null)

  const handleInput = (index, value) => {
    setIsSaving(true)

    const newTodos = [...todos]
    newTodos[index] = value
    setTodos(newTodos)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(async () => {
      await saveTodoList(todoList.id, { todos: newTodos })
      setIsSaving(false)
    }, TYPING_TIMEOUT)
  }

  const handleDelete = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
    saveTodoList(todoList.id, { todos: newTodos })
  }

  const handleAdd = () => {
    const newTodos = [...todos, '']
    setTodos(newTodos)
    saveTodoList(todoList.id, { todos: newTodos })
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((name, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={name}
                onChange={(event) => {
                  handleInput(index, event.target.value)
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => handleDelete(index)}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={handleAdd}
            >
              Add Todo <AddIcon />
            </Button>
            {isSaving ? (
              <CircularProgress size={24} color='warning' />
            ) : (
              <CheckIcon sx={{ color: 'success.main', fontSize: 24 }} />
            )}
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
