import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useSignupMutation } from '../hooks/useAuth'
import { getErrorMessage } from '../lib/errors'

function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const signupMutation = useSignupMutation()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    signupMutation.mutate(
      { email, password, nickname },
      {
        onSuccess: () => {
          navigate('/login', { replace: true })
        },
      },
    )
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-16">
      <h1 className="text-2xl font-semibold text-gray-900">회원가입</h1>
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
          label="닉네임"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          autoComplete="nickname"
          required
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
        {signupMutation.isError && (
          <p className="text-sm text-red-600">{getErrorMessage(signupMutation.error)}</p>
        )}
        <Button type="submit" loading={signupMutation.isPending} className="w-full">
          회원가입
        </Button>
      </form>
      <p className="text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          로그인
        </Link>
      </p>
    </div>
  )
}

export default SignupPage
