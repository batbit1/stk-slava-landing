import { scrollToSectionId } from '../utils/scrollToId'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const HERO_VIDEO = '/hero-video.mp4'
const YLW = '#D6FF00'          // кислотно-жёлтый акцент
const YLW_RGB = '214, 255, 0'  // для rgba()

/* ─── Декоративные диагональные speed-lines (SVG) ────────────────────── */
function SpeedLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="sl-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={YLW} stopOpacity="0" />
          <stop offset="40%"  stopColor={YLW} stopOpacity="0.06" />
          <stop offset="60%"  stopColor={YLW} stopOpacity="0.06" />
          <stop offset="100%" stopColor={YLW} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[
        { x1: '58%', x2: '50%', w: 1   },
        { x1: '66%', x2: '58%', w: 0.5 },
        { x1: '72%', x2: '64%', w: 1.5 },
        { x1: '79%', x2: '71%', w: 0.5 },
        { x1: '85%', x2: '77%', w: 1   },
        { x1: '91%', x2: '83%', w: 0.5 },
        { x1: '97%', x2: '89%', w: 1   },
      ].map((l, i) => (
        <line
          key={i}
          x1={l.x1} y1="0%"
          x2={l.x2} y2="100%"
          stroke="url(#sl-grad)"
          strokeWidth={l.w}
        />
      ))}
    </svg>
  )
}

