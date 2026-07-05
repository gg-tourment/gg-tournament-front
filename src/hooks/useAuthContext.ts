import { useContext } from 'react'
import { AuthContext } from '../contexts/authContextStore'

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuthContext는 AuthProvider 내부에서 사용해야 합니다')
  }
  return ctx
}
