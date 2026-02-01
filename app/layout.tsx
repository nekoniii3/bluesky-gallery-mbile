import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ScreenSizeProvider } from "@/context/screen-size-context"
import { SearchInfoProvider } from "@/context/search-info-context"
import { Suspense } from 'react'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlueSky Media Gallery",
  description: "BlueSky Media Gallery for Mobile",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <Suspense>
        <ScreenSizeProvider>
          <SearchInfoProvider>
            {children}
          </SearchInfoProvider>
        </ScreenSizeProvider>
        </Suspense>
      </body>
    </html>
  )
}
