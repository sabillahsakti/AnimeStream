import Link from "next/link"
import { getHome } from "@/lib/api"
import { AnimeGrid } from "@/components/anime/AnimeGrid"
import { HeroSlider } from "@/components/hero/HeroSlider"
import { Pagination } from "@/components/common/Pagination"
import { SectionHeader } from "@/components/common/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nonton Anime Subtitle Indonesia",
}

interface HomePageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)
  const res = await getHome(page)
  const { anime, total_pages } = res.data

  const ongoing = anime.filter((item) => !/batch|completed/i.test(item.latest_episode))
  const completed = anime.filter((item) => /batch|completed/i.test(item.latest_episode))

  return (
    <div>
      <HeroSlider items={ongoing.length ? ongoing : anime} />

      <main className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6">
        <section>
          <SectionHeader
            eyebrow="Baru ditambahkan"
            title="Update episode terbaru"
            action={
              <Link href="/schedule" className="text-sm font-semibold text-zinc-300 transition hover:text-white">
                Lihat jadwal
              </Link>
            }
          />
          <AnimeGrid items={ongoing} getHref={(anime) => `/watch/${anime.slug}`} priorityCount={8} />
        </section>

        {completed.length > 0 ? (
          <section>
            <SectionHeader
              eyebrow="Maraton"
              title="Batch dan completed"
              description="Judul yang sudah lengkap untuk ditonton berurutan."
              action={
                <Link href="/anime" className="text-sm font-semibold text-zinc-300 transition hover:text-white">
                  Browse semua
                </Link>
              }
            />
            <AnimeGrid items={completed} />
          </section>
        ) : null}

        <Pagination currentPage={page} totalPages={total_pages} />
      </main>
    </div>
  )
}
