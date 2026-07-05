import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useCreateTournamentMutation } from '../hooks/useTournaments'
import { getErrorMessage } from '../lib/errors'
import type { TournamentFormat } from '../types/tournament'

const FORMAT_OPTIONS: { value: TournamentFormat; label: string }[] = [
  { value: 'SINGLE_ELIMINATION', label: '싱글 엘리미네이션' },
  { value: 'DOUBLE_ELIMINATION', label: '더블 엘리미네이션' },
  { value: 'LEAGUE', label: '리그' },
]

function TournamentCreatePage() {
  const navigate = useNavigate()
  const createMutation = useCreateTournamentMutation()

  const [title, setTitle] = useState('')
  const [gameType, setGameType] = useState('')
  const [format, setFormat] = useState<TournamentFormat>('SINGLE_ELIMINATION')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [entryFee, setEntryFee] = useState('')
  const [prizePool, setPrizePool] = useState('')
  const [registrationDeadline, setRegistrationDeadline] = useState('')
  const [startAt, setStartAt] = useState('')
  const [endAt, setEndAt] = useState('')
  const [description, setDescription] = useState('')
  const [rules, setRules] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    createMutation.mutate(
      {
        title,
        gameType,
        format,
        maxParticipants: Number(maxParticipants),
        entryFee: Number(entryFee),
        prizePool: Number(prizePool),
        registrationDeadline,
        startAt,
        endAt,
        description,
        rules,
      },
      {
        onSuccess: (tournament) => {
          navigate(`/tournaments/${tournament.id}`)
        },
      },
    )
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">대회 생성</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="대회 이름" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Input label="게임 종류" value={gameType} onChange={(e) => setGameType(e.target.value)} required />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">경기 방식</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as TournamentFormat)}
            className="h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900"
          >
            {FORMAT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="최대 참가자 수"
            type="number"
            min={1}
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            required
          />
          <Input
            label="참가비"
            type="number"
            min={0}
            value={entryFee}
            onChange={(e) => setEntryFee(e.target.value)}
            required
          />
          <Input
            label="상금"
            type="number"
            min={0}
            value={prizePool}
            onChange={(e) => setPrizePool(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="참가 신청 마감"
            type="datetime-local"
            value={registrationDeadline}
            onChange={(e) => setRegistrationDeadline(e.target.value)}
            required
          />
          <Input
            label="대회 시작"
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            required
          />
          <Input
            label="대회 종료"
            type="datetime-local"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">대회 소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">대회 규칙</label>
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            rows={4}
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {createMutation.isError && (
          <p className="text-sm text-red-600">{getErrorMessage(createMutation.error)}</p>
        )}

        <Button type="submit" loading={createMutation.isPending} className="w-full">
          대회 생성
        </Button>
      </form>
    </div>
  )
}

export default TournamentCreatePage
