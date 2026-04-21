import type { Metadata } from "next"
import "@/app/globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: {
    default: "AniStream — Nonton Anime Subtitle Indonesia",
    template: "%s · AniStream",
  },
  description: "Nonton dan download anime subtitle Indonesia terlengkap dan terbaru.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}