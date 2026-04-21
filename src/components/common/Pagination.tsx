"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    router.push(`${pathname}?${params.toString()}`)
  }

  // Build visible page numbers: always show first, last, current ±1
  const pages: (number | "...")[] = []
  const delta = 1

  const range = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) =>
      p === 1 ||
      p === totalPages ||
      Math.abs(p - currentPage) <= delta
  )

  range.forEach((p, i) => {
    if (i > 0 && p - (range[i - 1] as number) > 1) {
      pages.push("...")
    }
    pages.push(p)
  })

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      {/* Prev button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center justify-center transition-colors"
        style={{
          width: 36,
          height: 36,
          borderRadius: "var(--radius-md)",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          color: currentPage <= 1 ? "var(--text-muted)" : "var(--text-secondary)",
          cursor: currentPage <= 1 ? "not-allowed" : "pointer",
        }}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              color: "var(--text-muted)",
              fontSize: 13,
            }}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p as number)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-md)",
              background: p === currentPage ? "var(--accent)" : "var(--bg-elevated)",
              border: p === currentPage ? "1px solid transparent" : "1px solid var(--border)",
              color: p === currentPage ? "#fff" : "var(--text-secondary)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: p === currentPage ? 600 : 400,
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center justify-center transition-colors"
        style={{
          width: 36,
          height: 36,
          borderRadius: "var(--radius-md)",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          color: currentPage >= totalPages ? "var(--text-muted)" : "var(--text-secondary)",
          cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
        }}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}