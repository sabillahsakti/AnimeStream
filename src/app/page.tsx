import { Suspense } from "react"
import { getHome } from "@/lib/api"
import { AnimeGrid } from "@/components/anime/AnimeGrid"
import { AnimeGridSkeleton } from "@/components/anime/AnimeCardSkeleton"
import { Pagination } from "@/components/common/Pagination"
import { Flame, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AniStream — Nonton Anime Subtitle Indonesia",
}

interface HomePageProps {
  searchParams: Promise<{ page?: string }>
}

async function AnimeSection({ page }: { page: number }) {
  const res = await getHome(page)
  const { anime, total_pages } = res.data

  // Split: ongoing (non-batch) and batch
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
    <div className="space-y-12">
      {/* Ongoing */}
      {ongoing.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Flame size={18} style={{ color: "var(--accent)" }} />
            <h2
              className="font-display text-2xl section-title-line"
              style={{ letterSpacing: "0.05em" }}
            >
              UPDATE TERBARU
            </h2>
          </div>
          <AnimeGrid items={ongoing} priorityCount={8} />
        </section>
      )}

      {/* Batch / completed */}
      {batches.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={18} style={{ color: "var(--accent)" }} />
            <h2
              className="font-display text-2xl section-title-line"
              style={{ letterSpacing: "0.05em" }}
            >
              BATCH & COMPLETED
            </h2>
          </div>
          <AnimeGrid items={batches} />
        </section>
      )}

      {/* Pagination */}
      <div className="pt-4">
        <Pagination currentPage={page} totalPages={total_pages} />
      </div>
    </div>
  )
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)

  return (
    <div
      className="mx-auto"
      style={{ maxWidth: 1280, padding: "2.5rem 1.5rem" }}
    >
      {/* Hero header */}
      <div className="mb-10">
        <p
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: "var(--accent)", letterSpacing: "0.15em" }}
        >
          Subtitle Indonesia
        </p>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 1,
            letterSpacing: "0.03em",
            color: "var(--text-primary)",
          }}
        >
          NONTON ANIME
          <br />
          <span style={{ color: "var(--accent)" }}>GRATIS</span>
        </h1>
        <p
          className="mt-4 text-base max-w-lg"
          style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
        >
          Koleksi anime terlengkap dengan subtitle Indonesia. Update setiap hari.
        </p>
      </div>

      {/* Divider */}
      <div
        className="mb-8"
        style={{ height: 1, background: "var(--border)" }}
      />

      {/* Anime grid with suspense */}
      <Suspense fallback={<AnimeGridSkeleton count={20} />}>
        <AnimeSection page={page} />
      </Suspense>
    </div>
  )
}