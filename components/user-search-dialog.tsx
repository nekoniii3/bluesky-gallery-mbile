"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, User } from "lucide-react"
import type { AuthorData } from "@/types/post"
import { requestActor } from "@/lib/request"
import { useSearchInfo } from "@/context/search-info-context"

interface UserSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectUser: (username: AuthorData) => void
}

export function UserSearchDialog({ open, onOpenChange }: UserSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [executedQuery, setExecutedQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isSearceSuccess, setIsSearceSuccess] = useState(false)
  const [searchAuthor, setSearchAuthor] = useState<AuthorData[]>([])
  const { setSelectedUser } = useSearchInfo()

  const handleSearch = async () => {

    if (searchQuery.trim() === "") return
    setIsSearching(true)
    setExecutedQuery(searchQuery)

    try {

      const result = await requestActor(searchQuery)
      
      // エラーの場合はメッセージを表示
      if (result.status !== 200) {
        setIsSearching(false)
        return
      }

      setIsSearceSuccess(true)

      // 検索結果が0件の場合はメッセージを表示
      if (result.actors.length === 0) {
        setIsSearching(false)
        setSearchAuthor([])
        return
      }

      setSearchAuthor(result.actors)

    } catch (error) {
      console.error("ユーザーの取得に失敗しました", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectUser = (actor: AuthorData) => {
    setSelectedUser(actor)
    onOpenChange(false)
    setSearchQuery("")
    setExecutedQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-cyan-100 text-sky-500">
        <DialogHeader>
          <DialogTitle>ユーザー検索</DialogTitle>
          <DialogDescription>BlueSkyユーザー名などを入力してください</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="情報を入力..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 border-blue-500 focus:border-blue-700"
            />
            <Button onClick={handleSearch} disabled={isSearching} size="icon" className="bg-sky-400">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-96 space-y-2 overflow-y-auto">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">検索中...</p>
              </div>
            ) : executedQuery === "" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center"></div>
            ) : !isSearceSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm font-bold text-muted-foreground">検索中にエラーが発生しました</p>
              </div>              
            ) : searchAuthor.length > 0 ? (
              searchAuthor.map((user, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectUser(user)}
                  className="flex w-19/20 items-center gap-3 rounded-lg border border-border bg-cyan-50 bg-card p-3 transition-colors hover:bg-accent"
                >                
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-muted-foreground">@{user.handle}</div>
                    <div className="font-medium text-foreground">{user.displayName}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <User className="mb-2 h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">ユーザーが見つかりませんでした</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
