import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import SignupPage from '../pages/SignupPage'
import TournamentCreatePage from '../pages/TournamentCreatePage'
import TournamentDetailPage from '../pages/TournamentDetailPage'
import TournamentListPage from '../pages/TournamentListPage'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <TournamentListPage /> },
      { path: 'tournaments/:id', element: <TournamentDetailPage /> },
      {
        element: <PrivateRoute />,
        children: [{ path: 'tournaments/new', element: <TournamentCreatePage /> }],
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
