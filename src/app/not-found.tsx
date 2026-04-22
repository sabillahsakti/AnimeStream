import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-dvh max-w-2xl place-items-center px-4 py-28 text-center">
      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-8">
        <p className="text-sm font-bold uppercase text-red-500">404</p>
        <h1 className="mt-2 text-3xl font-black text-white">Halaman tidak ditemukan</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">Route yang kamu buka tidak tersedia.</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-zinc-200"
        >
          Kembali ke Home
        </Link>
      </div>
    </main>
  )
}
