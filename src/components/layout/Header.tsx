import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

function Header() {
  const authed = isAuthenticated()

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold text-gray-900">
          GG Tournament
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-700">
          <Link to="/tournaments/new">대회 생성</Link>
          {authed ? (
            <Link to="/my">내 정보</Link>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