/* ─── Угловые скобки — racing corner brackets ─────────────────────────── */
function CornerBracket({ className = '' }) {
  return (
    <span
      className={`pointer-events-none absolute ${className}`}
      aria-hidden
      style={{ color: `rgba(${YLW_RGB},0.35)`, fontSize: '0.6rem', lineHeight: 1 }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 13V1h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

/* ─── Stat-pill ───────────────────────────────────────────────────────── */
function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="font-bold leading-none tabular-nums"
        style={{
          color: YLW,
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          textShadow: `0 0 24px rgba(${YLW_RGB},0.35)`,
        }}
      >
        {value}
      </span>
      <span
        className="text-center uppercase tracking-[0.18em] text-white/38"
        style={{ fontSize: '0.58rem' }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────── */
export function Hero() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Softened ranges: text fades gently over a longer scroll window,
  // never disappears fully. Video scale is very subtle.
  const textOpacity    = useTransform(scrollYProgress, [0, 0.65], [1, 0.25])
  const textY          = useTransform(scrollYProgress, [0, 0.65], [0, -40])
  const videoScale     = useTransform(scrollYProgress, [0, 1],    [1, 1.04])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5],  [1, 0.75])

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden lg:justify-start"
    >
      {/* ── Видео-фон ──────────────────────────────────────────────── */}
      <motion.video
        style={{ scale: videoScale }}
        className="absolute inset-0 h-full w-full object-cover object-center lg:object-[58%_center]"
        autoPlay muted loop playsInline aria-hidden
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </motion.video>

      {/* ── Racing grid overlay ────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(${YLW_RGB},0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${YLW_RGB},0.028) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
        aria-hidden
      />

      {/* ── Диагональные speed-lines ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block" aria-hidden>
        <SpeedLines />
      </div>

      {/* ── Базовый overlay ────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
      >
        {/* Вертикальный: тёмная вуаль + перетекание в body-фон снизу */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/52 to-[#070708]" />
        {/* Горизонтальный: левая часть плотнее для читаемости текста */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/88 via-black/42 to-transparent lg:block" />
      </motion.div>

      {/* ── Glow-подсветка за заголовком ──────────────────────────── */}
      <div
        className="pointer-events-none absolute z-[3] hidden lg:block"
        style={{
          left: '2%',
          top: '40%',
          width: '680px',
          height: '580px',
          transform: 'translateY(-50%)',
          background: `radial-gradient(ellipse at 30% 50%, rgba(${YLW_RGB},0.07) 0%, transparent 68%)`,
        }}
        aria-hidden
      />

      {/* ── Контент ────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex w-full max-w-[1600px] flex-1 items-center justify-center px-5 py-24 sm:px-8 sm:py-28 lg:justify-start lg:px-12 lg:py-28 xl:px-16 2xl:px-20"
      >
        <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-[min(38rem,48vw)] lg:text-left">

          {/* ── Школьный badge ──────────────────────────────────────── */}
          <div className="animate-hero-1 mb-7 inline-flex items-center gap-3">
            {/* Горизонтальная линия — только desktop */}
            <div
              className="hidden h-px w-8 lg:block"
              style={{ background: `linear-gradient(to right, rgba(${YLW_RGB},0.55), transparent)` }}
            />
            {/* Glassmorphism-pill */}
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-md"
              style={{
                borderColor: `rgba(${YLW_RGB},0.18)`,
                background: `rgba(${YLW_RGB},0.05)`,
              }}
            >
              {/* Dot */}
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: YLW, boxShadow: `0 0 6px ${YLW}` }}
              />
              <span
                className="text-[0.6rem] font-bold uppercase tracking-[0.3em]"
                style={{ color: `rgba(${YLW_RGB},0.9)` }}
              >
                СТК Слава · Школа автоспорта
              </span>
            </div>
          </div>

          {/* ── Заголовок ───────────────────────────────────────────── */}
          <div className="hero-heading-premium animate-hero-2 relative">
            {/* Угловые скобки — только на desktop */}
            <CornerBracket className="-top-3 -left-4 hidden lg:block" />

            <h1
              data-text="ДЕТСКИЙ"
              className="hero-heading-line hero-heading-line--base text-balance font-black uppercase leading-[0.98] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2rem, 4.4vw, 3.2rem)' }}
            >
              ДЕТСКИЙ
            </h1>
            <h1
              data-text="АВТОСПОРТ"
              className="hero-heading-line hero-heading-line--accent hero-accent-glow block font-black uppercase leading-[0.94] tracking-[-0.04em]"
              style={{
                color: YLW,
                fontSize: 'clamp(3rem, 8.5vw, 6.5rem)',
              }}
            >
              АВТОСПОРТ
            </h1>
          </div>

          {/* ── Разделитель ─────────────────────────────────────────── */}
          <div className="animate-hero-3 my-6 flex items-center gap-3 justify-center lg:justify-start">
            <div className="h-px w-10 opacity-50" style={{ background: YLW }} />
            <div
              className="h-1 w-1 rounded-full"
              style={{ background: YLW, opacity: 0.7, boxShadow: `0 0 6px ${YLW}` }}
            />
            <div className="h-px w-20 opacity-15" style={{ background: YLW }} />
          </div>

          {/* ── Подзаголовок ────────────────────────────────────────── */}
          <p
            className="animate-hero-3 text-pretty leading-relaxed text-white/70"
            style={{ fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)' }}
          >
            Профессиональная школа картинга и автоспорта для детей в Оренбурге.
          </p>

          {/* ── CTA кнопки ──────────────────────────────────────────── */}
          <div className="animate-hero-4 mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
            {/* Primary */}
            <button
              type="button"
              onClick={() => scrollToSectionId('contacts')}
              className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full px-7 text-sm font-bold tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.97] sm:px-8"
              style={{
                background: YLW,
                color: '#0a0b00',
                boxShadow: `0 8px 28px -8px rgba(${YLW_RGB},0.40)`,
                minHeight: '52px',
              }}
            >
              <span className="relative z-10">Записаться</span>
              {/* shimmer sweep */}
              <span
                className="pointer-events-none absolute inset-0 hero-btn-shimmer bg-white/30"
                style={{ transform: 'translateX(-120%) skewX(-20deg)' }}
                aria-hidden
              />
            </button>

            {/* Ghost */}
            <button
              type="button"
              onClick={() => scrollToSectionId('directions')}
              className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/[0.12] px-6 text-sm font-medium text-white/50 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:text-white/80"
            >
              Наши направления
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* ── Free-lesson badge ───────────────────────────────────── */}
          <div className="animate-hero-4 mt-4 flex items-center justify-center gap-2 lg:justify-start">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
              style={{
                background: `rgba(${YLW_RGB},0.10)`,
                color: YLW,
                border: `1px solid rgba(${YLW_RGB},0.22)`,
              }}
            >
              {/* small gift icon */}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7a5 2.5 0 0 1-5-2.5A5 2.5 0 0 1 12 7m0 0a5 2.5 0 0 0 5-2.5A5 2.5 0 0 0 12 7" />
              </svg>
              Первое занятие — бесплатно
            </span>
          </div>

          {/* ── Статистика ──────────────────────────────────────────── */}
          <div
            className="animate-hero-4 mt-10 inline-flex items-center justify-center gap-0 rounded-2xl border px-2 py-4 backdrop-blur-md sm:px-4 lg:justify-start"
            style={{
              borderColor: `rgba(${YLW_RGB},0.10)`,
              background: `rgba(${YLW_RGB},0.03)`,
            }}
          >
            {[
              { value: '15+',  label: 'лет опыта'  },
              { value: '100+', label: 'учеников'  },
            ].map((stat, i) => (
              <div key={i} className="flex items-stretch">
                {i > 0 && (
                  <div
                    className="mx-4 w-px self-stretch sm:mx-6"
                    style={{ background: `rgba(${YLW_RGB},0.10)` }}
                    aria-hidden
                  />
                )}
                <StatPill value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll-индикатор ───────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 lg:left-12 lg:translate-x-0 xl:left-16 2xl:left-20"
        aria-hidden
      >
        <span
          className="font-bold uppercase tracking-[0.32em] text-white/22"
          style={{ fontSize: '0.52rem' }}
        >
          scroll
        </span>
        <div
          className="hero-scroll-line h-9 w-px"
          style={{ background: `linear-gradient(to bottom, rgba(${YLW_RGB},0.5), transparent)` }}
        />
      </div>

      {/* ── Cinematic bottom fade — last 25vh dissolves into page bg ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4]"
        aria-hidden
        style={{ height: '25vh', background: 'linear-gradient(to bottom, transparent, #050505)' }}
      />
    </motion.section>
  )
}
