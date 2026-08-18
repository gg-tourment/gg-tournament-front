export interface PaymentResponse {
  id: number
  tournamentId: number
  userId: number
  orderId: string
  paymentKey: string | null
  amount: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED'
  paidAt: string | null
  refundedAt: string | null
}

export interface ConfirmPaymentRequest {
  paymentKey: string
  orderId: string
  amount: number
}

export type PaymentResult = PaymentResponse

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
