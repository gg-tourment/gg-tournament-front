import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useConfirmPaymentMutation } from '../hooks/usePayment'
import { getErrorMessage } from '../lib/errors'

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams()
  const confirmMutation = useConfirmPaymentMutation()
  const hasRequestedConfirm = useRef(false)

  const paymentKey = searchParams.get('paymentKey') ?? ''
  const orderId = searchParams.get('orderId') ?? ''
  const amount = Number(searchParams.get('amount'))

  useEffect(() => {
    if (!hasRequestedConfirm.current && paymentKey && orderId) {
      hasRequestedConfirm.current = true
      confirmMutation.mutate({ paymentKey, orderId, amount })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentKey, orderId, amount])

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      {confirmMutation.isPending && <p className="text-gray-500">결제를 확인하는 중...</p>}

      {confirmMutation.isError && (
        <>
          <h1 className="text-xl font-semibold text-red-600">결제 승인에 실패했습니다</h1>
          <p className="text-sm text-gray-600">{getErrorMessage(confirmMutation.error)}</p>
        </>
      )}

      {confirmMutation.isSuccess && (
        <>
          <h1 className="text-xl font-semibold text-gray-900">참가 신청이 완료되었습니다</h1>
          <p className="text-sm text-gray-600">
            {confirmMutation.data.totalAmount.toLocaleString()}원 결제가 정상적으로 처리되었습니다.
          </p>
        </>
      )}

      <Link to="/" className="text-sm text-blue-600 hover:underline">
        대회 목록으로
      </Link>
    </div>
  )
}

export default PaymentSuccessPage
