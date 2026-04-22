"use client"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="mx-auto grid min-h-dvh max-w-2xl place-items-center px-4 py-28 text-center">
      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-8">
        <p className="text-sm font-bold uppercase text-red-500">Error</p>
        <h1 className="mt-2 text-3xl font-black text-white">Konten gagal dimuat</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
        >
          Coba lagi
        </button>
      </div>
    </main>
  )
}
