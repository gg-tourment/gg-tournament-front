import { useState, type FormEvent } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import { useMyProfile, useUpdateProfileMutation } from '../../hooks/useUser'
import { getErrorMessage } from '../../lib/errors'
import type { UserProfile } from '../../types/user'

function ProfileSection() {
  const { data: profile, isPending, isError, error } = useMyProfile()

  if (isPending) {
    return <p className="py-10 text-center text-gray-500">불러오는 중...</p>
  }

  if (isError) {
    return <p className="py-10 text-center text-red-600">{getErrorMessage(error)}</p>
  }

  return <ProfileForm profile={profile} />
}

interface ProfileFormProps {
  profile: UserProfile
}

function ProfileForm({ profile }: ProfileFormProps) {
  const updateProfileMutation = useUpdateProfileMutation()
  const [nickname, setNickname] = useState(profile.nickname)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updateProfileMutation.mutate({ nickname })
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-4">
      <Input label="이메일" value={profile.email} disabled />
      <Input label="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} required />

      {updateProfileMutation.isError && (
        <p className="text-sm text-red-600">{getErrorMessage(updateProfileMutation.error)}</p>
      )}
      {updateProfileMutation.isSuccess && <p className="text-sm text-green-600">저장되었습니다</p>}

      <Button type="submit" loading={updateProfileMutation.isPending} className="w-fit">
        저장
      </Button>
    </form>
  )
}

export default ProfileSection
