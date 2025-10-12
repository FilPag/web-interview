import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import { Todo } from './Todo'
import { RequestIndicator } from './RequestIndicator'
import AddIcon from '@mui/icons-material/Add'

const SAVE_TIMEOUT = 500

const addTodo = (todos) => [...todos, { title: '', completed: false }]
const deleteTodo = (todos, index) => todos.filter((_, i) => i !== index)
const updateTodo = (todos, index, todo) => todos.map((t, i) => (i === index ? todo : t))

export const TodoListForm = ({ todoList, onUpdate }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)
  const timeoutRef = useRef(null)

  const saveTodos = async (newTodos) => {
    try {
      await onUpdate({ ...todoList, todos: newTodos })
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to save todos', err)
      setError(err.message)
    }
  }

  const debouncedSave = useCallback(
    (newTodos) => {
      setTodos(newTodos)
      setIsEditing(true)
      setError(null)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(async () => {
        saveTodos(newTodos)
      }, SAVE_TIMEOUT)
    },
    [todoList, onUpdate]
  )

  const handleAdd = () => debouncedSave(addTodo(todos))
  const handleDelete = (index) => debouncedSave(deleteTodo(todos, index))
  const handleUpdate = (id, updated_todo) => debouncedSave(updateTodo(todos, id, updated_todo))

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              onUpdate={(updated_todo) => handleUpdate(index, updated_todo)}
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

TodoListForm.propTypes = {
  todoList: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
