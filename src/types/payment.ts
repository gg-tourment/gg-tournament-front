export interface TournamentOrder {
  orderId: string
  orderName: string
  amount: number
  customerKey: string
}

export interface ConfirmPaymentRequest {
  paymentKey: string
  orderId: string
  amount: number
}

export interface PaymentResult {
  paymentKey: string
  orderId: string
  orderName: string
  totalAmount: number
  status: string
  approvedAt: string
}

export type PaymentHistoryStatus = 'DONE' | 'CANCELED'

export interface PaymentHistoryItem {
  id: number
  tournamentId: number
  tournamentTitle: string
  amount: number
  status: PaymentHistoryStatus
  paidAt: string
}

export interface PaymentHistoryParams {
  page?: number
  size?: number
}
