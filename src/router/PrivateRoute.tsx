import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

function PrivateRoute() {
  const { isAuthenticated } = useAuthContext()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default PrivateRoute
