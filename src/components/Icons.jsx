const common = 'h-6 w-6 shrink-0 text-[var(--color-accent)]'

export function IconShield({ className = '' }) {
  return (
    <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2L4 5v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconGrowth({ className = '' }) {
  return (
    <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20V10M10 20V4M16 20v-6M22 20V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconWheel({ className = '' }) {
  return (
    <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconTech({ className = '' }) {
  return (
    <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 10h8v8H8zM4 6h4V4H4v2zm12 0h4V4h-4v2zM4 18h4v2H4v-2zm12 0h4v2h-4v-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconTrophy({ className = '' }) {
  return (
    <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 21h8M12 17v4M6 3h12v4a4 4 0 01-4 4h-4a4 4 0 01-4-4V3zM6 5H4a2 2 0 002 2M18 5h2a2 2 0 01-2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const map = {
  shield: IconShield,
  growth: IconGrowth,
  wheel: IconWheel,
  tech: IconTech,
  trophy: IconTrophy,
}

export function WhyIcon({ name }) {
  const Cmp = map[name] ?? IconShield
  return <Cmp />
}
