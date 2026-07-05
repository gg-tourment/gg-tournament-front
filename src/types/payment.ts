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
