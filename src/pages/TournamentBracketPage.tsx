import { Link, useParams } from 'react-router-dom'
import BracketMatchCard from '../components/bracket/BracketMatchCard'
import { useAuthContext } from '../hooks/useAuthContext'
import { useBracket, useUpdateMatchResultMutation } from '../hooks/useBracket'
import { getErrorMessage } from '../lib/errors'

function getRoundLabel(round: number, totalRounds: number) {
  const roundsFromEnd = totalRounds - round
  if (roundsFromEnd === 0) return '결승'
  if (roundsFromEnd === 1) return '준결승'
  return `${round}라운드`
}

function TournamentBracketPage() {
  const { id } = useParams<{ id: string }>()
  const tournamentId = Number(id)
  const { isAuthenticated } = useAuthContext()

  const { data: bracket, isPending, isError, error } = useBracket(tournamentId)
  const updateMatchMutation = useUpdateMatchResultMutation(tournamentId)

  if (isPending) {
    return <p className="py-10 text-center text-gray-500">불러오는 중...</p>
  }

  if (isError) {
    return <p className="py-10 text-center text-red-600">{getErrorMessage(error)}</p>
  }

  const matchesByRound = new Map<number, typeof bracket.matches>()
  for (const match of bracket.matches) {
    const roundMatches = matchesByRound.get(match.round) ?? []
    roundMatches.push(match)
    matchesByRound.set(match.round, roundMatches)
  }

  return (
    <div className="flex flex-col gap-6">
      <Link to={`/tournaments/${tournamentId}`} className="text-sm text-gray-500 hover:text-gray-700">
        ← 대회 상세로
      </Link>

      <h1 className="text-2xl font-semibold text-gray-900">대진표</h1>

      {updateMatchMutation.isError && (
        <p className="text-sm text-red-600">{getErrorMessage(updateMatchMutation.error)}</p>
      )}

      <div className="flex gap-8 overflow-x-auto pb-4">
        {Array.from({ length: bracket.totalRounds }, (_, i) => i + 1).map((round) => (
          <div key={round} className="flex flex-col gap-6">
            <h2 className="text-sm font-medium text-gray-500">
              {getRoundLabel(round, bracket.totalRounds)}
            </h2>
            <div className="flex flex-col justify-around gap-6">
              {(matchesByRound.get(round) ?? [])
                .sort((a, b) => a.position - b.position)
                .map((match) => (
                  <BracketMatchCard
                    key={match.id}
                    match={match}
                    editable={isAuthenticated}
                    isSaving={
                      updateMatchMutation.isPending &&
                      updateMatchMutation.variables?.matchId === match.id
                    }
                    onSave={(team1Score, team2Score) =>
                      updateMatchMutation.mutate({ matchId: match.id, team1Score, team2Score })
                    }
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TournamentBracketPage
