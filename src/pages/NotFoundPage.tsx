import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-3xl font-semibold text-gray-900">404</h1>
      <p className="text-gray-500">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        홈으로 이동
      </Link>
    </div>
  )
}

export default NotFoundPage
