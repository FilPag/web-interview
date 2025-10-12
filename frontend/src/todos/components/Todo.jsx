import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Checkbox, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const Todo = ({ todo, onUpdate, onDelete }) => {
  const [todoState, setTodo] = useState(todo)

  const updateTodo = (updates) => {
    const newTodoState = { ...todoState, ...updates }
    setTodo(newTodoState)
    onUpdate(newTodoState)
  }

  const handleInput = (value) => {
    updateTodo({ title: value })
  }

  const onCompleteChanged = () => {
    updateTodo({ completed: !todoState.completed })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox checked={todoState.completed} onChange={onCompleteChanged} />
      <TextField
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        label='What to do?'
        inputProps={{
          style: {
            textDecoration: todoState.completed ? 'line-through' : 'none',
          },
        }}
        value={todoState.title}
        onChange={(event) => {
          handleInput(event.target.value)
        }}
      />
      <Button sx={{ margin: '8px' }} size='small' color='secondary' onClick={() => onDelete()}>
        <DeleteIcon />
      </Button>
    </div>
  )
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
