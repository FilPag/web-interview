import React, { useState, useRef } from 'react'
import { TextField, Checkbox, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const TYPING_TIMEOUT = 500

export const Todo = ({ id, todo, setIsEditing, saveTodo, onDelete }) => {
  const [todoState, setTodo] = useState(todo)
  const timeoutRef = useRef(null)

  const handleInput = (value) => {
    setIsEditing(true)
    const newTodoState = { ...todoState }
    newTodoState.title = value
    setTodo(newTodoState)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(async () => {
      await saveTodo(newTodoState)
      setIsEditing(false)
    }, TYPING_TIMEOUT)
  }

  const onCompleteChanged = () => {
    const newTodoState = { ...todoState }
    newTodoState.completed = !newTodoState.completed
    setTodo(newTodoState)
    saveTodo(newTodoState)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox checked={todoState.completed} onChange={onCompleteChanged} />
      <TextField
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        label='What to do?'
        value={todoState.title}
        onChange={(event) => {
          handleInput(event.target.value)
        }}
      />
      <Button sx={{ margin: '8px' }} size='small' color='secondary' onClick={() => onDelete(id)}>
        <DeleteIcon />
      </Button>
    </div>
  )
}
