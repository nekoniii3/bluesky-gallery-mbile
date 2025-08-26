"use client"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import type { MediaData } from "@/types/post"
import { PostCard } from "@/components/post-card"
import { LoadingPopup } from "@/components/loading-popup"
import { EndOfResultsPopup } from "@/components/end-of-results-popup"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useScreenSize } from "@/context/screen-size-context"
import { ChevronsUp } from "lucide-react"

// Swiper CSSをインポート
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"

interface ImageSwiperProps {
  medias: MediaData[]
  mediasNumber: number
  onLoadMore: () => Promise<void>
  hasMore: boolean
  isLoading: boolean
  isRetry: boolean
}

// スリープ関数の定義
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function ImageSwiper({ medias, mediasNumber, onLoadMore, hasMore, isLoading, isRetry }: ImageSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [totalMedias, setTotalMedias] = useState<number>(0)
  const [showEndOfResults, setShowEndOfResults] = useState(false)
  const { screenSize }  = useScreenSize()
  const [swiper, setSwiper] = useState<any>(null)
  const [showNavigation, setShowNavigation] = useState(true)

  useEffect(() => {

    const displayTime = isRetry ? 0 : 8000;

    const timer = setTimeout(() => {
      setShowNavigation(false)    // スワイプナビゲーション表示
    }, displayTime)
    return () => clearTimeout(timer)

  }, [])

  useEffect(() => {
  
    setTotalMedias(totalMedias + mediasNumber)

  }, [medias])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
  }

  // 最後のスライドに到達し、まだ読み込むデータがあれば次のデータを読み込む
  const handleSlideChangeTransitionEnd = async (swiper: SwiperType) => {
    if (hasMore && swiper.activeIndex === medias.length - 1 && !isLoading) {
      await onLoadMore()

      await sleep(1000)   // 表示にラグがあるので1秒スリーブ

      swiper.slideTo(0)   // 1枚目に戻る 
    }
  }

  // タッチ終了時のイベント
  const handleTouchEnd = () => {
    // 最後のスライドでさらにスワイプしようとした場合

    if (activeIndex === medias.length - 1 && !hasMore && !isLoading) {
      setShowEndOfResults(true)
    }
  }

  return (
    <div className="relative h-full w-full">

      {/* 戻るボタン */}
      <Link href={`/?retry=true`} className="absolute top-4 left-4 z-20 bg-black/60 text-white px-1 py-1 rounded-full text-sm font-medium">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* スワイプを促すナビゲーション */}
      {showNavigation && (
        <div className="absolute top-18 right-6 z-10 animate-bounce bg-sky-500/80 rounded-lg shadow-lg">
            <div className="flex items-center text-white px-1 py-2">
              <ChevronsUp className="h-6 w-6" />
              <span className="text-base font-medium">Let's Swipe UP！</span>
            </div>
        </div>
      )}

      {/* スライドインジケーター */}
      {(mediasNumber > activeIndex) &&
      <div className="absolute top-4 right-4 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
         {totalMedias - mediasNumber + activeIndex + 1}/{totalMedias}
      </div>}

      {/* ローディングポップアップ */}
      {isLoading && <LoadingPopup/>}

      {/* 結果終了ポップアップ */}
      <EndOfResultsPopup show={showEndOfResults} />

      <Swiper
        effect="cards"
        direction="vertical"
        modules={[EffectCards]}
        className="h-full w-full swiper-cards"
        spaceBetween={0}
        slidesPerView={1}
        cardsEffect={{
          slideShadows: false,
          perSlideRotate: 1,
          perSlideOffset: 1,
        }}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        onTouchEnd={handleTouchEnd}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {medias.map((post, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <PostCard post={post} imageHeight={screenSize.height} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
