export type SettlementStatus = 'PENDING' | 'COMPLETED'

export interface SettlementHistoryItem {
  id: number
  tournamentId: number
  tournamentTitle: string
  totalEntryFee: number
  feeAmount: number
  settlementAmount: number
  status: SettlementStatus
  settledAt: string | null
}

export interface SettlementListParams {
  page?: number
  size?: number
}
