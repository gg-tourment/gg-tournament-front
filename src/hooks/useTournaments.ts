import { useQuery } from '@tanstack/react-query'
import { getTournament, getTournaments } from '../api/tournament'
import type { TournamentListParams } from '../types/tournament'

export const tournamentKeys = {
  all: ['tournaments'] as const,
  list: (params: TournamentListParams) => [...tournamentKeys.all, 'list', params] as const,
  detail: (id: number) => [...tournamentKeys.all, 'detail', id] as const,
}

export function useTournaments(params: TournamentListParams) {
  return useQuery({
    queryKey: tournamentKeys.list(params),
    queryFn: () => getTournaments(params),
  })
}

export function useTournament(id: number) {
  return useQuery({
    queryKey: tournamentKeys.detail(id),
    queryFn: () => getTournament(id),
    enabled: !Number.isNaN(id),
  })
}
