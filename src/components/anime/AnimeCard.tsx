import Link from "next/link"
import Image from "next/image"
import type { AnimeListItem } from "@/lib/types"

interface AnimeCardProps {
  anime: AnimeListItem
  priority?: boolean
}

export function AnimeCard({ anime, priority = false }: AnimeCardProps) {
  const isCompleted = anime.latest_episode.toLowerCase().includes("completed") ||
                      anime.latest_episode.toLowerCase().includes("batch")
  const isBatch = anime.latest_episode.toLowerCase().includes("batch")

  return (
    <Link
      href={`/anime/${anime.slug}`}
      className="anime-card-hover group block"
      style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: "2/3",
          background: "var(--bg-elevated)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}
      >
        <Image
          src={anime.thumbnail}
          alt={anime.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          unoptimized
        />

        {/* Gradient overlay */}
        <div className="card-overlay absolute inset-0" />

        {/* Type badge — top left */}
        <div className="absolute top-2 left-2">
          <span className="badge-type">{anime.type}</span>
        </div>

        {/* Batch badge — top right */}
        {isBatch && (
          <div className="absolute top-2 right-2">
            <span className="badge-new">Batch</span>
          </div>
        )}

        {/* Episode info — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p
            className="text-xs font-medium truncate"
            style={{ color: isCompleted ? "var(--text-secondary)" : "var(--accent-hover)" }}
          >
            {anime.latest_episode}
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="mt-2 px-0.5">
        <p
          className="text-sm font-medium leading-snug line-clamp-2"
          style={{ color: "var(--text-primary)" }}
        >
          {anime.title}
        </p>
      </div>
    </Link>
  )
}