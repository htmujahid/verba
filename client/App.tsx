import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

import { Spinner } from './components/ui/spinner'
import { MainLayout } from './components/layouts/main-layout'
import { AuthLayout } from './components/layouts/auth-layout'
import { ProtectedRoute } from './components/auth/protected-route'
import { ResourceLayout } from './components/layouts/resource-layout'

const Home = lazy(() => import('./pages/home'))
const Dashboard = lazy(() => import('./pages/home/index'))
const Resource = lazy(() => import('./pages/resource/index'))

const AccountLayout = lazy(() => import('./pages/account/index'))
const AccountProfile = lazy(() => import('./pages/account/profile'))
const AccountSecurity = lazy(() => import('./pages/account/security'))
const AccountDanger = lazy(() => import('./pages/account/danger'))

const SignIn = lazy(() => import('./pages/auth/sign-in'))
const SignUp = lazy(() => import('./pages/auth/sign-up'))
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'))
const ResetPassword = lazy(() => import('./pages/auth/reset-password'))
const TwoFactor = lazy(() => import('./pages/auth/two-factor'))
const TwoFactorOtp = lazy(() => import('./pages/auth/two-factor-otp'))

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

          <Route path="home" element={<ProtectedRoute />}>
            <Route index element={<Container><Dashboard /></Container>} />
          </Route>

          <Route path="account" element={<ProtectedRoute />}>
            <Route element={<Container><AccountLayout /></Container>}>
              <Route index element={<AccountProfile />} />
              <Route path="security" element={<AccountSecurity />} />
              <Route path="danger" element={<AccountDanger />} />
            </Route>
          </Route>
        </Route>

        <Route element={<ResourceLayout />}>
          <Route path="resource" element={<ProtectedRoute />}>
            <Route path=":resource" element={<Resource />} />
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
