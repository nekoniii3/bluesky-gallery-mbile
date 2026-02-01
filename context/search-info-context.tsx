"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { AuthorData } from "@/types/post"
// ユーザー情報の型定義
// export interface UserInfo {
//   id: string
//   username: string
//   displayName: string
//   avatarUrl: string
// }

// Contextの型定義
interface SearchInfoContextType {
  keyword: string
  setKeyword: (keyword: string) => void
  selectedUser: AuthorData | null
  setSelectedUser: (user: AuthorData | null) => void
  clearInfo: () => void
}

// Context作成
const SearchInfoContext = createContext<SearchInfoContextType | undefined>(undefined)

// Provider コンポーネント
export function SearchInfoProvider({ children }: { children: ReactNode }) {
  const [selectedUser, setSelectedUser] = useState<AuthorData | null>(null)
  const [keyword, setKeyword] = useState("")

  
  const clearInfo = () => {
    setKeyword("")
    setSelectedUser(null)
  }

  return (
    <SearchInfoContext.Provider
      value={{
        keyword,
        setKeyword,
        selectedUser,
        setSelectedUser,
        clearInfo,
      }}
    >
      {children}
    </SearchInfoContext.Provider>
  )
}

// カスタムフック
export function useSearchInfo() {
  const context = useContext(SearchInfoContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
