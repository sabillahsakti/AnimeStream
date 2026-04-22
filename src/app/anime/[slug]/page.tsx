import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Play, Radio, Tags, User } from "lucide-react"
import { getAnimeDetail } from "@/lib/api"
import { SectionHeader } from "@/components/common/SectionHeader"
import type { Metadata } from "next"
import type { ReactNode } from "react"

interface DetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const res = await getAnimeDetail(slug)
  return {
    title: res.data.title,
    description: res.data.synopsis,
  }
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { slug } = await params
  const res = await getAnimeDetail(slug)
  const anime = res.data
  const firstEpisode = anime.episodes.at(-1) ?? anime.episodes[0]

  return (
    <main>
      <section className="relative min-h-[560px] overflow-hidden bg-black pt-24">
        <Image src={anime.thumbnail} alt={anime.title} fill priority unoptimized sizes="100vw" className="object-cover opacity-35 blur-sm scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050506_0%,rgba(5,5,6,.88)_48%,rgba(5,5,6,.65)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#050506_0%,rgba(5,5,6,.12)_55%,rgba(5,5,6,.5)_100%)]" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-[260px_1fr] md:items-end">
          <div className="relative aspect-[2/3] w-48 overflow-hidden rounded-lg ring-1 ring-white/15 md:w-full">
            <Image src={anime.thumbnail} alt={anime.title} fill priority unoptimized sizes="260px" className="object-cover" />
          </div>
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="badge-new">{anime.info.status}</span>
              <span className="badge-type">{anime.info.tipe}</span>
              <span className="badge-type">{anime.info.total_episode} episode</span>
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">{anime.title}</h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">{anime.synopsis}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {firstEpisode ? (
                <Link href={`/watch/${firstEpisode.slug}`} className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-black transition hover:bg-zinc-200">
                  <Play className="size-4 fill-black" />
                  Tonton episode 1
                </Link>
              ) : null}
              <Link href="#episodes" className="inline-flex h-11 items-center rounded-md bg-white/[0.12] px-5 text-sm font-bold text-white ring-1 ring-white/[0.12] transition hover:bg-white/20">
                Lihat episode
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px]">
        <div id="episodes">
          <SectionHeader title="Daftar episode" description="Pilih episode untuk masuk ke halaman watch dengan player dan download links." />
          <div className="grid gap-2">
            {anime.episodes.map((episode) => (
              <Link
                key={episode.slug}
                href={`/watch/${episode.slug}`}
                className="media-hover flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white line-clamp-1">{episode.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{episode.date}</p>
                </div>
                <span className="badge-type shrink-0">Ep {episode.number}</span>
              </Link>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <h2 className="mb-4 text-lg font-black text-white">Info anime</h2>
          <dl className="space-y-4 text-sm">
            <InfoRow icon={<Radio className="size-4" />} label="Studio" value={anime.info.studio} />
            <InfoRow icon={<Calendar className="size-4" />} label="Rilis" value={anime.info.dirilis} />
            <InfoRow icon={<Clock className="size-4" />} label="Durasi" value={anime.info.durasi} />
            <InfoRow icon={<User className="size-4" />} label="Director" value={anime.info.director} />
            <InfoRow icon={<Tags className="size-4" />} label="Genre" value={anime.info.genres.join(", ")} />
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {anime.info.genres.map((genre) => (
              <Link key={genre} href={`/genre/${genre.toLowerCase().replace(/\s+/g, "-")}`} className="badge-type">
                {genre}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  )
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-red-500">{icon}</div>
      <div>
        <dt className="text-xs font-bold uppercase text-zinc-500">{label}</dt>
        <dd className="mt-1 leading-6 text-zinc-200">{value || "-"}</dd>
      </div>
    </div>
  )
}
