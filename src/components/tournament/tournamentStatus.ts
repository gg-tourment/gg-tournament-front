import type { TournamentStatus } from '../../types/tournament'

export const STATUS_LABEL: Record<TournamentStatus, string> = {
  RECRUITING: '모집중',
  CLOSED: '모집마감',
  IN_PROGRESS: '진행중',
  FINISHED: '종료',
  CANCELLED: '취소',
}

export const STATUS_COLOR: Record<TournamentStatus, string> = {
  RECRUITING: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  FINISHED: 'bg-gray-100 text-gray-500',
  CANCELLED: 'bg-red-100 text-red-700',
}
