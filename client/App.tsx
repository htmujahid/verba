import { Routes, Route } from 'react-router'
import { Container } from '@mui/material'

import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/layouts/AuthLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Dashboard from './pages/home/index'
import Account from './pages/home/account/index'
import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import ForgotPassword from './pages/auth/forgot-password'
import ResetPassword from './pages/auth/reset-password'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Container maxWidth="xl"><Home /></Container>} />
        <Route path="about" element={<Container maxWidth="xl"><About /></Container>} />
        <Route path="contact" element={<Container maxWidth="xl"><Contact /></Container>} />

        <Route path="home" element={<ProtectedRoute />}>
          <Route index element={<Container maxWidth="xl"><Dashboard /></Container>} />
          <Route path="account" element={<Container maxWidth="xl"><Account /></Container>} />
        </Route>
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  )
}

export default App
