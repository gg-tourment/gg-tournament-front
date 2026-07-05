import { useMutation, useQuery } from '@tanstack/react-query'
import { confirmPayment, createTournamentOrder, getMyPayments } from '../api/payment'
import type { PaymentHistoryParams } from '../types/payment'

export const paymentKeys = {
  all: ['payments'] as const,
  myList: (params: PaymentHistoryParams) => [...paymentKeys.all, 'my-list', params] as const,
}

export function useCreateTournamentOrderMutation() {
  return useMutation({
    mutationFn: createTournamentOrder,
  })
}

export function useConfirmPaymentMutation() {
  return useMutation({
    mutationFn: confirmPayment,
  })
}

export function useMyPayments(params: PaymentHistoryParams) {
  return useQuery({
    queryKey: paymentKeys.myList(params),
    queryFn: () => getMyPayments(params),
  })
}
