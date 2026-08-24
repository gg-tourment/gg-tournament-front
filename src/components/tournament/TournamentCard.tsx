import { Link } from 'react-router-dom'
import type { TournamentSummary } from '../../types/tournament'
import { STATUS_COLOR, STATUS_LABEL } from './tournamentStatus'

interface TournamentCardProps {
  tournament: TournamentSummary
}

function TournamentCard({ tournament }: TournamentCardProps) {
  const entryFee = tournament.entryFee ?? 0
  const prizePool = tournament.prizePool ?? 0

  return (
    <Link
      to={`/tournaments/${tournament.id}`}
      className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-400"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{tournament.gameType}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLOR[tournament.status]}`}>
          {STATUS_LABEL[tournament.status]}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900">{tournament.title}</h2>
      <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm text-gray-600">
        <dt>참가자</dt>
        <dd>
          {tournament.currentParticipants} / {tournament.maxParticipants}
        </dd>
        <dt>참가비</dt>
        <dd>{entryFee.toLocaleString()}원</dd>
        <dt>상금</dt>
        <dd>{prizePool.toLocaleString()}원</dd>
        <dt>마감</dt>
        <dd>{new Date(tournament.registrationDeadline).toLocaleDateString()}</dd>
      </dl>
    </Link>
  )
}

export default TournamentCard
