export interface ApiSuccessResponse<T> {
  success: true
  data: T
  message: string
}

export interface ApiErrorResponse {
  success: false
  code: string
  message: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
}
