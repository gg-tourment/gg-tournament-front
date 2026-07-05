import { apiClient } from './client'
import type { ApiSuccessResponse, PageResponse } from '../types/common'
import type { TournamentDetail, TournamentListParams, TournamentSummary } from '../types/tournament'

export async function getTournaments(params: TournamentListParams) {
  const { data } = await apiClient.get<ApiSuccessResponse<PageResponse<TournamentSummary>>>(
    '/tournaments',
    { params },
  )
  return data.data
}

export async function getTournament(id: number) {
  const { data } = await apiClient.get<ApiSuccessResponse<TournamentDetail>>(`/tournaments/${id}`)
  return data.data
}
