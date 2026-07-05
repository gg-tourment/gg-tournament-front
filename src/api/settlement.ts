import { apiClient } from './client'
import type { ApiSuccessResponse, PageResponse } from '../types/common'
import type { SettlementHistoryItem, SettlementListParams } from '../types/settlement'

export async function getMySettlements(params: SettlementListParams) {
  const { data } = await apiClient.get<ApiSuccessResponse<PageResponse<SettlementHistoryItem>>>(
    '/users/me/settlements',
    { params },
  )
  return data.data
}
