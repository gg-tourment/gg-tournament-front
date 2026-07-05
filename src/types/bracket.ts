export type MatchStatus = 'SCHEDULED' | 'COMPLETED'

export interface BracketTeam {
  id: number
  name: string
}

export interface BracketMatch {
  id: number
  round: number
  position: number
  team1: BracketTeam | null
  team2: BracketTeam | null
  team1Score: number | null
  team2Score: number | null
  winnerTeamId: number | null
  status: MatchStatus
}

export interface Bracket {
  tournamentId: number
  totalRounds: number
  matches: BracketMatch[]
}

export interface UpdateMatchResultRequest {
  team1Score: number
  team2Score: number
}
