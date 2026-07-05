import { useState } from 'react'
import Button from '../common/Button'
import type { BracketMatch } from '../../types/bracket'

interface BracketMatchCardProps {
  match: BracketMatch
  editable: boolean
  onSave: (team1Score: number, team2Score: number) => void
  isSaving: boolean
}

function BracketMatchCard({ match, editable, onSave, isSaving }: BracketMatchCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [team1Score, setTeam1Score] = useState(String(match.team1Score ?? 0))
  const [team2Score, setTeam2Score] = useState(String(match.team2Score ?? 0))

  const canEnterResult = editable && match.team1 !== null && match.team2 !== null

  function startEditing() {
    setTeam1Score(String(match.team1Score ?? 0))
    setTeam2Score(String(match.team2Score ?? 0))
    setIsEditing(true)
  }

  function handleSave() {
    onSave(Number(team1Score), Number(team2Score))
    setIsEditing(false)
  }

  return (
    <div className="flex w-56 flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3 text-sm">
      {[
        { team: match.team1, score: match.team1Score },
        { team: match.team2, score: match.team2Score },
      ].map((slot, index) => (
        <div
          key={index}
          className={`flex items-center justify-between gap-2 ${
            match.status === 'COMPLETED' && slot.team && slot.team.id === match.winnerTeamId
              ? 'font-semibold text-blue-700'
              : 'text-gray-800'
          }`}
        >
          <span>{slot.team?.name ?? 'TBD'}</span>
          {!isEditing && <span>{slot.score ?? '-'}</span>}
        </div>
      ))}

      {isEditing ? (
        <div className="flex flex-col gap-2 border-t border-gray-100 pt-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={team1Score}
              onChange={(e) => setTeam1Score(e.target.value)}
              className="h-8 w-16 rounded-md border border-gray-300 px-2 text-sm"
            />
            <span className="text-gray-400">:</span>
            <input
              type="number"
              min={0}
              value={team2Score}
              onChange={(e) => setTeam2Score(e.target.value)}
              className="h-8 w-16 rounded-md border border-gray-300 px-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} loading={isSaving} className="flex-1">
              저장
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
              취소
            </Button>
          </div>
        </div>
      ) : (
        canEnterResult && (
          <button
            type="button"
            onClick={startEditing}
            className="border-t border-gray-100 pt-2 text-left text-xs text-blue-600 hover:underline"
          >
            {match.status === 'COMPLETED' ? '결과 수정' : '결과 입력'}
          </button>
        )
      )}
    </div>
  )
}

export default BracketMatchCard
