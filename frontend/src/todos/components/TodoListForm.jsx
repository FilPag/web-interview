import React, { useState, useRef } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import { Todo } from './Todo'
import { RequestIndicator } from './RequestIndicator'
import AddIcon from '@mui/icons-material/Add'
import { put } from '../../utils'

const SAVE_TIMEOUT = 500
const updateTodos = (id, updateTodoList) => {
  return put(`/lists/${id}`, updateTodoList)
}

export const TodoListForm = ({ todoList}) => {
  const [todos, setTodos] = useState(todoList.todos)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)
  const timeoutRef = useRef(null)

  const saveTodos = async (newTodos) => {
    try {
      await updateTodos(todoList.id, newTodos)
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to save todos', err)
      setError(err.message || 'Unable to update todos')
    }
  }

  const debouncedSave = (newTodos) => {
    setTodos(newTodos)
    setIsEditing(true)
    setError(null)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      saveTodos(newTodos)
    }, SAVE_TIMEOUT)
  }

  const handleAdd = () => debouncedSave([...todos, ''])
  const handleDelete = (index) => debouncedSave(todos.filter((_, i) => i !== index))
  const handleUpdate = (id, todo) => debouncedSave(todos.map((t, i) => (i === id ? todo : t)))

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((name, index) => (
            <Todo
              key={index}
              todo={name}
              onUpdate={(todo) => handleUpdate(index, todo)}
              onDelete={() => handleDelete(index)}
            />
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={handleAdd}>
              Add Todo <AddIcon />
            </Button>
            <RequestIndicator isLoading={isEditing} error={error} />
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
