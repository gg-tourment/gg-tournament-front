import {
  loadTossPayments,
  type TossPaymentsWidgets,
  type WidgetAgreementWidget,
  type WidgetPaymentMethodWidget,
} from '@tosspayments/tosspayments-sdk'
import { useEffect, useRef, useState } from 'react'
import Button from '../common/Button'
import { getErrorMessage } from '../../lib/errors'

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY

const PAYMENT_METHOD_SELECTOR = '#toss-payment-method'
const AGREEMENT_SELECTOR = '#toss-payment-agreement'

interface TossPaymentWidgetProps {
  orderId: string
  orderName: string
  amount: number
  customerKey: string
  successUrl: string
  failUrl: string
}

function TossPaymentWidget({
  orderId,
  orderName,
  amount,
  customerKey,
  successUrl,
  failUrl,
}: TossPaymentWidgetProps) {
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    let paymentMethodWidget: WidgetPaymentMethodWidget | null = null
    let agreementWidget: WidgetAgreementWidget | null = null

    async function setup() {
      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY)
      if (cancelled) return

      const widgets = tossPayments.widgets({ customerKey })
      await widgets.setAmount({ currency: 'KRW', value: amount })
      if (cancelled) return

      const [renderedPaymentMethod, renderedAgreement] = await Promise.all([
        widgets.renderPaymentMethods({ selector: PAYMENT_METHOD_SELECTOR }),
        widgets.renderAgreement({ selector: AGREEMENT_SELECTOR }),
      ])

      if (cancelled) {
        renderedPaymentMethod.destroy()
        renderedAgreement.destroy()
        return
      }

      paymentMethodWidget = renderedPaymentMethod
      agreementWidget = renderedAgreement
      widgetsRef.current = widgets
      setIsReady(true)
    }

    setup().catch((err) => {
      if (!cancelled) {
        setError(getErrorMessage(err, '결제 위젯을 불러오지 못했습니다'))
      }
    })

    return () => {
      cancelled = true
      widgetsRef.current = null
      paymentMethodWidget?.destroy()
      agreementWidget?.destroy()
    }
  }, [amount, customerKey])

  async function handlePayment() {
    if (!widgetsRef.current) return
    setIsRequesting(true)
    setError(null)
    try {
      await widgetsRef.current.requestPayment({ orderId, orderName, successUrl, failUrl })
    } catch (err) {
      setError(getErrorMessage(err, '결제 요청 중 오류가 발생했습니다'))
      setIsRequesting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div id="toss-payment-method" />
      <div id="toss-payment-agreement" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={handlePayment} disabled={!isReady} loading={isRequesting} className="w-full">
        {amount.toLocaleString()}원 결제하기
      </Button>
    </div>
  )
}

export default TossPaymentWidget
