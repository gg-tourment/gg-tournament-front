import { useQuery } from '@tanstack/react-query'
import { getMySettlements } from '../api/settlement'
import type { SettlementListParams } from '../types/settlement'

export const settlementKeys = {
  all: ['settlements'] as const,
  myList: (params: SettlementListParams) => [...settlementKeys.all, 'my-list', params] as const,
}

export function useMySettlements(params: SettlementListParams) {
  return useQuery({
    queryKey: settlementKeys.myList(params),
    queryFn: () => getMySettlements(params),
  })
}
