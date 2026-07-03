import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useLoginMutation } from '../hooks/useAuth'
import { getErrorMessage } from '../lib/errors'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLoginMutation()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/'
          navigate(from, { replace: true })
        },
      },
    )
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-16">
      <h1 className="text-2xl font-semibold text-gray-900">로그인</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {loginMutation.isError && (
          <p className="text-sm text-red-600">{getErrorMessage(loginMutation.error)}</p>
        )}
        <Button type="submit" loading={loginMutation.isPending} className="w-full">
          로그인
        </Button>
      </form>
      <p className="text-sm text-gray-500">
        계정이 없으신가요?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
