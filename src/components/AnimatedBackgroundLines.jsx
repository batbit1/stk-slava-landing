// Decorative background — subtle racing grid + animated yellow streaks
// Positioned absolute/fixed by parent; pointer-events: none throughout

const YLW = '#D6FF00'
const YLW_RGB = '214, 255, 0'

export function AnimatedBackgroundLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(${YLW_RGB},0.18) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          opacity: 0.12,
        }}
      />

      {/* Horizontal racing lines */}
      {[15, 35, 58, 78].map((top, i) => (
        <div
          key={i}
          className="bg-streak-fall absolute left-0 h-px w-full"
          style={{
            top: `${top}%`,
            background: `linear-gradient(to right, transparent 0%, rgba(${YLW_RGB},0.08) 30%, rgba(${YLW_RGB},0.14) 50%, rgba(${YLW_RGB},0.08) 70%, transparent 100%)`,
            animationDelay: `${i * 1.4}s`,
          }}
        />
      ))}

      {/* Vertical accent lines */}
      {[20, 50, 80].map((left, i) => (
        <div
          key={i}
          className="absolute top-0 h-full w-px"
          style={{
            left: `${left}%`,
            background: `linear-gradient(to bottom, transparent 0%, rgba(${YLW_RGB},0.06) 40%, rgba(${YLW_RGB},0.06) 60%, transparent 100%)`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* Corner YLW glow — top right */}
      <div
        className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.04]"
        style={{ background: `radial-gradient(ellipse at center, ${YLW}, transparent 65%)` }}
      />

      {/* Corner YLW glow — bottom left */}
      <div
        className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full opacity-[0.03]"
        style={{ background: `radial-gradient(ellipse at center, ${YLW}, transparent 65%)` }}
      />
    </div>
  )
}
