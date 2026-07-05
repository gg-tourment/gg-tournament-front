import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import LoginPage from '../pages/LoginPage'
import MyPage from '../pages/MyPage'
import NotFoundPage from '../pages/NotFoundPage'
import PaymentFailPage from '../pages/PaymentFailPage'
import PaymentSuccessPage from '../pages/PaymentSuccessPage'
import SignupPage from '../pages/SignupPage'
import TournamentBracketPage from '../pages/TournamentBracketPage'
import TournamentCreatePage from '../pages/TournamentCreatePage'
import TournamentDetailPage from '../pages/TournamentDetailPage'
import TournamentListPage from '../pages/TournamentListPage'
import TournamentPaymentPage from '../pages/TournamentPaymentPage'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <TournamentListPage /> },
      { path: 'tournaments/:id', element: <TournamentDetailPage /> },
      { path: 'tournaments/:id/bracket', element: <TournamentBracketPage /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'tournaments/new', element: <TournamentCreatePage /> },
          { path: 'tournaments/:id/payment', element: <TournamentPaymentPage /> },
          { path: 'my', element: <MyPage /> },
        ],
      },
      { path: 'payments/success', element: <PaymentSuccessPage /> },
      { path: 'payments/fail', element: <PaymentFailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
