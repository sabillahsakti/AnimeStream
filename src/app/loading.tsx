import { AnimeGridSkeleton } from "@/components/anime/AnimeCardSkeleton"

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      <div className="mb-8 space-y-3">
        <div className="skeleton h-4 w-28 rounded" />
        <div className="skeleton h-9 w-72 max-w-full rounded" />
        <div className="skeleton h-4 w-[420px] max-w-full rounded" />
      </div>
      <AnimeGridSkeleton count={18} />
    </main>
  )
}
