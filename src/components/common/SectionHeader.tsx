import type { ReactNode } from "react"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-bold uppercase text-red-500">{eyebrow}</p> : null}
        <h2 className="text-2xl font-black text-white md:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}
