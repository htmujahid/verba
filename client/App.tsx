import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

import { Spinner } from './components/ui/spinner'
import { MainLayout } from './components/layouts/main-layout'
import { AuthLayout } from './components/layouts/auth-layout'
import { ProtectedRoute } from './components/auth/protected-route'

const Home = lazy(() => import('./pages/home'))
const About = lazy(() => import('./pages/about'))
const Contact = lazy(() => import('./pages/contact'))
const Dashboard = lazy(() => import('./pages/home/index'))
const AccountLayout = lazy(() => import('./pages/home/account/index'))
const AccountProfile = lazy(() => import('./pages/home/account/profile'))
const AccountSecurity = lazy(() => import('./pages/home/account/security'))
const AccountDanger = lazy(() => import('./pages/home/account/danger'))
const SignIn = lazy(() => import('./pages/auth/sign-in'))
const SignUp = lazy(() => import('./pages/auth/sign-up'))
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'))
const ResetPassword = lazy(() => import('./pages/auth/reset-password'))
const TwoFactor = lazy(() => import('./pages/auth/two-factor/index'))
const TwoFactorOtp = lazy(() => import('./pages/auth/two-factor/otp'))

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner className="size-6" />
    </div>
  )
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-4">{children}</div>
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Container><Home /></Container>} />
          <Route path="about" element={<Container><About /></Container>} />
          <Route path="contact" element={<Container><Contact /></Container>} />

          <Route path="home" element={<ProtectedRoute />}>
            <Route index element={<Container><Dashboard /></Container>} />
            <Route path="account" element={<Container><AccountLayout /></Container>}>
              <Route index element={<AccountProfile />} />
              <Route path="security" element={<AccountSecurity />} />
              <Route path="danger" element={<AccountDanger />} />
            </Route>
          </Route>
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="two-factor" element={<TwoFactor />} />
          <Route path="two-factor/otp" element={<TwoFactorOtp />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
