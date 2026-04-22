import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { getWatchData } from "@/lib/api"
import { WatchExperience } from "@/components/watch/WatchExperience"
import type { Metadata } from "next"

interface WatchPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const { slug } = await params
  const res = await getWatchData(slug)
  return {
    title: res.data.title,
  }
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug } = await params
  const res = await getWatchData(slug)
  const data = res.data

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6">
      <nav className="mb-5 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-white">
          <Home className="size-4" />
          Home
        </Link>
        <ChevronRight className="size-4" />
        <span className="line-clamp-1 text-zinc-300">{data.title}</span>
      </nav>

      <WatchExperience
        title={data.title}
        servers={data.streaming_servers}
        downloads={data.download_links}
        prevEpisode={data.prev_episode}
        nextEpisode={data.next_episode}
      />
    </main>
  )
}
