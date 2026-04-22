"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Download, ExternalLink, Server } from "lucide-react"
import type { DownloadQuality, StreamingServer } from "@/lib/types"

interface WatchExperienceProps {
  title: string
  servers: StreamingServer[]
  downloads: DownloadQuality[]
  prevEpisode: string | null
  nextEpisode: string | null
}

function isEmbeddableUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://") || url === "about:blank"
}

export function WatchExperience({ title, servers, downloads, prevEpisode, nextEpisode }: WatchExperienceProps) {
  const usableServers = useMemo(() => servers.filter((item) => isEmbeddableUrl(item.url)), [servers])
  const [serverIndex, setServerIndex] = useState(0)
  const [quality, setQuality] = useState(downloads[0]?.quality ?? "")
  const activeServer = usableServers[serverIndex]
  const activeDownload = downloads.find((item) => item.quality === quality) ?? downloads[0]

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl shadow-black/40">
        <div className="relative aspect-video bg-black">
          {activeServer && activeServer.url !== "about:blank" ? (
            <iframe
              key={activeServer.url}
              src={activeServer.url}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="grid h-full place-items-center px-6 text-center">
              <div>
                <p className="text-lg font-black text-white">Server belum tersedia</p>
                <p className="mt-2 text-sm text-zinc-500">Pilih server lain dari daftar di bawah.</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 bg-[#09090b] p-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-lg font-black text-white md:text-xl">{title}</h1>
          <div className="flex gap-2">
            {prevEpisode ? (
              <Link href={`/watch/${prevEpisode}`} className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-zinc-200 transition hover:bg-white/10">
                Prev
              </Link>
            ) : null}
            {nextEpisode ? (
              <Link href={`/watch/${nextEpisode}`} className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-500">
                Next
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Server className="size-5 text-red-500" />
            <h2 className="text-lg font-black text-white">Streaming server</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {usableServers.map((item, index) => (
              <button
                key={`${item.name}-${index}`}
                onClick={() => setServerIndex(index)}
                className={`rounded-md border p-3 text-left text-sm transition ${
                  index === serverIndex
                    ? "border-red-500 bg-red-600 text-white"
                    : "border-white/10 bg-black/20 text-zinc-300 hover:bg-white/10"
                }`}
              >
                <span className="line-clamp-1 font-bold">{item.name}</span>
                <span className="mt-1 block text-xs opacity-70">{item.type}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Download className="size-5 text-red-500" />
            <h2 className="text-lg font-black text-white">Download</h2>
          </div>
          <div className="mb-4 flex gap-2">
            {downloads.map((item) => (
              <button
                key={item.quality}
                onClick={() => setQuality(item.quality)}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  (activeDownload?.quality ?? quality) === item.quality
                    ? "bg-white text-black"
                    : "bg-white/10 text-zinc-300 hover:bg-white/15"
                }`}
              >
                {item.quality}
              </button>
            ))}
          </div>
          <div className="grid gap-2">
            {activeDownload?.links.map((link) => (
              <a
                key={`${activeDownload.quality}-${link.provider}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/20 p-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
              >
                {link.provider}
                <ExternalLink className="size-4 text-zinc-500" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
