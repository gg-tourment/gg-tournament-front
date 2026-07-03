import { useMutation } from '@tanstack/react-query'
import { login, logout as logoutApi, signup } from '../api/auth'
import { useAuthContext } from './useAuthContext'

export function useLoginMutation() {
  const { login: setAuth } = useAuthContext()
  return useMutation({
    mutationFn: login,
    onSuccess: setAuth,
  })
}

export function useSignupMutation() {
  return useMutation({
    mutationFn: signup,
  })
}

export function useLogoutMutation() {
  const { logout: clearAuth } = useAuthContext()
  return useMutation({
    mutationFn: logoutApi,
    onSettled: clearAuth,
  })
}
