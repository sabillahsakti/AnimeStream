"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Info, Play } from "lucide-react"
import type { AnimeListItem } from "@/lib/types"

interface HeroSliderProps {
  items: AnimeListItem[]
}

function cleanTitle(title: string) {
  return title
    .replace(/episode\s*[\w\s-]+subtitle indonesia/gi, "")
    .replace(/subtitle indonesia/gi, "")
    .trim()
}

export function HeroSlider({ items }: HeroSliderProps) {
  const [index, setIndex] = useState(0)
  const slides = useMemo(() => items.slice(0, 5), [items])

  useEffect(() => {
    if (slides.length <= 1) return
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 5500)

    return () => window.clearInterval(interval)
  }, [slides.length])

  const active = slides[index]

  if (!active) return null

  return (
    <section className="relative min-h-[620px] overflow-hidden bg-black md:min-h-[720px]">
      <Image
        src={active.thumbnail}
        alt={active.title}
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover opacity-70 transition duration-700"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050506_0%,rgba(5,5,6,.9)_28%,rgba(5,5,6,.35)_58%,rgba(5,5,6,.82)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#050506_0%,rgba(5,5,6,.12)_38%,rgba(5,5,6,.22)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-end px-4 pb-20 pt-32 sm:px-6 md:min-h-[720px] md:pb-28">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="badge-new">Update terbaru</span>
            <span className="badge-type">{active.type}</span>
            <span className="badge-type">{active.latest_episode}</span>
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            {cleanTitle(active.title)}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
            Streaming anime subtitle Indonesia dengan pilihan episode terbaru, detail anime, dan link download dalam satu tempat.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/watch/${active.slug}`}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-black transition hover:bg-zinc-200"
            >
              <Play className="size-4 fill-black" />
              Mulai nonton
            </Link>
            <Link
              href={`/watch/${active.slug}`}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-white/[0.14] px-5 text-sm font-bold text-white ring-1 ring-white/[0.12] backdrop-blur transition hover:bg-white/20"
            >
              <Info className="size-4" />
              Info episode
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-4 z-20 flex gap-2 sm:right-6">
        {slides.map((item, slideIndex) => (
          <button
            key={item.slug}
            onClick={() => setIndex(slideIndex)}
            className={`h-1.5 rounded-full transition-all ${
              slideIndex === index ? "w-10 bg-red-600" : "w-4 bg-white/35 hover:bg-white/60"
            }`}
            aria-label={`Slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
