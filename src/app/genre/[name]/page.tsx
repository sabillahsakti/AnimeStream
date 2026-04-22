import Link from "next/link"
import { getGenre } from "@/lib/api"
import { AnimeGrid } from "@/components/anime/AnimeGrid"
import { Pagination } from "@/components/common/Pagination"
import { SectionHeader } from "@/components/common/SectionHeader"
import type { Metadata } from "next"

const POPULAR_GENRES = ["action", "comedy", "drama", "fantasy", "romance", "school", "seinen", "slice-of-life"]

interface GenrePageProps {
  params: Promise<{ name: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: GenrePageProps): Promise<Metadata> {
  const { name } = await params
  return {
    title: `Genre ${decodeURIComponent(name)}`,
  }
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
  const { name } = await params
  const query = await searchParams
  const genre = decodeURIComponent(name)
  const page = Math.max(1, Number(query.page) || 1)
  const res = await getGenre(genre, page)

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      <SectionHeader
        eyebrow="Genre"
        title={res.data.genre}
        description="Browse anime berdasarkan genre. Gunakan chip genre populer untuk berpindah kategori."
      />

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {POPULAR_GENRES.map((item) => (
          <Link
            key={item}
            href={`/genre/${item}`}
            className={`shrink-0 rounded-md border px-3 py-2 text-sm font-semibold capitalize transition ${
              item === genre
                ? "border-red-500 bg-red-600 text-white"
                : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/10"
            }`}
          >
            {item.replace(/-/g, " ")}
          </Link>
        ))}
      </div>

      <AnimeGrid items={res.data.anime} priorityCount={10} />
      <Pagination currentPage={page} totalPages={res.data.total_pages} />
    </main>
  )
}
