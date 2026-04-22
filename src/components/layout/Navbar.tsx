"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { CalendarDays, Clapperboard, Home, Library, Search, Tags } from "lucide-react"

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home, match: "/" },
  { href: "/anime", label: "Anime", icon: Library, match: "/anime" },
  { href: "/genre/action", label: "Genre", icon: Tags, match: "/genre" },
  { href: "/schedule", label: "Jadwal", icon: CalendarDays, match: "/schedule" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = query.trim()
    if (value) router.push(`/search?q=${encodeURIComponent(value)}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid size-8 place-items-center rounded-md bg-red-600">
            <Clapperboard className="size-4 text-white" />
          </span>
          <span className="text-base font-black text-white">AnimeStream</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ href, label, icon: Icon, match }) => {
            const isActive = match === "/" ? pathname === "/" : pathname.startsWith(match)
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm transition ${
                  isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <form onSubmit={onSubmit} className="ml-auto hidden w-full max-w-sm items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 focus-within:border-red-500/70 md:flex">
          <Search className="size-4 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari anime..."
            className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </form>

        <Link
          href={query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search"}
          className="grid size-10 place-items-center rounded-md border border-white/10 bg-white/[0.06] text-zinc-300 transition hover:bg-white/10 md:hidden"
          aria-label="Cari anime"
        >
          <Search className="size-4" />
        </Link>
      </div>
    </header>
  )
}
