import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { API_ROUTES, APP_CONFIG, type HealthStatus } from '../shared'

function App() {
  const [count, setCount] = useState(0)
  const [health, setHealth] = useState<HealthStatus | null>(null)

  useEffect(() => {
    fetch(API_ROUTES.health)
      .then(res => res.json())
      .then(setHealth)
  }, [])

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 3,
        }}
      >
        <Stack direction="row" spacing={3}>
          <Link href="https://vite.dev" target="_blank" rel="noopener">
            <Box
              component="img"
              src={viteLogo}
              alt="Vite logo"
              sx={{
                height: 80,
                transition: 'filter 0.3s',
                '&:hover': {
                  filter: 'drop-shadow(0 0 1.5em #646cffaa)',
                },
              }}
            />
          </Link>
          <Link href="https://react.dev" target="_blank" rel="noopener">
            <Box
              component="img"
              src={reactLogo}
              alt="React logo"
              sx={{
                height: 80,
                transition: 'filter 0.3s',
                animation: 'spin 20s linear infinite',
                '&:hover': {
                  filter: 'drop-shadow(0 0 1.5em #61dafbaa)',
                },
                '@keyframes spin': {
                  from: { transform: 'rotate(0deg)' },
                  to: { transform: 'rotate(360deg)' },
                },
              }}
            />
          </Link>
        </Stack>

        <Typography variant="h3" component="h1" fontWeight="bold">
          {APP_CONFIG.appName}
        </Typography>

        <Chip
          label={`API Status: ${health?.status ?? 'loading...'}`}
          color={health?.status === 'ok' ? 'success' : 'default'}
          variant="outlined"
        />

        <Card sx={{ minWidth: 300, textAlign: 'center' }}>
          <CardContent>
            <Button
              variant="contained"
              size="large"
              onClick={() => setCount((count) => count + 1)}
              sx={{ mb: 2 }}
            >
              Count is {count}
            </Button>
            <Typography variant="body2" color="text.secondary">
              Edit <code>src/App.tsx</code> and save to test HMR
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="body2" color="text.secondary">
          Click on the Vite and React logos to learn more
        </Typography>
      </Box>
    </Container>
  )
}

export default App
