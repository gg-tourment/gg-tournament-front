import { apiClient } from './client'
import type { ApiSuccessResponse } from '../types/common'
import type { AuthTokens, LoginRequest, SignupRequest } from '../types/auth'

export async function login(payload: LoginRequest) {
  const { data } = await apiClient.post<ApiSuccessResponse<AuthTokens>>('/auth/login', payload)
  return data.data
}

export async function signup(payload: SignupRequest) {
  await apiClient.post<ApiSuccessResponse<null>>('/auth/signup', payload)
}

export async function logout() {
  await apiClient.post('/auth/logout')
}
