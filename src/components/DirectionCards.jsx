import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { AnimatedBackgroundLines } from './AnimatedBackgroundLines'

const YLW     = '#D6FF00'
const YLW_RGB = '214, 255, 0'
const EASE    = [0.22, 1, 0.36, 1]

/*
  image — replace local paths with real photos when available:
  /basics-card.png, /driving-card.png, /engineering-card.png, /racing-card.png
  Simulator uses a stable Unsplash URL as placeholder.
*/
const DIRS = [
  {
    n:      '01',
    label:  'Основы',
    title:  'ОСНОВЫ И ПОДГОТОВКА',
    desc:   'Первый этап для ребёнка: знакомство с автоспортом, правилами безопасности, экипировкой, базовой посадкой, рулением, торможением и поведением на трассе. Здесь формируется дисциплина, внимание и уверенность.',
    skills: ['безопасность и экипировка', 'базовая посадка', 'работа рулём и тормозом', 'первые упражнения на трассе'],
    image:  '/basics-card.png',
  },
  {
    n:      '02',
    label:  'Вождение',
    title:  'ВОЖДЕНИЕ',
    desc:   'Практическое управление картингом: траектория, скорость, торможение, прохождение поворотов, контроль дистанции и развитие реакции. Ребёнок учится чувствовать технику и уверенно двигаться по трассе.',
    skills: ['траектории и повороты', 'контроль скорости', 'реакция и внимание', 'уверенное управление картингом'],
    image:  '/driving-card.png',
  },
  {
    n:      '03',
    label:  'Симуляторы',
    title:  'ТРЕНИРОВКИ НА СИМУЛЯТОРАХ',
    desc:   'Симуляторы помогают безопасно отрабатывать реакцию, траектории, работу с рулём, концентрацию и гоночное мышление. Это хороший способ подготовиться к реальной трассе и разобрать ошибки.',
    skills: ['развитие реакции', 'работа с траекторией', 'концентрация', 'разбор ошибок'],
    image:  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80&auto=format&fit=crop',
  },
  {
    n:      '04',
    label:  'Инженерия',
    title:  'СОЗДАНИЕ КАРТИНГОВ',
    desc:   'Дети знакомятся с устройством картинга, изучают узлы, механику и принципы работы техники. Это направление развивает инженерное мышление и помогает ребёнку понимать, как устроен настоящий гоночный аппарат.',
    skills: ['устройство картинга', 'механика и узлы', 'обслуживание техники', 'инженерное мышление'],
    image:  '/engineering-card.png',
  },
  {
    n:      '05',
    label:  'Соревнования',
    title:  'СОРЕВНОВАНИЯ',
    desc:   'Финальный этап подготовки — участие в заездах и соревнованиях. Ребёнок учится справляться с волнением, соблюдать спортивную дисциплину, анализировать результаты и расти как пилот.',
    skills: ['подготовка к стартам', 'спортивная дисциплина', 'работа с волнением', 'рост пилота'],
    image:  '/racing-card.png',
  },
]

