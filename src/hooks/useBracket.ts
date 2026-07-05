import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBracket, updateMatchResult } from '../api/bracket'
import type { UpdateMatchResultRequest } from '../types/bracket'

export const bracketKeys = {
  all: ['bracket'] as const,
  detail: (tournamentId: number) => [...bracketKeys.all, tournamentId] as const,
}

export function useBracket(tournamentId: number) {
  return useQuery({
    queryKey: bracketKeys.detail(tournamentId),
    queryFn: () => getBracket(tournamentId),
    enabled: !Number.isNaN(tournamentId),
  })
}

export function useUpdateMatchResultMutation(tournamentId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ matchId, ...payload }: { matchId: number } & UpdateMatchResultRequest) =>
      updateMatchResult(tournamentId, matchId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bracketKeys.detail(tournamentId) })
    },
  })
}
