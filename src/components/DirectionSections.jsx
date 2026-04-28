import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { directionSections } from '../data/siteContent'
import { scrollToSectionId } from '../utils/scrollToId'
import { AnimatedText } from './AnimatedText'

// Stagger variants for bullet list
const bulletContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const bulletItem = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
}

// Reusable fade-up helper — does NOT propagate variants to avoid conflicts with AnimatedText
function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function DirectionSection({ section, index }) {
  const sectionRef = useRef(null)

  // Scroll progress for this section only (parallax + glow)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax for the giant background number
  const bgNumY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  // Glow "breathes" in sync with scroll position
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.04, 0.1, 0.1, 0.04])

  const imageLeft = index % 2 === 0
  const num = String(index + 1).padStart(2, '0')

  return (
    <section
      ref={sectionRef}
      id={section.anchor}
      className="scroll-mt-28 relative overflow-hidden border-b border-white/[0.06] py-20 sm:py-28 lg:py-32"
    >
      {/* ── Background: subtle grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Background: aurora glow blob ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity }}
        className={`pointer-events-none absolute h-[50vw] max-h-[520px] w-[50vw] max-w-[520px] rounded-full bg-[var(--color-accent)] blur-[100px] ${
          imageLeft ? '-right-40 top-1/3' : '-left-40 top-1/3'
        }`}
      />

      {/* ── Background: parallax giant section number ── */}
      <motion.div
        aria-hidden
        style={{ y: bgNumY }}
        className="pointer-events-none absolute inset-0 flex select-none items-center overflow-hidden"
      >
        <span
          className="absolute right-0 font-black leading-none text-white"
          style={{
            fontSize: 'clamp(7rem, 18vw, 18rem)',
            opacity: 0.03,
            letterSpacing: '-0.05em',
            right: '2%',
          }}
        >
          {num}
        </span>
      </motion.div>

      {/* ── Main content grid ── */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className={`img-zoom relative rounded-2xl border border-white/[0.09] ${
            imageLeft ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="aspect-[16/11] sm:aspect-[16/10]">
            <img
              src={section.image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Glass overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/[0.03]" />
          {/* Accent bottom line */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
        </motion.div>

        {/* Text block — glass card */}
        <div className={imageLeft ? 'lg:order-2' : 'lg:order-1'}>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-sm sm:p-8">

            {/* Eyebrow */}
            <FadeUp delay={0.05}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Направление
              </p>
            </FadeUp>

            {/* Title — AnimatedText handles word-by-word animation */}
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              <AnimatedText text={section.title} />
            </h2>

            {/* Subtitle */}
            <FadeUp delay={0.14}>
              <p className="mt-4 text-base leading-relaxed text-white/60">{section.subtitle}</p>
            </FadeUp>

            {/* Bullets with stagger */}
            <motion.ul
              variants={bulletContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-7 space-y-3"
            >
              {section.bullets.map((item) => (
                <motion.li
                  key={item}
                  variants={bulletItem}
                  className="flex items-start gap-3 text-sm text-white/80 sm:text-base"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                    aria-hidden
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA button with magnetic hover */}
            <FadeUp delay={0.28}>
              <motion.button
                type="button"
                onClick={() => scrollToSectionId('contacts')}
                whileHover={{
                  scale: 1.03,
                  y: -3,
                  boxShadow: '0 14px 38px -8px rgba(201,169,98,0.5)',
                  transition: { duration: 0.22, ease: 'easeOut' },
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.12 },
                }}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold text-[#0a0a0b] shadow-lg shadow-[var(--color-accent)]/20 sm:px-8"
              >
                Пробное занятие
              </motion.button>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DirectionSections() {
  return (
    <div className="border-t border-white/[0.06] bg-transparent">
      {directionSections.map((section, index) => (
        <DirectionSection key={section.anchor} section={section} index={index} />
      ))}
    </div>
  )
}
