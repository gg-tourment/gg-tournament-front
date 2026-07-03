import { Link } from 'react-router-dom'
import type { TournamentSummary } from '../../types/tournament'

const STATUS_LABEL: Record<TournamentSummary['status'], string> = {
  RECRUITING: '모집중',
  CLOSED: '모집마감',
  IN_PROGRESS: '진행중',
  FINISHED: '종료',
  CANCELLED: '취소',
}

const STATUS_COLOR: Record<TournamentSummary['status'], string> = {
  RECRUITING: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  FINISHED: 'bg-gray-100 text-gray-500',
  CANCELLED: 'bg-red-100 text-red-700',
}

interface TournamentCardProps {
  tournament: TournamentSummary
}

function TournamentCard({ tournament }: TournamentCardProps) {
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
        <dd>{tournament.entryFee.toLocaleString()}원</dd>
        <dt>상금</dt>
        <dd>{tournament.prizePool.toLocaleString()}원</dd>
        <dt>마감</dt>
        <dd>{new Date(tournament.registrationDeadline).toLocaleDateString()}</dd>
      </dl>
    </Link>
  )
}

export default TournamentCard
