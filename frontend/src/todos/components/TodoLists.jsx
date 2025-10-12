import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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
import { ErrorPage } from './ErrorPage'
import { get, put } from '../../api'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeListId, setActiveListId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTodoLists = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await get('/lists')
      setTodoLists(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const updateTodoList = async (updatedList) => {
    const listId = updatedList.id
    await put(`/lists/${listId}`, updatedList)
    const newTodoLists = { ...todoLists, [listId]: updatedList }
    setTodoLists(newTodoLists)
  }

  useEffect(() => {
    fetchTodoLists()
  }, [])

  if (loading) return <div />
  if (error) return <ErrorPage error={error} />
  if (!Object.keys(todoLists).length) return null

  const activeList = activeListId ? todoLists[activeListId] : null

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveListId(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {activeList && (
        <TodoListForm key={activeListId} todoList={activeList} onUpdate={updateTodoList} />
      )}
    </Fragment>
  )
}

TodoLists.propTypes = {
  style: PropTypes.object.isRequired,
}
