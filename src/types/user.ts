export interface UserProfile {
  id: number
  email: string
  nickname: string
  createdAt: string
}

export interface UpdateProfileRequest {
  nickname: string
}
