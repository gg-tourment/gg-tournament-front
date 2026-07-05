import { useMutation } from '@tanstack/react-query'
import { confirmPayment, createTournamentOrder } from '../api/payment'

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
