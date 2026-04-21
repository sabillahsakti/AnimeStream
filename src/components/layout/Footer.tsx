import Link from "next/link"

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-surface)",
        marginTop: "auto",
      }}
    >
      <div
        className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ maxWidth: 1280, padding: "1.5rem" }}
      >
        {/* Logo */}
        <span
          className="font-display text-lg"
          style={{ color: "var(--text-muted)", letterSpacing: "0.06em" }}
        >
          ANI<span style={{ color: "var(--accent)" }}>STREAM</span>
        </span>

        {/* Links */}
        <nav className="flex items-center gap-4">
          {[
            { href: "/", label: "Home" },
            { href: "/anime", label: "Anime" },
            { href: "/schedule", label: "Jadwal" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs transition-colors hover:text-white"
              style={{ color: "var(--text-muted)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Subtitle Indonesia · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}