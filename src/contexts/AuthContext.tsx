import { useEffect, useState, type ReactNode } from 'react'
import { clearTokens, getAccessToken, setAccessToken, setRefreshToken } from '../lib/auth'
import type { AuthTokens } from '../types/auth'
import { AuthContext } from './authContextStore'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => getAccessToken() !== null)

  useEffect(() => {
    function handleUnauthorized() {
      setIsAuthenticated(false)
    }
    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized)
  }, [])

  function login(tokens: AuthTokens) {
    setAccessToken(tokens.accessToken)
    setRefreshToken(tokens.refreshToken)
    setIsAuthenticated(true)
  }

  function logout() {
    clearTokens()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
