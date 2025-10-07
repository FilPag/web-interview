import React from 'react'
import { CircularProgress } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

export const RequestIndicator = ({ isLoading, error }) => {
  if (error) {
    return <CloseIcon sx={{ color: 'error.main', fontSize: 24 }} />
  }

  if (isLoading) {
    return <CircularProgress size={24} color='warning' />
  }

  return <CheckIcon sx={{ color: 'success.main', fontSize: 24 }} />
}

