import { Routes, Route } from 'react-router'
import { Box, Container } from '@mui/material'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </Container>

      <Footer />
    </Box>
  )
}

export default App
