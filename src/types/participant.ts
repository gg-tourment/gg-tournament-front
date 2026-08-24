export type ParticipantStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'

export interface Participant {
  id: number
  tournamentId: number
  userId: number
  nickname: string
  status: ParticipantStatus
  joinedAt: string
}
