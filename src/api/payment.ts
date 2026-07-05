import { apiClient } from './client'
import type { ApiSuccessResponse, PageResponse } from '../types/common'
import type {
  ConfirmPaymentRequest,
  PaymentHistoryItem,
  PaymentHistoryParams,
  PaymentResult,
  TournamentOrder,
} from '../types/payment'

export async function createTournamentOrder(tournamentId: number) {
  const { data } = await apiClient.post<ApiSuccessResponse<TournamentOrder>>(
    `/tournaments/${tournamentId}/orders`,
  )
  return data.data
}

export async function confirmPayment(payload: ConfirmPaymentRequest) {
  const { data } = await apiClient.post<ApiSuccessResponse<PaymentResult>>('/payments/confirm', payload)
  return data.data
}

export async function getMyPayments(params: PaymentHistoryParams) {
  const { data } = await apiClient.get<ApiSuccessResponse<PageResponse<PaymentHistoryItem>>>(
    '/users/me/payments',
    { params },
  )
  return data.data
}
