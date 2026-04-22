import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { getSchedule } from "@/lib/api"
import { SectionHeader } from "@/components/common/SectionHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jadwal Rilis",
}

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

export default async function SchedulePage() {
  const res = await getSchedule()

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      <SectionHeader
        eyebrow="Release calendar"
        title="Jadwal rilis mingguan"
        description="Daftar rilis per hari dari endpoint schedule. Item duplikat dari API disaring di tampilan."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {DAYS.map((day) => {
          const uniqueItems = Array.from(
            new Map((res.data[day] ?? []).map((item) => [`${item.slug}-${item.episode}-${item.release_time}`, item])).values()
          )

          return (
            <section key={day} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <h2 className="mb-4 text-lg font-black text-white">{day}</h2>
              <div className="space-y-3">
                {uniqueItems.length ? (
                  uniqueItems.map((item) => (
                    <Link
                      key={`${item.slug}-${item.episode}-${item.release_time}`}
                      href={`/anime/${item.slug}`}
                      className="media-hover flex gap-3 rounded-md border border-white/10 bg-black/20 p-2 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded bg-zinc-900">
                        <Image src={item.thumbnail} alt={item.title} fill sizes="56px" className="object-cover" unoptimized />
                      </div>
                      <div className="min-w-0 py-1">
                        <h3 className="line-clamp-2 text-sm font-bold text-white">{item.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                          <span className="badge-type">Ep {item.episode}</span>
                          {item.release_time ? (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="size-3" />
                              {item.release_time}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-md border border-white/10 bg-black/20 p-4 text-sm text-zinc-500">Belum ada jadwal.</p>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
