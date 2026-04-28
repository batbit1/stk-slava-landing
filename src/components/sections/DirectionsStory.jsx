import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { directionSections } from '../../data/siteContent'
import { scrollToSectionId } from '../../utils/scrollToId'

const MotionSection = motion.section
const MotionDiv = motion.div

export default function DirectionsStory() {
  const containerRef = useRef(null)
  const scenes = useMemo(() => directionSections.slice(0, 5), [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const totalScenes = scenes.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const accelerated = Math.min(0.999, value * 1.24)
    const segmented = Math.min(totalScenes - 1, Math.floor(accelerated * totalScenes))
    setActiveIndex((prev) => {
      if (segmented === prev) return prev
      setDirection(segmented > prev ? 1 : -1)
      return segmented
    })
  })

  const activeScene = scenes[activeIndex]
  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 44 : -44, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -34 : 34, scale: 0.975 }),
  }

  return (
    <MotionSection
      id="directions"
      ref={containerRef}
      className="relative h-[210vh] bg-[#070708] md:h-[230vh] lg:h-[250vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
            <AnimatePresence mode="wait" custom={direction}>
              <MotionDiv
                key={activeScene.anchor}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14"
              >
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8 lg:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    Направления
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]/80">
                    {activeIndex + 1} / {totalScenes}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    Направление
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {activeScene.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                    {activeScene.subtitle}
                  </p>
                  {activeScene.bullets?.length ? (
                    <ul className="mt-7 space-y-2.5 text-sm text-white/82 sm:text-base">
                      {activeScene.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => scrollToSectionId('contacts')}
                    className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 text-sm font-semibold text-[#0a0a0b] shadow-lg shadow-[var(--color-accent)]/20 transition hover:brightness-110 active:scale-[0.98]"
                  >
                    Пробное занятие
                  </button>
                </div>

                <div className="relative min-h-[16rem] overflow-hidden rounded-3xl border border-white/[0.08] bg-black/30 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] sm:min-h-[20rem] lg:min-h-[28rem]">
                  <img
                    src={activeScene.image}
                    alt={activeScene.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/38 to-transparent" />
                </div>
              </MotionDiv>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}
