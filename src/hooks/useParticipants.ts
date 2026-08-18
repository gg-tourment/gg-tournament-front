import { useMutation, useQueryClient } from '@tanstack/react-query'
import { joinTournament } from '../api/participant'
import { tournamentKeys } from './useTournaments'

export function useJoinTournamentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: joinTournament,
    onSuccess: (_, tournamentId) => {
      queryClient.invalidateQueries({ queryKey: tournamentKeys.detail(tournamentId) })
      queryClient.invalidateQueries({ queryKey: tournamentKeys.all })
    },
  })
}
