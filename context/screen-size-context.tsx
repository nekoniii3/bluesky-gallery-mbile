"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface ScreenSize {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

interface ScreenSizeContextType {
  screenSize: ScreenSize
  getImageHeight: () => number
}

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined)

interface ScreenSizeProviderProps {
  children: ReactNode
}

export function ScreenSizeProvider({ children }: ScreenSizeProviderProps) {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    // 初期値を設定
    updateScreenSize()

    // リサイズイベントリスナーを追加
    window.addEventListener("resize", updateScreenSize)

    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  // 画像の高さを計算する関数
  const getImageHeight = () => {
    if (screenSize.height === 0) return 400

    // デバイスタイプに応じて異なる比率を使用
    let ratio = 0.7 // デフォルト

    if (screenSize.isMobile) {
      ratio = 0.75 // モバイルでは75%
    } else if (screenSize.isTablet) {
      ratio = 0.65 // タブレットでは65%
    } else {
      ratio = 0.6 // デスクトップでは60%
    }

    return Math.min(screenSize.height * ratio, 800)
  }

  return <ScreenSizeContext.Provider value={{ screenSize, getImageHeight }}>{children}</ScreenSizeContext.Provider>
}

export function useScreenSize() {
  const context = useContext(ScreenSizeContext)
  if (context === undefined) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider")
  }
  return context
}
