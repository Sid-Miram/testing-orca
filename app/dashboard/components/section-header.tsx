import React from "react"

export function SectionHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 justify-between">
      <div>
        <h1 className="text-[32px] leading-tight font-semibold text-white">{title}</h1>
        {subtitle && <p className="muted text-[15px] mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  )
}

