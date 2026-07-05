import { Link, useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import { STATUS_COLOR, STATUS_LABEL } from '../components/tournament/tournamentStatus'
import { useTournament } from '../hooks/useTournaments'
import { getErrorMessage } from '../lib/errors'

function TournamentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const tournamentId = Number(id)

  const { data: tournament, isPending, isError, error } = useTournament(tournamentId)

  if (isPending) {
    return <p className="py-10 text-center text-gray-500">불러오는 중...</p>
  }

  if (isError) {
    return <p className="py-10 text-center text-red-600">{getErrorMessage(error)}</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
        ← 목록으로
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{tournament.gameType}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLOR[tournament.status]}`}
          >
            {STATUS_LABEL[tournament.status]}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">{tournament.title}</h1>
          {tournament.status === 'RECRUITING' && (
            <Link to={`/tournaments/${tournament.id}/payment`}>
              <Button>참가 신청</Button>
            </Link>
          )}
          {(tournament.status === 'IN_PROGRESS' || tournament.status === 'FINISHED') && (
            <Link to={`/tournaments/${tournament.id}/bracket`}>
              <Button variant="outline">대진표 보기</Button>
            </Link>
          )}
        </div>
        <p className="text-sm text-gray-600">주최자: {tournament.organizerName}</p>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border border-gray-200 p-4 text-sm sm:grid-cols-4">
        <dt className="text-gray-500">경기 방식</dt>
        <dd className="text-gray-900">{tournament.format}</dd>
        <dt className="text-gray-500">참가자</dt>
        <dd className="text-gray-900">
          {tournament.currentParticipants} / {tournament.maxParticipants}
        </dd>
        <dt className="text-gray-500">참가비</dt>
        <dd className="text-gray-900">{tournament.entryFee.toLocaleString()}원</dd>
        <dt className="text-gray-500">상금</dt>
        <dd className="text-gray-900">{tournament.prizePool.toLocaleString()}원</dd>
        <dt className="text-gray-500">참가 신청 마감</dt>
        <dd className="text-gray-900">{new Date(tournament.registrationDeadline).toLocaleString()}</dd>
        <dt className="text-gray-500">대회 시작</dt>
        <dd className="text-gray-900">{new Date(tournament.startAt).toLocaleString()}</dd>
        <dt className="text-gray-500">대회 종료</dt>
        <dd className="text-gray-900">{new Date(tournament.endAt).toLocaleString()}</dd>
      </dl>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900">대회 소개</h2>
        <p className="whitespace-pre-line text-sm text-gray-700">{tournament.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900">대회 규칙</h2>
        <p className="whitespace-pre-line text-sm text-gray-700">{tournament.rules}</p>
      </div>
    </div>
  )
}

export default TournamentDetailPage
