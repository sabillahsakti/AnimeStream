import type { Metadata } from "next"
import type { ReactNode } from "react"
import "@/app/globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: {
    default: "AnimeStream - Nonton Anime Subtitle Indonesia",
    template: "%s | AnimeStream",
  },
  description: "Nonton dan download anime subtitle Indonesia terlengkap dan terbaru.",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className="min-h-dvh bg-[#050506] text-white antialiased">
        <Navbar />
        <main className="min-h-dvh">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
