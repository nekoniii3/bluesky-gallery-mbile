"use client"

import { useEffect, useState } from "react"

interface EndOfResultsPopupProps {
  show: boolean
}

export function EndOfResultsPopup({ show }: EndOfResultsPopupProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)

      // 3秒後に非表示にする
      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show])

  if (!visible) return null

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
        これ以上結果はありません
      </div>
    </div>
  )
}
