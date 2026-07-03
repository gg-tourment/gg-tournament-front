import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import TournamentCard from '../components/tournament/TournamentCard'
import { useTournaments } from '../hooks/useTournaments'
import { getErrorMessage } from '../lib/errors'
import type { TournamentFormat, TournamentListParams, TournamentStatus } from '../types/tournament'

const PAGE_SIZE = 12

const FORMAT_OPTIONS: { value: TournamentFormat | ''; label: string }[] = [
  { value: '', label: '전체 방식' },
  { value: 'SINGLE_ELIMINATION', label: '싱글 엘리미네이션' },
  { value: 'DOUBLE_ELIMINATION', label: '더블 엘리미네이션' },
  { value: 'LEAGUE', label: '리그' },
]

const STATUS_OPTIONS: { value: TournamentStatus | ''; label: string }[] = [
  { value: '', label: '전체 상태' },
  { value: 'RECRUITING', label: '모집중' },
  { value: 'CLOSED', label: '모집마감' },
  { value: 'IN_PROGRESS', label: '진행중' },
  { value: 'FINISHED', label: '종료' },
  { value: 'CANCELLED', label: '취소' },
]

function TournamentListPage() {
  const [keyword, setKeyword] = useState('')
  const [format, setFormat] = useState<TournamentFormat | ''>('')
  const [status, setStatus] = useState<TournamentStatus | ''>('')
  const [params, setParams] = useState<TournamentListParams>({ page: 0, size: PAGE_SIZE })

  const { data, isPending, isError, error } = useTournaments(params)

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setParams({
      page: 0,
      size: PAGE_SIZE,
      keyword: keyword || undefined,
      format: format || undefined,
      status: status || undefined,
    })
  }

  function goToPage(page: number) {
    setParams((prev) => ({ ...prev, page }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">대회 목록</h1>
        <Link to="/tournaments/new">
          <Button>대회 생성</Button>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-3">
        <Input
          label="검색어"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="대회 이름 검색"
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">경기 방식</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as TournamentFormat | '')}
            className="h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900"
          >
            {FORMAT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">상태</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TournamentStatus | '')}
            className="h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">검색</Button>
      </form>

      {isPending && <p className="py-10 text-center text-gray-500">불러오는 중...</p>}
      {isError && <p className="py-10 text-center text-red-600">{getErrorMessage(error)}</p>}

      {data && (
        <>
          {data.content.length === 0 ? (
            <p className="py-10 text-center text-gray-500">조건에 맞는 대회가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.content.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          )}

          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={data.first}
                onClick={() => goToPage(data.number - 1)}
              >
                이전
              </Button>
              <span className="text-sm text-gray-600">
                {data.number + 1} / {data.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={data.last}
                onClick={() => goToPage(data.number + 1)}
              >
                다음
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TournamentListPage
