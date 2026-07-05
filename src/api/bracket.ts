import { apiClient } from './client'
import type { ApiSuccessResponse } from '../types/common'
import type { Bracket, BracketMatch, UpdateMatchResultRequest } from '../types/bracket'

export async function getBracket(tournamentId: number) {
  const { data } = await apiClient.get<ApiSuccessResponse<Bracket>>(`/tournaments/${tournamentId}/bracket`)
  return data.data
}

export async function updateMatchResult(
  tournamentId: number,
  matchId: number,
  payload: UpdateMatchResultRequest,
) {
  const { data } = await apiClient.put<ApiSuccessResponse<BracketMatch>>(
    `/tournaments/${tournamentId}/matches/${matchId}/result`,
    payload,
  )
  return data.data
}
