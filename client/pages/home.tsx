import { Box, Typography, Button, Card, CardContent, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router'

export default function Home() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Welcome Home
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        This is the home page of the application.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button component={RouterLink} to="/about" variant="contained">
          Learn About Us
        </Button>
        <Button component={RouterLink} to="/contact" variant="outlined">
          Contact Us
        </Button>
      </Stack>
      <Card sx={{ mt: 4, maxWidth: 400, mx: 'auto' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Getting Started
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explore the navigation above to learn more about this app.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
