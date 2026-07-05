export type TournamentStatus = 'RECRUITING' | 'CLOSED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED'
export type TournamentFormat = 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'LEAGUE'

export interface TournamentSummary {
  id: number
  title: string
  gameType: string
  format: TournamentFormat
  maxParticipants: number
  currentParticipants: number
  entryFee: number
  prizePool: number
  status: TournamentStatus
  registrationDeadline: string
  startAt: string
}

export interface TournamentListParams {
  keyword?: string
  gameType?: string
  format?: TournamentFormat
  status?: TournamentStatus
  page?: number
  size?: number
}

export interface TournamentDetail extends TournamentSummary {
  description: string
  rules: string
  organizerName: string
  endAt: string
  createdAt: string
}

export interface TournamentCreateRequest {
  title: string
  description: string
  rules: string
  gameType: string
  format: TournamentFormat
  maxParticipants: number
  entryFee: number
  prizePool: number
  registrationDeadline: string
  startAt: string
  endAt: string
}
