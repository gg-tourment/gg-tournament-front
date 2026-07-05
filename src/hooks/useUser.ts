import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyProfile, updateMyProfile } from '../api/user'

export const userKeys = {
  me: ['users', 'me'] as const,
}

export function useMyProfile() {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: getMyProfile,
  })
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (profile) => {
      queryClient.setQueryData(userKeys.me, profile)
    },
  })
}
