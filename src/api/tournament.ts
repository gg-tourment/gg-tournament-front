import { apiClient } from './client'
import type { ApiSuccessResponse, PageResponse } from '../types/common'
import type { TournamentListParams, TournamentSummary } from '../types/tournament'

export async function getTournaments(params: TournamentListParams) {
  const { data } = await apiClient.get<ApiSuccessResponse<PageResponse<TournamentSummary>>>(
    '/tournaments',
    { params },
  )
  return data.data
}
