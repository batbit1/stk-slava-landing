import { motion } from 'framer-motion'
import { scrollToSectionId } from '../utils/scrollToId'
import { BlurReveal, FadeUp, Stagger, StaggerItem } from './Animate'

const YLW     = '#D6FF00'
const YLW_RGB = '214, 255, 0'
const EASE    = [0.22, 1, 0.36, 1]

const POINTS = [
  {
    n:    '01',
    title:'Экипировка',
    text: 'Шлем, защита и правильная посадка помогают ребёнку чувствовать себя увереннее с первых занятий.',
  },
  {
    n:    '02',
    title:'Контроль наставников',
    text: 'Тренеры сопровождают ребёнка на каждом этапе и следят за безопасной нагрузкой.',
  },
  {
    n:    '03',
    title:'Постепенное обучение',
    text: 'Сначала основы, затем упражнения, трасса, скорость и соревнования — без резких перегрузок.',
  },
  {
    n:    '04',
    title:'Дисциплина на трассе',
    text: 'Дети учатся уважать правила, дистанцию, сигналы и других участников движения.',
  },
  {
    n:    '05',
    title:'Подготовка с 5 лет',
    text: 'Программа адаптирована для детей младшего возраста и строится через понятные упражнения.',
  },
  {
    n:    '06',
    title:'Разбор ошибок',
    text: 'После тренировок ребёнок понимает, что получилось, что нужно улучшить и как расти дальше.',
  },
]

