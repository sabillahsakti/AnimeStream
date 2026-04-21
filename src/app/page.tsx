import { Suspense } from "react"
import { getHome } from "@/lib/api"
import { AnimeGrid } from "@/components/anime/AnimeGrid"
import { AnimeGridSkeleton } from "@/components/anime/AnimeCardSkeleton"
import { Pagination } from "@/components/common/Pagination"
import { HeroSlider } from "@/components/hero/HeroSlider"
import { Flame, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AniStream — Nonton Anime Subtitle Indonesia",
}

interface HomePageProps {
  searchParams: Promise<{ page?: string }>
}

// 🔥 SECTION (Server Component)
async function AnimeSection({ page }: { page: number }) {
  const res = await getHome(page)
  const { anime, total_pages } = res.data

  const ongoing = anime.filter(
    (a) =>
      !a.latest_episode.toLowerCase().includes("batch") &&
      !a.latest_episode.toLowerCase().includes("completed")
  )

  const batches = anime.filter(
    (a) =>
      a.latest_episode.toLowerCase().includes("batch") ||
      a.latest_episode.toLowerCase().includes("completed")
  )

  return (
    <div className="space-y-16">

      {/* 🔥 Ongoing */}
      {ongoing.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Flame size={18} className="text-red-500" />
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide">
              Update Terbaru
            </h2>
          </div>

          <AnimeGrid items={ongoing} priorityCount={8} />
        </section>
      )}

      {/* 🔥 Batch */}
      {batches.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={18} className="text-red-500" />
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide">
              Batch & Completed
            </h2>
          </div>

          <AnimeGrid items={batches} />
        </section>
      )}

      {/* 🔥 Pagination */}
      <Pagination currentPage={page} totalPages={total_pages} />
    </div>
  )
}

// 🔥 PAGE (Server Component)
export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)

  // 🔥 FETCH DATA SEKALI (biar efisien)
  const res = await getHome(page)
  const { anime } = res.data

  const ongoing = anime.filter(
    (a) =>
      !a.latest_episode.toLowerCase().includes("batch") &&
      !a.latest_episode.toLowerCase().includes("completed")
  )

  // 🔥 ambil 5 buat hero
  const heroItems = ongoing.slice(0, 5)

  return (
    <div className="bg-black text-white">

      {/* 🔥 HERO SLIDER */}
      <HeroSlider items={heroItems} />

      {/* 🔥 CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Suspense fallback={<AnimeGridSkeleton count={20} />}>
          <AnimeSection page={page} />
        </Suspense>
      </main>
    </div>
  )
}