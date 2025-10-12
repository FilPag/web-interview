import React from 'react';
import { Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const ErrorPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100%"
    mt={8}
  >
    <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
    <Typography variant="h5" gutterBottom>
      Oops, something went wrong
    </Typography>
    <Typography variant="body1">
      Please try again later.
    </Typography>
  </Box>
);