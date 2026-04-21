"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/anime", label: "Anime" },
  { href: "/schedule", label: "Jadwal" },
  { href: "/genre/action", label: "Genre" },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10, 10, 11, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: 1280, padding: "0 1.5rem", height: 60 }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl tracking-wide flex-shrink-0"
          style={{ color: "var(--text-primary)", letterSpacing: "0.06em" }}
        >
          ANI<span style={{ color: "var(--accent)" }}>STREAM</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="text-sm transition-colors px-3 py-1.5 rounded"
                style={{
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  background: isActive ? "var(--bg-overlay)" : "transparent",
                  borderRadius: "var(--radius-md)",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Search + mobile menu */}
        <div className="flex items-center gap-2">
          {/* Search button (Phase 2 will wire this up) */}
          <Link
            href="/search"
            className="flex items-center gap-2 transition-colors"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "6px 12px",
              color: "var(--text-muted)",
              fontSize: 13,
            }}
          >
            <Search size={14} />
            <span className="hidden sm:inline">Cari anime...</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="flex md:hidden items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-md)",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className="md:hidden flex flex-col"
          style={{
            background: "var(--bg-surface)",
            borderTop: "1px solid var(--border)",
            padding: "0.5rem 1.5rem 1rem",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm border-b"
                style={{
                  color: isActive ? "var(--accent-hover)" : "var(--text-secondary)",
                  borderColor: "var(--border)",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}