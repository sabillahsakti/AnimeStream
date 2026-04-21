"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AnimeListItem } from "@/lib/types";

interface Props {
  items: AnimeListItem[];
}

function formatTitle(title: string) {
  return title.replace(/episode\s*\d+/i, "").trim();
}

export function HeroSlider({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [paused, items.length]);

  const active = items[index];

  if (!active) return null;

  return (
    <section
      className="relative h-[75vh] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Blur background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-40"
        style={{ backgroundImage: `url(${active.thumbnail})` }}
      />

      {/* Main image */}
      <img
        src={active.thumbnail}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        alt={active.title}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end max-w-7xl mx-auto px-6 pb-16">
        <div className="max-w-xl">
          <span className="text-xs text-red-500 uppercase tracking-widest">
            Ongoing
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-2">
            {formatTitle(active.title)}
          </h1>

          <p className="mt-3 text-white/60 text-sm">
            {active.type} • Streaming Anime
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href={`/anime/${active.slug}`}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium"
            >
              Watch Now
            </Link>

            <Link
              href={`/anime/${active.slug}`}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg"
            >
              Detail
            </Link>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-red-500" : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
