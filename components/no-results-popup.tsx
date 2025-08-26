"use client"

import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"

interface NoResultsPopupProps {
  show: boolean
  keyword?: string
}

export function NoResultsPopup({ show, keyword }: NoResultsPopupProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)

      // 5秒後に非表示にする
      const timer = setTimeout(() => {
        setVisible(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [show])

  if (!visible) return null

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-lg flex items-center space-x-2">
        <AlertCircle className="w-4 h-4 text-red-400" />
        <p>{keyword ? `「${keyword}」で` : ""}メディアデータがありませんでした</p>
      </div>
    </div>
  )
}
