import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { Box, CircularProgress, Container } from '@mui/material'

import { MainLayout } from './components/layouts/MainLayout'
import { AuthLayout } from './components/layouts/AuthLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

const Home = lazy(() => import('./pages/home'))
const About = lazy(() => import('./pages/about'))
const Contact = lazy(() => import('./pages/contact'))
const Dashboard = lazy(() => import('./pages/home/index'))
const Account = lazy(() => import('./pages/home/account/index'))
const SignIn = lazy(() => import('./pages/auth/sign-in'))
const SignUp = lazy(() => import('./pages/auth/sign-up'))
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'))
const ResetPassword = lazy(() => import('./pages/auth/reset-password'))

function PageLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <CircularProgress />
    </Box>
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  )
}

export default App
