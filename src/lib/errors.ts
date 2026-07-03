import { isAxiosError } from 'axios'
import type { ApiErrorResponse } from '../types/common'

export function getErrorMessage(error: unknown, fallback = '알 수 없는 오류가 발생했습니다') {
  if (isAxiosError<ApiErrorResponse>(error) && error.response?.data?.message) {
    return error.response.data.message
  }
  return fallback
}
