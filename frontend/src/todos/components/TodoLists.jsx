import React, { Fragment, useState, useEffect, useCallback } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { get, post } from '../../utils'

const fetchTodoLists = () => {
  return get('/lists')
}

const updateTodos = (id, updateTodoList) => {
  return post(`/lists/${id}`, updateTodoList)
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  const handleSaveTodoList = useCallback(async (id, todos) => {
    try {
      await updateTodos(id, todos)
      setTodoLists((prev) => ({
        ...prev,
        [id]: { ...prev[id], todos },
      }))
    } catch (err) {
      console.error('Failed to save todos', err)
    }
  }, [])

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(todos) => handleSaveTodoList(activeList, todos)}
        />
      )}
    </Fragment>
  )
}
