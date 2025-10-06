import React, { useState} from 'react'
import { Card, CardContent, CardActions, Button, Typography, CircularProgress } from '@mui/material'
import { Todo } from './Todo'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'


export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const [isEditing, setIsEditing] = useState(false)
  const handleDelete = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
    saveTodoList(newTodos)
  }

  const handleAdd = () => {
    const newTodos = [...todos, '']
    setTodos(newTodos)
    saveTodoList(newTodos)
  }

  const handleSave = async (id, todo) => {
    const newTodos = [...todos]
    newTodos[id] = todo
    setTodos(newTodos)
    await saveTodoList(newTodos)
    setIsEditing(false)
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((name, index) => (
            <Todo
              key={index}
              id={index}
              todo={name}
              setIsEditing={setIsEditing}
              saveTodo={(todo) => handleSave(index, todo)}
              onDelete={handleDelete}
            />
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={handleAdd}>
              Add Todo <AddIcon />
            </Button>
            {isEditing ? (
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
