import { apiClient } from './client'
import type { ApiSuccessResponse } from '../types/common'
import type { UpdateProfileRequest, UserProfile } from '../types/user'

export async function getMyProfile() {
  const { data } = await apiClient.get<ApiSuccessResponse<UserProfile>>('/users/me')
  return data.data
}

export async function updateMyProfile(payload: UpdateProfileRequest) {
  const { data } = await apiClient.patch<ApiSuccessResponse<UserProfile>>('/users/me', payload)
  return data.data
}
