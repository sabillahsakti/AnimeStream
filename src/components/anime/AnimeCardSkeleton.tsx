export function AnimeCardSkeleton() {
  return (
    <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {/* Thumbnail skeleton */}
      <div
        className="skeleton w-full"
        style={{
          aspectRatio: "2/3",
          borderRadius: "var(--radius-lg)",
        }}
      />
      {/* Title skeleton */}
      <div className="mt-2 px-0.5 space-y-1.5">
        <div
          className="skeleton h-3.5 w-full rounded"
          style={{ borderRadius: "var(--radius-sm)" }}
        />
        <div
          className="skeleton h-3.5 w-3/4 rounded"
          style={{ borderRadius: "var(--radius-sm)" }}
        />
      </div>
    </div>
  )
}

export function AnimeGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  )
}