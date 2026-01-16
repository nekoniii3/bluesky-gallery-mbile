"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Sparkles, X, ArrowRight } from "lucide-react"
import { SiBluesky } from "react-icons/si"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NoResultsPopup } from "@/components/no-results-popup"
import { Checkbox } from "@/components/ui/checkbox"
import title from "@/app/title_mb.png"
import { requestTrend } from "@/lib/request"
import { UserSearchDialog } from "@/components/user-search-dialog"
import type { AuthorData } from "@/types/post"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SearchScreen() {
  const [keyword, setKeyword] = useState("")
  const [showNoResults, setShowNoResults] = useState(false)
  const [lastSearchedKeyword, setLastSearchedKeyword] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showSensitive, setShowSensitive] = useState(true)
  const [trendList, setTrendList] = useState<string[]>([])
  const [isRetry, setIsRetry] = useState(false)
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AuthorData| null>(null)
  
  const getTrend = async() => {

    const tl = await requestTrend()

    // 7つまでにする
    tl.length > 8 ? setTrendList(tl.slice(0, 7)) : setTrendList(tl)

  }

  useEffect(() => {
    
    // トレンド取得
    getTrend()

  }, [])

  // URLパラメータに関する処理
  useEffect(() => {

    const noResults = searchParams.get("noResults") === "true"
    const searchKeyword = searchParams.get("keyword") || ""
    const retry = searchParams.get("retry") === "true"
    const url = new URL(window.location.href)

    if (noResults && searchKeyword) {
      setShowNoResults(true)
      setLastSearchedKeyword(searchKeyword)

      // 検索ワードを検索ボックスに設定
      setKeyword(searchKeyword)

      // URLからnoResultsパラメータを削除（ブラウザの履歴は変更せず）
      // keywordパラメータは残しておく
      url.searchParams.delete("noResults")
    } else if (searchParams.get("keyword")) {
      // 検索結果がなくても、keywordパラメータがある場合は検索ボックスに設定
      setKeyword(searchParams.get("keyword") || "")
      
    }

    if (retry) {
      // 再度実行か判定しURLパラメータから消す
      setIsRetry(retry)
      url.searchParams.delete("retry")
      window.history.replaceState({}, "", url)
    }

  }, [searchParams])

  // 検索を実行する関数
  const handleSearch = (searchTerm: string, showSensitive: boolean) => {
    if (!searchTerm.trim()) return

    // 検索結果ページに遷移
    router.push(`/results?q=${encodeURIComponent(searchTerm)}&sensitive=${encodeURIComponent(showSensitive)}&retry=${encodeURIComponent(isRetry)}`)
  }

  return (
    <div className="min-h-screen p-4">
      <header className="py-6">
        <div className="relative max-w-sm mx-auto px-4">
          <img src={title.src} className="w-full mx-2 mt-1 mb-6"/>
        </div>
        <div className="relative max-w-md mx-auto">
          <Input
            placeholder="Blueskyの画像を検索します"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(keyword, showSensitive)}
            className="bg-white border-gray-700 rounded-full pl-10 pr-4 py-6 w-full text-black"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {keyword && (
            <Button
              onClick={() => handleSearch(keyword, showSensitive)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
        {!selectedUser ? (
        <div className="flex justify-center space-x-2">
          <Button type="button" variant="secondary" onClick={() => setUserDialogOpen(true)} className="text-xs bg-cyan-200 my-2">
            ユーザー検索
          </Button>
        </div>
        ) : (
          <div className="relative max-w-md mx-auto gap-3 rounded-lg border border-border bg-muted/50 p-3 mt-4">
            <div className="flex justify-center items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.handle} />
              <AvatarFallback>{selectedUser.handle}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{selectedUser.handle}</p>
              <p className="text-xs text-muted-foreground">{selectedUser.handle}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
            </div>
          </div>
        )}
        <div className="max-w-md mx-auto mt-4 flex justify-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sensitive-content"
              checked={showSensitive}
              onCheckedChange={(checked) => setShowSensitive(checked as boolean)}
            />
            <label
              htmlFor="sensitive-content"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              センシティブなものは非表示
            </label>
          </div>
        </div>
      </header>
      <div className="max-w-md mx-auto mt-8">
        {/* トレンドキーワード */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
            <h2 className="text-lg font-semibold">トレンド</h2>
            <span className="text-xs ml-1">（@trendingjapan.bsky.socialより）</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendList.map((trend, i) => (
              <Button
                key={i}
                variant="secondary"
                className="rounded-full text-white bg-sky-500 hover:bg-gray-700"
                onClick={() => handleSearch(trend, showSensitive)}
              >
                {trend}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-20">
        {/* noteリンク */}
        <div className="h-8 w-8 bg-white rounded">
          <a
            href="https://note.com/nekoniii3/n/n1c337bec8e61"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/note-icon.png" />
          </a>
        </div>
        {/* 区切り線 */}
        <div className="h-4 w-px bg-gray-300"></div>
        {/* Blueskyリンク */}
        <a
          href="https://bsky.app/profile/nekonii3info.bsky.social/post/3lxbscdvvf22o"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2 group"
        >
          <div className="p-2 bg-cyan-100 text-sky-600 texborder border-blue-300 rounded-lg group-hover:border-blue-600 transition-colors duration-200">
            <SiBluesky className="h-5 w-5" />
          </div>
        </a>
      </div>
      <div className="flex items-center justify-center my-4">
        <a
          href="https://github.com/nekoniii3/bluesky-gallery-mbile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-sm underline">source is here</span>
        </a>
      </div>
      {/* 検索結果なしポップアップ */}
      <NoResultsPopup show={showNoResults} keyword={lastSearchedKeyword} />
      {/* ユーザー検索ダイアログ */}
      <UserSearchDialog
        open={userDialogOpen}
        onOpenChange={setUserDialogOpen}
        // onUserSelect={setSelectedUser}
        onSelectUser={setSelectedUser}
      />
    </div>
  )
}
