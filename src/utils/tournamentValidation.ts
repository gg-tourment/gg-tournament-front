export type TournamentScheduleField = 'registrationDeadline' | 'startAt' | 'endAt'

export interface TournamentScheduleError {
  field: TournamentScheduleField
  message: string
}

export function validateTournamentSchedule(
  registrationDeadline: string,
  startAt: string,
  endAt: string,
  now = new Date(),
): TournamentScheduleError | null {
  const deadline = new Date(registrationDeadline)
  const start = new Date(startAt)
  const end = new Date(endAt)

  if ([deadline, start, end].some((date) => Number.isNaN(date.getTime()))) {
    return { field: 'registrationDeadline', message: '대회 일정을 모두 입력해주세요.' }
  }

  if (deadline <= now) {
    return { field: 'registrationDeadline', message: '참가 신청 마감일은 현재보다 늦어야 합니다.' }
  }

  if (deadline >= start) {
    return { field: 'startAt', message: '대회 시작일은 참가 신청 마감일보다 늦어야 합니다.' }
  }

  if (start >= end) {
    return { field: 'endAt', message: '대회 종료일은 대회 시작일보다 늦어야 합니다.' }
  }

  return null
}

export function toDateTimeLocalValue(date: Date) {
  const timezoneOffset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16)
}
