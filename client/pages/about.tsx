import { Box, Typography, Paper } from '@mui/material'

export default function About() {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        About
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          This is a React application built with Vite, Material-UI, and React Router.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          It demonstrates a modern frontend setup with:
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body1">React 18 with TypeScript</Typography>
          <Typography component="li" variant="body1">Vite for fast development</Typography>
          <Typography component="li" variant="body1">Material-UI components</Typography>
          <Typography component="li" variant="body1">React Router for navigation</Typography>
        </Box>
      </Paper>
    </Box>
  )
}
