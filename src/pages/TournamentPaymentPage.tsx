import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import TossPaymentWidget from '../components/payment/TossPaymentWidget'
import { useCreateTournamentOrderMutation } from '../hooks/usePayment'
import { useTournament } from '../hooks/useTournaments'
import { getErrorMessage } from '../lib/errors'

function TournamentPaymentPage() {
  const { id } = useParams<{ id: string }>()
  const tournamentId = Number(id)

  const {
    data: tournament,
    isPending: isTournamentPending,
    isError: isTournamentError,
    error: tournamentError,
  } = useTournament(tournamentId)
  const orderMutation = useCreateTournamentOrderMutation()
  const hasRequestedOrder = useRef(false)

  useEffect(() => {
    if (tournament && tournament.entryFee > 0 && !hasRequestedOrder.current) {
      hasRequestedOrder.current = true
      orderMutation.mutate(tournamentId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournament])

  if (isTournamentPending) {
    return <p className="py-10 text-center text-gray-500">결제 정보를 준비하는 중...</p>
  }

  if (isTournamentError) {
    return (
      <p className="py-10 text-center text-red-600">
        {getErrorMessage(tournamentError, '대회 정보를 불러오지 못했습니다')}
      </p>
    )
  }

  if (tournament?.entryFee === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-gray-700">무료 대회는 결제 없이 참가할 수 있습니다.</p>
        <Link to={`/tournaments/${tournament.id}`} className="text-sm text-blue-600 hover:underline">
          대회 상세에서 참가 신청하기
        </Link>
      </div>
    )
  }

  if (orderMutation.isPending || orderMutation.isIdle) {
    return <p className="py-10 text-center text-gray-500">결제 정보를 준비하는 중...</p>
  }

  if (orderMutation.isError) {
    return (
      <p className="py-10 text-center text-red-600">
        {getErrorMessage(orderMutation.error, '주문 생성에 실패했습니다')}
      </p>
    )
  }

  if (!tournament || !orderMutation.data) {
    return null
  }

  const order = orderMutation.data

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 py-10">
      <Link to={`/tournaments/${tournament.id}`} className="text-sm text-gray-500 hover:text-gray-700">
        ← 대회 상세로
      </Link>

      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-gray-900">참가 신청 결제</h1>
        <p className="text-sm text-gray-600">{tournament.title}</p>
      </div>

      <TossPaymentWidget
        orderId={order.orderId}
        orderName={`${tournament.title} 참가비`}
        amount={order.amount}
        customerKey={`user-${order.userId}`}
        successUrl={`${window.location.origin}/payments/success`}
        failUrl={`${window.location.origin}/payments/fail`}
      />
    </div>
  )
}

export default TournamentPaymentPage
