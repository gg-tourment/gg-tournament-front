import { Link, useSearchParams } from 'react-router-dom'

function PaymentFailPage() {
  const [searchParams] = useSearchParams()
  const message = searchParams.get('message') ?? '결제가 취소되었거나 실패했습니다'

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <h1 className="text-xl font-semibold text-red-600">결제에 실패했습니다</h1>
      <p className="text-sm text-gray-600">{message}</p>
      <Link to="/" className="text-sm text-blue-600 hover:underline">
        대회 목록으로
      </Link>
    </div>
  )
}

export default PaymentFailPage
