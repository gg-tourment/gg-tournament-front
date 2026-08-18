import { useState } from 'react'
import Button from '../common/Button'
import { useMyPayments } from '../../hooks/usePayment'
import { getErrorMessage } from '../../lib/errors'
import type { PaymentHistoryStatus } from '../../types/payment'

const PAGE_SIZE = 10

const STATUS_LABEL: Record<PaymentHistoryStatus, string> = {
  DONE: '결제완료',
  CANCELED: '취소됨',
}

function PaymentHistorySection() {
  const [page, setPage] = useState(0)
  const { data, isPending, isError, error } = useMyPayments({ page, size: PAGE_SIZE })

  if (isPending) {
    return <p className="py-10 text-center text-gray-500">불러오는 중...</p>
  }

  if (isError) {
    return <p className="py-10 text-center text-red-600">{getErrorMessage(error)}</p>
  }

  if (data.content.length === 0) {
    return <p className="py-10 text-center text-gray-500">결제 내역이 없습니다.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="py-2 pr-4 font-medium">대회명</th>
              <th className="py-2 pr-4 font-medium">결제금액</th>
              <th className="py-2 pr-4 font-medium">상태</th>
              <th className="py-2 pr-4 font-medium">결제일시</th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-100 text-gray-900">
                <td className="py-2 pr-4">{payment.tournamentTitle}</td>
                <td className="py-2 pr-4">{payment.amount.toLocaleString()}원</td>
                <td className="py-2 pr-4">{STATUS_LABEL[payment.status]}</td>
                <td className="py-2 pr-4">{new Date(payment.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={data.page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            이전
          </Button>
          <span className="text-sm text-gray-600">
            {data.page + 1} / {data.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={!data.hasNext}
            onClick={() => setPage((p) => p + 1)}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  )
}

export default PaymentHistorySection
