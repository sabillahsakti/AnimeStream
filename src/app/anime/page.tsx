import { fromBatchAnime, getBatch } from "@/lib/api"
import { AnimeGrid } from "@/components/anime/AnimeGrid"
import { Pagination } from "@/components/common/Pagination"
import { SectionHeader } from "@/components/common/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Anime",
}

interface AnimePageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function AnimePage({ searchParams }: AnimePageProps) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)
  const res = await getBatch(page)
  const items = res.data.anime.map(fromBatchAnime)

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      <SectionHeader
        eyebrow="Library"
        title="Anime completed"
        description="Daftar anime batch dari API. Cocok untuk mencari judul yang sudah selesai dan siap ditonton maraton."
      />
      <AnimeGrid items={items} priorityCount={10} />
      <Pagination currentPage={page} totalPages={res.data.total_pages} />
    </main>
  )
}
