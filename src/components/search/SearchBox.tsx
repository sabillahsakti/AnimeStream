"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface SearchBoxProps {
  defaultValue?: string
}

export function SearchBox({ defaultValue = "" }: SearchBoxProps) {
  const router = useRouter()
  const [query, setQuery] = useState(defaultValue)

  useEffect(() => {
    const value = query.trim()
    const timeout = window.setTimeout(() => {
      if (value.length >= 2) {
        router.replace(`/search?q=${encodeURIComponent(value)}`)
      }
    }, 450)

    return () => window.clearTimeout(timeout)
  }, [query, router])

  return (
    <div className="mb-8 flex h-12 max-w-xl items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-4 focus-within:border-red-500/70">
      <Search className="size-5 text-zinc-500" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Ketik minimal 2 huruf..."
        className="h-full w-full bg-transparent text-base text-white outline-none placeholder:text-zinc-500"
        autoFocus
      />
    </div>
  )
}
