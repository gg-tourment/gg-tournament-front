import { useState } from 'react'
import Button from '../common/Button'
import { useMySettlements } from '../../hooks/useSettlements'
import { getErrorMessage } from '../../lib/errors'
import type { SettlementStatus } from '../../types/settlement'

const PAGE_SIZE = 10

const STATUS_LABEL: Record<SettlementStatus, string> = {
  PENDING: '정산예정',
  COMPLETED: '지급완료',
}

function SettlementHistorySection() {
  const [page, setPage] = useState(0)
  const { data, isPending, isError, error } = useMySettlements({ page, size: PAGE_SIZE })

  if (isPending) {
    return <p className="py-10 text-center text-gray-500">불러오는 중...</p>
  }

  if (isError) {
    return <p className="py-10 text-center text-red-600">{getErrorMessage(error)}</p>
  }

  if (data.content.length === 0) {
    return <p className="py-10 text-center text-gray-500">정산 내역이 없습니다.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="py-2 pr-4 font-medium">대회명</th>
              <th className="py-2 pr-4 font-medium">총 참가비</th>
              <th className="py-2 pr-4 font-medium">수수료</th>
              <th className="py-2 pr-4 font-medium">정산금액</th>
              <th className="py-2 pr-4 font-medium">상태</th>
              <th className="py-2 pr-4 font-medium">지급일시</th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((settlement) => (
              <tr key={settlement.id} className="border-b border-gray-100 text-gray-900">
                <td className="py-2 pr-4">{settlement.tournamentTitle}</td>
                <td className="py-2 pr-4">{settlement.totalEntryFee.toLocaleString()}원</td>
                <td className="py-2 pr-4">{settlement.feeAmount.toLocaleString()}원</td>
                <td className="py-2 pr-4">{settlement.settlementAmount.toLocaleString()}원</td>
                <td className="py-2 pr-4">{STATUS_LABEL[settlement.status]}</td>
                <td className="py-2 pr-4">
                  {settlement.settledAt ? new Date(settlement.settledAt).toLocaleString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={data.first} onClick={() => setPage((p) => p - 1)}>
            이전
          </Button>
          <span className="text-sm text-gray-600">
            {data.number + 1} / {data.totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={data.last} onClick={() => setPage((p) => p + 1)}>
            다음
          </Button>
        </div>
      )}
    </div>
  )
}

export default SettlementHistorySection
