import { Box, Typography, TextField, Button, Paper, Stack } from '@mui/material'

export default function Contact() {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Contact
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Stack spacing={3}>
          <TextField label="Name" variant="outlined" fullWidth />
          <TextField label="Email" type="email" variant="outlined" fullWidth />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
          <Button variant="contained" size="large">
            Send Message
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
