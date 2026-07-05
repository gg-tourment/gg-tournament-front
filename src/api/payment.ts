import { apiClient } from './client'
import type { ApiSuccessResponse } from '../types/common'
import type { ConfirmPaymentRequest, PaymentResult, TournamentOrder } from '../types/payment'

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
