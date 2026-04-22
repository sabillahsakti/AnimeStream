import { searchAnime } from "@/lib/api"
import { AnimeGrid } from "@/components/anime/AnimeGrid"
import { Pagination } from "@/components/common/Pagination"
import { SectionHeader } from "@/components/common/SectionHeader"
import { SearchBox } from "@/components/search/SearchBox"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search",
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const q = (params.q ?? "").trim()
  const page = Math.max(1, Number(params.page) || 1)
  const res = q.length >= 2 ? await searchAnime(q, page) : null

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      <SectionHeader
        eyebrow="Search"
        title="Cari anime"
        description="Pencarian berjalan melalui server route agar token API tetap aman."
      />
      <SearchBox defaultValue={q} />

      {q.length < 2 ? (
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-10 text-sm text-zinc-400">
          Masukkan minimal 2 huruf untuk mulai mencari.
        </div>
      ) : (
        <>
          <p className="mb-5 text-sm text-zinc-400">
            Hasil untuk <span className="font-semibold text-white">{q}</span>
          </p>
          <AnimeGrid items={res?.data.anime ?? []} priorityCount={10} />
          {res ? <Pagination currentPage={page} totalPages={res.data.total_pages} /> : null}
        </>
      )}
    </main>
  )
}