/* ─── Desktop: sticky scroll-storytelling ─────────────────────────────────── */
function DesktopShowcase({ sectionRef }) {
  const [activeIdx, setActiveIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const raw = Math.floor(p * DIRS.length)
    setActiveIdx(Math.min(DIRS.length - 1, Math.max(0, raw)))
  })

  const active = DIRS[activeIdx]

  return (
    <div className="sticky top-0 h-screen overflow-hidden bg-[#070708]">

      {/* Layered backgrounds */}
      <AnimatedBackgroundLines />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(${YLW_RGB},0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${YLW_RGB},0.022) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-px"
        aria-hidden
        style={{ background: `linear-gradient(to right, transparent, rgba(${YLW_RGB},0.28), transparent)` }}
      />

      {/* Progress bar — grows from left as user scrolls */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-px"
        aria-hidden
        style={{ background: `rgba(${YLW_RGB},0.07)` }}
      />
      <motion.div
        className="absolute bottom-0 left-0 z-20 h-[2px] rounded-r-full"
        aria-hidden
        style={{ background: YLW, boxShadow: `0 0 10px 1px rgba(${YLW_RGB},0.55)` }}
        animate={{ width: `${((activeIdx + 1) / DIRS.length) * 100}%` }}
        transition={{ duration: 0.55, ease: EASE }}
      />

      {/* ── Main layout: flex column ────────────────────────────────────────── */}
      <div className="relative flex h-full flex-col">

        {/* Header row */}
        <div className="flex shrink-0 items-end justify-between px-12 pb-7 pt-12 xl:px-16 xl:pt-14">
          <div>
            <p
              className="text-[0.58rem] font-bold uppercase tracking-[0.38em]"
              style={{ color: YLW }}
            >
              Школа автоспорта · СТК Слава
            </p>
            <h2
              className="mt-2 font-semibold text-white"
              style={{ fontSize: 'clamp(1.3rem, 2vw, 1.9rem)', letterSpacing: '-0.025em' }}
            >
              Направления подготовки
            </h2>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/38">
              Каждое направление помогает ребёнку пройти путь от первого знакомства с
              картингом до уверенного участия в соревнованиях.
            </p>
          </div>

          {/* Progress counter */}
          <div className="shrink-0 text-right">
            <p
              className="text-[0.55rem] font-bold uppercase tracking-[0.28em]"
              style={{ color: `rgba(${YLW_RGB},0.42)` }}
            >
              Направление
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="mt-1 font-black tabular-nums"
                style={{
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                  color: YLW,
                  letterSpacing: '-0.04em',
                }}
              >
                {active.n}
                <span className="ml-1.5 text-sm font-light" style={{ color: 'rgba(255,255,255,0.22)' }}>
                  / 05
                </span>
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Thin separator */}
        <div
          className="mx-12 h-px shrink-0 xl:mx-16"
          style={{ background: `rgba(${YLW_RGB},0.08)` }}
        />

        {/* 3-column body */}
        <div className="relative flex min-h-0 flex-1 px-12 xl:px-16">

          {/* ── Left: navigation list ─────────────────────────── */}
          <div className="flex w-48 shrink-0 flex-col justify-center gap-0 pr-6 xl:w-56 xl:pr-8">
            {DIRS.map((d, i) => {
              const isActive = i === activeIdx
              return (
                <motion.div
                  key={d.n}
                  className="relative flex cursor-default items-center gap-3 py-3.5 pl-5"
                  animate={{ opacity: isActive ? 1 : 0.28 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Active bar */}
                  <motion.div
                    className="absolute left-0 top-[7px] bottom-[7px] w-[2px] rounded-full"
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scaleY: isActive ? 1 : 0.35,
                    }}
                    style={{
                      background: YLW,
                      boxShadow: `0 0 7px 1px rgba(${YLW_RGB},0.55)`,
                      transformOrigin: 'center',
                    }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                  <span
                    className="text-[0.58rem] font-black tabular-nums"
                    style={{ color: isActive ? YLW : 'rgba(255,255,255,0.32)' }}
                  >
                    {d.n}
                  </span>
                  <span
                    className="text-[0.8rem] font-medium leading-tight"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.32)' }}
                  >
                    {d.label}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Left divider */}
          <div
            className="my-10 w-px shrink-0"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(${YLW_RGB},0.13) 25%, rgba(${YLW_RGB},0.13) 75%, transparent)`,
            }}
          />

          {/* ── Center: big animated title ────────────────────── */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-10 xl:px-14">

            {/* Background photo — cross-fades between directions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: EASE }}
                className="absolute inset-0"
                aria-hidden
                style={{
                  backgroundImage: `url(${active.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </AnimatePresence>

            {/* Overlay — darkens for readability + blends left/right edges into columns */}
            <div
              className="absolute inset-0 z-[1]"
              aria-hidden
              style={{
                background: `
                  linear-gradient(to right, #070708 0%, rgba(7,7,8,0.05) 22%, rgba(7,7,8,0.05) 78%, #070708 100%),
                  linear-gradient(to bottom, rgba(7,7,8,0.55) 0%, rgba(7,7,8,0.22) 30%, rgba(7,7,8,0.22) 70%, rgba(7,7,8,0.55) 100%),
                  rgba(7,7,8,0.48)
                `,
              }}
            />

            {/* Watermark number — z-[2] sits above overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-[2] flex select-none items-center justify-center overflow-hidden"
              aria-hidden
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`wm-${activeIdx}`}
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.65, ease: EASE }}
                  className="font-black tabular-nums leading-none"
                  style={{
                    fontSize: 'clamp(8rem, 19vw, 21rem)',
                    color: `rgba(${YLW_RGB},0.03)`,
                    letterSpacing: '-0.08em',
                  }}
                >
                  {active.n}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Main title — z-[2] above overlay */}
            <AnimatePresence mode="wait">
              <motion.h3
                key={`title-${activeIdx}`}
                initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative z-[2] text-center font-bold text-white"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 5.25rem)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.04em',
                  textShadow: `0 0 80px rgba(${YLW_RGB},0.12)`,
                }}
              >
                {active.title}
              </motion.h3>
            </AnimatePresence>
          </div>

          {/* Right divider */}
          <div
            className="my-10 w-px shrink-0"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(${YLW_RGB},0.13) 25%, rgba(${YLW_RGB},0.13) 75%, transparent)`,
            }}
          />

          {/* ── Right: description ────────────────────────────── */}
          <div className="flex w-60 shrink-0 flex-col justify-center pl-10 xl:w-72 xl:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${activeIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.42, ease: EASE, delay: 0.08 }}
              >
                <p className="text-sm leading-[1.78] text-white/52 xl:text-[0.9375rem]">
                  {active.desc}
                </p>

                {/* Skill tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border px-2.5 py-[3px] text-[0.6rem] font-semibold uppercase tracking-[0.12em]"
                      style={{
                        borderColor: `rgba(${YLW_RGB},0.22)`,
                        color: YLW,
                        backgroundColor: `rgba(${YLW_RGB},0.06)`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <motion.div
                  key={`accent-${activeIdx}`}
                  initial={{ width: 0 }}
                  animate={{ width: 44 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
                  className="mt-6 h-px rounded-full"
                  style={{ background: `linear-gradient(to right, ${YLW}, rgba(${YLW_RGB},0))` }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
        {/* end 3-column body */}
      </div>
      {/* end flex layout */}
    </div>
  )
}

/* ─── Mobile: vertical card list ──────────────────────────────────────────── */
function MobileList() {
  return (
    <div className="px-5 py-20 sm:px-8">
      {/* Section header */}
      <div className="mb-10">
        <p
          className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.38em]"
          style={{ color: YLW }}
        >
          СТК Слава
        </p>
        <h2
          className="font-semibold text-white"
          style={{ fontSize: 'clamp(1.6rem, 6vw, 2.25rem)', letterSpacing: '-0.025em' }}
        >
          Направления подготовки
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/40">
          Каждое направление помогает ребёнку пройти путь от первого знакомства с
          картингом до уверенного участия в соревнованиях.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {DIRS.map((d, i) => (
          <motion.div
            key={d.n}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
            className="card-hover rounded-2xl border p-5"
            style={{
              borderColor: `rgba(${YLW_RGB},0.10)`,
              backgroundColor: `rgba(${YLW_RGB},0.03)`,
            }}
          >
            {/* Card header */}
            <div className="mb-3 flex items-center gap-3">
              <span
                className="num-badge flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.58rem] font-black tabular-nums"
                style={{
                  borderColor: `rgba(${YLW_RGB},0.30)`,
                  backgroundColor: `rgba(${YLW_RGB},0.07)`,
                  color: YLW,
                }}
              >
                {d.n}
              </span>
              <div>
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/38">{d.label}</p>
                <h3 className="text-base font-semibold text-white leading-tight">{d.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/50">{d.desc}</p>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {d.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border px-2 py-[2px] text-[0.58rem] font-semibold uppercase tracking-[0.1em]"
                  style={{
                    borderColor: `rgba(${YLW_RGB},0.22)`,
                    color: YLW,
                    backgroundColor: `rgba(${YLW_RGB},0.06)`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Root export (same name — App.jsx unchanged) ─────────────────────────── */
export function DirectionCards() {
  const stageRef = useRef(null)

  return (
    <section
      id="directions"
      className="relative bg-[#070708]"
      style={{ scrollMarginTop: '90px' }}
    >
      <div ref={stageRef}>

        {/* Desktop: tall wrapper drives scroll progress */}
        <div
          className="hidden lg:block"
          style={{ height: `${DIRS.length * 70}vh` }}
        >
          <DesktopShowcase sectionRef={stageRef} />
        </div>

        {/* Mobile: plain vertical list, no sticky */}
        <div className="block lg:hidden">
          <MobileList />
        </div>
      </div>
    </section>
  )
}