export function Safety() {
  return (
    <section
      id="safety"
      className="scroll-mt-24 relative overflow-hidden border-t border-white/[0.06] bg-[#070708] py-24 sm:py-32"
    >
      {/* ── Background decoration ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] -translate-y-1/2 opacity-[0.055]"
        aria-hidden
        style={{ background: `radial-gradient(ellipse at center, ${YLW}, transparent 68%)` }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] opacity-[0.035]"
        aria-hidden
        style={{ background: `radial-gradient(ellipse at center, ${YLW}, transparent 68%)` }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(${YLW_RGB},0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${YLW_RGB},0.018) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header: 2-col on desktop (text | image) ─────────── */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_440px]">

          {/* Left — text content */}
          <div>

            {/* Top accent bar */}
            <motion.div
              className="mb-8 h-[2px] rounded-full"
              style={{ background: `linear-gradient(to right, ${YLW}, rgba(${YLW_RGB},0))` }}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 56, opacity: 1 }}
              viewport={{ once: true, margin: '-64px' }}
              transition={{ duration: 0.7, ease: EASE }}
            />

            <BlurReveal delay={0}>
              <p className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.38em]" style={{ color: YLW }}>
                Безопасность
              </p>
            </BlurReveal>

            <BlurReveal delay={0.08}>
              <h2
                className="text-balance font-semibold leading-[1.1] tracking-[-0.025em] text-white"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
              >
                Безопасность —{' '}
                <span style={{ color: YLW }}>главный приоритет</span>
              </h2>
            </BlurReveal>

            <FadeUp delay={0.18}>
              <p className="mt-5 text-base leading-relaxed text-white/55">
                Мы выстраиваем обучение постепенно: от экипировки и базовых правил до уверенного
                поведения на трассе под контролем наставников.
              </p>
            </FadeUp>

            {/* Trust badge */}
            <FadeUp delay={0.26}>
              <div
                className="mt-7 inline-flex items-center gap-3 rounded-full border px-5 py-3"
                style={{
                  borderColor: `rgba(${YLW_RGB},0.18)`,
                  background:  `rgba(${YLW_RGB},0.05)`,
                }}
              >
                <motion.span
                  className="h-2 w-2 flex-shrink-0 rounded-full"
                  style={{ background: YLW }}
                  animate={{ boxShadow: [`0 0 4px ${YLW}`, `0 0 12px ${YLW}`, `0 0 4px ${YLW}`] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-sm font-medium text-white/78">
                  Обучаем детей с 5 лет в Оренбурге
                </span>
              </div>
            </FadeUp>
          </div>

          {/* Right — trust image card */}
          {/*
            Replace src with a real photo of a child in karting gear or
            a trainer supervising a young driver on the track.
            Suggested local path: /safety-card.png
            Unsplash placeholder used below.
          */}
          <motion.div
            className="img-zoom relative overflow-hidden rounded-3xl"
            style={{
              border: `1px solid rgba(${YLW_RGB},0.20)`,
              boxShadow: `
                0 0 0 1px rgba(${YLW_RGB},0.06),
                0 24px 64px rgba(0,0,0,0.55),
                0 0 48px rgba(${YLW_RGB},0.05)
              `,
            }}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-64px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
          >
            {/* Photo */}
            <div className="aspect-[4/3] lg:aspect-[3/4]">
              <img
                src="/safety-card.png"
                alt="Ребёнок в картинге под контролем наставника"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* Dark vignette overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background: `
                  linear-gradient(to top, rgba(7,7,8,0.88) 0%, rgba(7,7,8,0.18) 45%, rgba(7,7,8,0.04) 100%),
                  linear-gradient(to right, rgba(7,7,8,0.25) 0%, transparent 40%)
                `,
              }}
            />

            {/* Glass reflection — top-left diagonal shine */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)',
              }}
            />

            {/* YLW top accent line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
              aria-hidden
              style={{
                background: `linear-gradient(to right, transparent, ${YLW} 25%, ${YLW} 75%, transparent)`,
                opacity: 0.75,
              }}
            />

            {/* Badge — bottom left */}
            <div className="absolute bottom-5 left-5 right-5">
              <div
                className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 backdrop-blur-md"
                style={{
                  borderColor: `rgba(${YLW_RGB},0.22)`,
                  background:  'rgba(7,7,8,0.68)',
                }}
              >
                <span
                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: YLW, boxShadow: `0 0 6px ${YLW}` }}
                />
                <span className="text-xs font-medium text-white/80">
                  Под контролем наставника
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── 6-card grid ───────────────────────────────────────────── */}
        <Stagger
          className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          stagger={0.08}
        >
          {POINTS.map((p) => (
            <StaggerItem key={p.n}>
              <article
                className="card-hover h-full rounded-2xl border p-6 backdrop-blur-sm"
                style={{
                  borderColor: `rgba(${YLW_RGB},0.08)`,
                  backgroundColor: `rgba(${YLW_RGB},0.025)`,
                }}
              >
                {/* Number badge */}
                <div
                  className="num-badge mb-4 flex h-9 w-9 items-center justify-center rounded-xl border text-[0.62rem] font-black tabular-nums"
                  style={{
                    borderColor: `rgba(${YLW_RGB},0.22)`,
                    backgroundColor: `rgba(${YLW_RGB},0.07)`,
                    color: YLW,
                  }}
                >
                  {p.n}
                </div>
                <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/48">{p.text}</p>

                {/* Bottom accent line — grows on hover via .card-hover .accent-line CSS */}
                <div className="mt-5 accent-line" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ── CTA block ─────────────────────────────────────────────── */}
        <motion.div
          className="relative mt-12 overflow-hidden rounded-3xl border"
          style={{
            borderColor: `rgba(${YLW_RGB},0.12)`,
            background: `rgba(${YLW_RGB},0.03)`,
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-48px' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {/* Top accent line */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            aria-hidden
            style={{ background: `linear-gradient(to right, transparent, rgba(${YLW_RGB},0.38) 40%, rgba(${YLW_RGB},0.38) 60%, transparent)` }}
          />

          <div className="flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10 lg:p-12">

            {/* Text */}
            <div className="max-w-lg">
              <p
                className="font-semibold leading-snug text-white"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.018em' }}
              >
                Запишитесь на{' '}
                <span style={{ color: YLW }}>бесплатное первое занятие</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/45">
                Ребёнок попробует себя в автоспорте, а вы сможете задать вопросы наставникам.
              </p>
            </div>

            {/* CTA button */}
            <a
              href="#contacts"
              onClick={(e) => { e.preventDefault(); scrollToSectionId('contacts') }}
              className="btn-ylw inline-flex shrink-0 items-center justify-center rounded-full px-8 py-4 text-sm font-bold text-[#070708]"
              style={{ background: YLW }}
            >
              Записаться
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
