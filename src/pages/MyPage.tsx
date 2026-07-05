import { useState } from 'react'
import { cn } from '../lib/cn'
import ProfileSection from '../components/mypage/ProfileSection'
import PaymentHistorySection from '../components/mypage/PaymentHistorySection'
import SettlementHistorySection from '../components/mypage/SettlementHistorySection'

type TabKey = 'profile' | 'payments' | 'settlements'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'profile', label: '내 정보' },
  { key: 'payments', label: '결제 내역' },
  { key: 'settlements', label: '정산 내역' },
]

function MyPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('profile')

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">마이페이지</h1>

      <div className="flex gap-4 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && <ProfileSection />}
      {activeTab === 'payments' && <PaymentHistorySection />}
      {activeTab === 'settlements' && <SettlementHistorySection />}
    </div>
  )
}

export default MyPage
