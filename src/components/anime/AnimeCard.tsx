import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import type { AnimeListItem } from "@/lib/types"

interface AnimeCardProps {
  anime: AnimeListItem
  href?: string
  priority?: boolean
}

export function AnimeCard({ anime, href, priority = false }: AnimeCardProps) {
  const episode = anime.latest_episode || "Episode"
  const isCompleted = /completed|batch/i.test(episode)
  const targetHref = href ?? `/anime/${anime.slug}`

  return (
    <Link href={targetHref} className="anime-card-hover group block rounded-lg">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-white/10">
        <Image
          src={anime.thumbnail}
          alt={anime.title}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 180px"
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={priority}
          unoptimized
        />
        <div className="card-overlay absolute inset-0 opacity-80 transition group-hover:opacity-95" />
        <div className="absolute left-2 top-2">
          <span className="badge-type">{anime.type}</span>
        </div>
        <div className="absolute right-2 top-2">
          <span className={isCompleted ? "badge-type" : "badge-new"}>{episode}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition group-hover:opacity-100">
          <div className="flex h-9 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-black">
            <Play className="size-4 fill-black" />
            Detail
          </div>
        </div>
      </div>
      <div className="mt-3 min-h-[44px]">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-100 group-hover:text-white">
          {anime.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-500">{anime.type}</p>
      </div>
    </Link>
  )
}
