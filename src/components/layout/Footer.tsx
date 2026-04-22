import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070708]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-black text-white">AnimeStream</span> - Subtitle Indonesia
        </p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <Link href="/anime" className="transition hover:text-white">Anime</Link>
          <Link href="/genre/action" className="transition hover:text-white">Genre</Link>
          <Link href="/schedule" className="transition hover:text-white">Jadwal</Link>
        </nav>
      </div>
    </footer>
  )
}
