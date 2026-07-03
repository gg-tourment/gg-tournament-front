import { createContext } from 'react'
import type { AuthTokens } from '../types/auth'

export interface AuthContextValue {
  isAuthenticated: boolean
  login: (tokens: AuthTokens) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
