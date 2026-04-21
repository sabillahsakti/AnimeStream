import { AnimeCard } from "@/components/anime/AnimeCard"
import type { AnimeListItem } from "@/lib/types"

interface AnimeGridProps {
  items: AnimeListItem[]
  priorityCount?: number
}

export function AnimeGrid({ items, priorityCount = 6 }: AnimeGridProps) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
      }}
    >
      {items.map((anime, index) => (
        <AnimeCard
          key={anime.slug}
          anime={anime}
          priority={index < priorityCount}
        />
      ))}
    </div>
  )
}