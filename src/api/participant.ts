import { apiClient } from './client'
import type { ApiSuccessResponse } from '../types/common'
import type { Participant } from '../types/participant'

export async function joinTournament(tournamentId: number) {
  const { data } = await apiClient.post<ApiSuccessResponse<Participant>>(
    `/tournaments/${tournamentId}/participants`,
  )
  return data.data
}
