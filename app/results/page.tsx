"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ImageSwiper } from "@/components/image-swiper"
import type { MediaData } from "@/types/post"
import { requestData } from "@/lib/request"
import { Search } from "lucide-react"
import DummyData from "@/lib/dummy-data.json"

export default function ResultsPage() {
  const [media, setMedia] = useState<MediaData[]>([])
  const [mediasNumber, setMediasNumber] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [nextCursor, setNextCursor] = useState("0")
  const searchParams = useSearchParams()
  const keyword = searchParams.get("q") || ""
  const actor = searchParams.get("actor") || ""
  const showSensitive = (searchParams.get("sensitive") || "true").toLowerCase() === "true"
  const retry = (searchParams.get("retry") || "true").toLowerCase() === "true"
  const router = useRouter()

  // 初回データ取得
  useEffect(() => {
    setNextCursor("0")
    fetchPosts()
  }, [keyword, showSensitive])

  // 投稿を取得する関数
  async function fetchPosts (pageToFetch = 1) {
    
    setIsLoading(true)

    try {
      const result = await requestData(keyword, actor, nextCursor, "latest", showSensitive)

      // 検索結果が0件の場合は検索画面に戻る
      if (result.posts.length === 0 && pageToFetch === 1) {
        // keywordパラメータを追加して検索ワードを保持
        router.push(`/?noResults=true&keyword=${encodeURIComponent(keyword)}`)
        return
      }

      const mediaDatas : MediaData[] = result.posts
      const hasMore = (result.cursor !== "0")

      // ダミーを入れる前の数をセット
      setMediasNumber(mediaDatas.length)

      // まだ画像がある場合、読み込み中のダミーを挿入
      hasMore && mediaDatas.push(DummyData.mediaData)

      setMedia(mediaDatas)
      setNextCursor(result.cursor)
      setHasMore(hasMore)
      setPage(pageToFetch)

    } catch (error) {
      console.error("投稿の取得に失敗しました", error)
    } finally {
      setIsLoading(false)
      setInitialLoadComplete(true)
    }
  }

  // 次のページを読み込む関数
  const loadMorePosts = async () => {
    if (hasMore && !isLoading) {
      await fetchPosts(page + 1)
    }
  }

  // 初回ロード中は全画面ローディングを表示
  if (isLoading && !initialLoadComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen background-mobile">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto relative">
            {/* 外側のリング */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
            {/* 内側のリング */}
            <div className="absolute inset-4 rounded-full border-2 border-blue-300/30"></div>
            <div
              className="absolute inset-4 rounded-full border-2 border-transparent border-b-sky-400 animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
            {/* 中央のアイコン */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
               <Search className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
          </div>
          <p className="text-white text-xl font-bold animate-pulse mt-6">データ読み込み中...</p>
        </div>
      </div>

    )
  }

  return (
    <main className="flex min-h-screen justify-center items-center background-mobile">
      <div className="pt-3 h-screen px-3">
        <ImageSwiper
          medias={media}
          mediasNumber={mediasNumber}
          onLoadMore={loadMorePosts}
          hasMore={hasMore}
          isLoading={isLoading}
          isRetry={retry}
        />
      </div>
    </main>
  )
}
