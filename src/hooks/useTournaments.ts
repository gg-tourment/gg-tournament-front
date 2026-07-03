import { useQuery } from '@tanstack/react-query'
import { getTournaments } from '../api/tournament'
import type { TournamentListParams } from '../types/tournament'

export const tournamentKeys = {
  all: ['tournaments'] as const,
  list: (params: TournamentListParams) => [...tournamentKeys.all, 'list', params] as const,
}

export function useTournaments(params: TournamentListParams) {
  return useQuery({
    queryKey: tournamentKeys.list(params),
    queryFn: () => getTournaments(params),
  })
}
