import { AnimeCard } from "@/components/anime/AnimeCard"
import type { AnimeListItem } from "@/lib/types"

interface AnimeGridProps {
  items: AnimeListItem[]
  getHref?: (anime: AnimeListItem) => string
  priorityCount?: number
}

export function AnimeGrid({ items, getHref, priorityCount = 6 }: AnimeGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-zinc-400">
        Tidak ada anime untuk ditampilkan.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((anime, index) => (
        <AnimeCard
          key={`${anime.slug}-${index}`}
          anime={anime}
          href={getHref?.(anime)}
          priority={index < priorityCount}
        />
      ))}
    </div>
  )
}
