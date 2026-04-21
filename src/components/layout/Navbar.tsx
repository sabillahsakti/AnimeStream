"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Home,
  Film,
  Tv,
  Tag,
  Trophy,
  Globe,
  Calendar,
} from "lucide-react"

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/movies", label: "Movies", icon: Film },
  { href: "/tv", label: "TV Series", icon: Tv },
  { href: "/genres", label: "Genres", icon: Tag },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/country", label: "Country", icon: Globe },
  { href: "/year", label: "Year", icon: Calendar },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/70 to-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-8">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-wide">
            <span className="text-red-500">AnimeStream</span>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href

              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 text-sm group"
                >
                  <Icon
                    size={16}
                    className={`${
                      isActive
                        ? "text-red-500"
                        : "text-white/60 group-hover:text-white"
                    }`}
                  />

                  <span
                    className={`${
                      isActive
                        ? "text-white"
                        : "text-white/60 group-hover:text-white"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition">
            <Search size={16} />
          </button>

          {/* Sign In */}
          <Link
            href="/login"
            className="text-sm text-white/70 hover:text-white transition"
          >
            Sign In
          </Link>

          {/* Sign Up */}
          <Link
            href="/register"
            className="text-sm px-4 py-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}