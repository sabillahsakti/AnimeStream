"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
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
    const safePage = Math.min(Math.max(page, 1), totalPages)
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(safePage))
    router.push(`${pathname}?${params.toString()}`)
  }

  const pages: (number | "...")[] = []
  const start = Math.max(1, currentPage - 1)
  const end = Math.min(totalPages, currentPage + 1)

  if (start > 1) pages.push(1)
  if (start > 2) pages.push("...")
  for (let page = start; page <= end; page += 1) pages.push(page)
  if (end < totalPages - 1) pages.push("...")
  if (end < totalPages) pages.push(totalPages)

  return (
    <nav className="flex items-center justify-center gap-2 pt-4" aria-label="Pagination">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="grid size-9 place-items-center text-sm text-zinc-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`size-9 rounded-md border text-sm font-semibold transition ${
              page === currentPage
                ? "border-red-500 bg-red-600 text-white"
                : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/10"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Halaman berikutnya"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
