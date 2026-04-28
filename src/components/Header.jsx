import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { scrollToSectionId } from '../utils/scrollToId'

const YLW     = '#D6FF00'
const YLW_RGB = '214, 255, 0'

/* ─── Nav config ─────────────────────────────────────────────────────────
   id's must match the actual id="" on the <section> elements:
     Hero          → id="home"
     WhyUs         → id="about"
     TrainingProgram → id="program"
     Safety        → id="safety"
     Contacts      → id="contacts"
──────────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Главная',      id: 'home'     },
  { label: 'О школе',      id: 'about'    },
  { label: 'Программа',    id: 'program'  },
  { label: 'Безопасность', id: 'safety'   },
  { label: 'Контакты',     id: 'contacts' },
]

const SECTION_IDS = NAV_LINKS.map(l => l.id)
const HEADER_H    = 76   // px — approx rendered header height

/* ─── Active-section calculation ─────────────────────────────────────────
   Algorithm:
     Iterate sections in DOM order. The active section is the LAST one
     whose top edge has scrolled above (HEADER_H + BUFFER).

   Why getBoundingClientRect instead of offsetTop:
     Several sections live inside a `position:relative` wrapper in App.jsx.
     offsetTop is relative to the nearest positioned ancestor, so it gives
     wrong page-absolute values for those sections.
     getBoundingClientRect().top + window.scrollY is always page-absolute.

   Why not IntersectionObserver:
     IO with a single rootMargin can observe multiple sections simultaneously.
     pickActive() would then pick the topmost one by DOM order, which is
     incorrect when the user is inside a lower section that shares the zone
     with a partially-visible upper section.
──────────────────────────────────────────────────────────────────────── */
// BUFFER must exceed (scroll-margin-top - HEADER_H) of navigable sections.
// All sections use scroll-mt-24 (96 px). After scrollIntoView the section top
// lands at 96 px from viewport top, so we need HEADER_H + BUFFER > 96.
// 76 + 30 = 106 > 96 ✓  (extra 10 px safety margin)
const BUFFER = 30

function calcActive() {
  const trigger = window.scrollY + HEADER_H + BUFFER

  // Special case: near bottom of page → always "contacts"
  const atBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4

  if (atBottom) return SECTION_IDS[SECTION_IDS.length - 1]

  let current = SECTION_IDS[0]
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = el.getBoundingClientRect().top + window.scrollY
    if (top <= trigger) current = id
  }
  return current
}

/* ─── Logo ───────────────────────────────────────────────────────────── */
function Logo({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex shrink-0 items-center gap-2.5"
      aria-label="СТК Слава — на главную"
    >
      <div
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 group-hover:scale-105"
        style={{ borderColor: `rgba(${YLW_RGB},0.40)`, background: `rgba(${YLW_RGB},0.08)` }}
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
          <path
            d="M5 4l5 6-5 6M10 4l5 6-5 6"
            stroke={YLW}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full"
          style={{ background: YLW, boxShadow: `0 0 6px ${YLW}` }}
        />
      </div>
      <div>
        <p className="flex flex-wrap text-sm font-black uppercase tracking-[0.14em] text-white transition-colors duration-200 group-hover:text-[#D6FF00]">
          СТК Слава
        </p>
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white/38">
          Спортивно технический клуб
        </p>
      </div>
    </button>
  )
}

/* ─── Burger ─────────────────────────────────────────────────────────── */
function Burger({ open }) {
  const s = 'block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300'
  return (
    <span className="flex flex-col items-center gap-[5px]" aria-hidden>
      <span className={`${s} ${open ? 'translate-y-[6.5px] rotate-45'   : ''}`} />
      <span className={`${s} ${open ? 'opacity-0 scale-x-0'             : ''}`} />
      <span className={`${s} ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
    </span>
  )
}

/* ─── Header ─────────────────────────────────────────────────────────── */
export function Header() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')

  // Hover-pill
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false })
  const navRef = useRef(null)

  // When a nav link is clicked we "pause" the scroll spy so that scroll
  // events fired synchronously by scrollIntoView don't override the
  // explicit activeId we just set.
  const spyPaused = useRef(false)
  const unpauseTimer = useRef(null)

  /* ── Background transition ─────────────────────────────── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* ── ScrollSpy ─────────────────────────────────────────── */
  useEffect(() => {
    const fn = () => {
      if (spyPaused.current) return   // paused while nav-click scroll settles
      setActiveId(calcActive())
    }
    // initialise after first paint (sections might not be in DOM yet)
    const t = setTimeout(() => fn(), 150)
    window.addEventListener('scroll', fn, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', fn) }
  }, [])

  /* ── Close mobile on desktop ───────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const fn = (e) => { if (e.matches) setOpen(false) }
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  /* ── Pill ──────────────────────────────────────────────── */
  const handleLinkEnter = (e) => {
    const wRect = navRef.current?.getBoundingClientRect()
    const bRect = e.currentTarget.getBoundingClientRect()
    if (!wRect) return
    setPill({ left: bRect.left - wRect.left, width: bRect.width, visible: true })
  }
  const handleNavLeave = () => setPill(p => ({ ...p, visible: false }))

  /* ── Navigate ───────────────────────────────────────────── */
  const go = useCallback((id) => {
    // 1. Immediately reflect the clicked section (no waiting for scroll events)
    setActiveId(id)

    // 2. Pause the scroll spy so that scroll events triggered by scrollIntoView
    //    cannot race-override the state we just set above.
    spyPaused.current = true
    clearTimeout(unpauseTimer.current)

    // 3. Scroll to the target
    scrollToSectionId(id)

    // 4. Re-enable spy after the scroll animation has finished (~instant here,
    //    but 500 ms covers smooth-scroll browsers too) and re-sync position.
    unpauseTimer.current = setTimeout(() => {
      spyPaused.current = false
      setActiveId(calcActive())
    }, 500)

    setOpen(false)
  }, [])

  /* ── Render ────────────────────────────────────────────── */
  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Glassmorphism background */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-500"
        style={{
          background:           scrolled ? 'rgba(7,7,8,0.82)' : 'transparent',
          backdropFilter:       scrolled ? 'blur(18px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
          borderBottom:         scrolled ? `1px solid rgba(${YLW_RGB},0.08)` : '1px solid transparent',
          boxShadow:            scrolled ? `0 1px 0 0 rgba(${YLW_RGB},0.05), 0 8px 40px rgba(0,0,0,0.45)` : 'none',
        }}
        aria-hidden
      />

      {/* Racing stripe */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] origin-left"
            style={{ background: `linear-gradient(to right, ${YLW}, rgba(${YLW_RGB},0.22) 65%, transparent)` }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* ── Bar ──────────────────────────────────────────── */}
      <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">

        <Logo onClick={() => go('home')} />

        {/* Desktop nav */}
        <nav
          className="hidden flex-1 items-center justify-center md:flex"
          aria-label="Основная навигация"
        >
          <LayoutGroup id="nav">
            <div
              ref={navRef}
              className="relative flex items-center gap-0.5"
              onMouseLeave={handleNavLeave}
            >
              {/* Hover pill */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 rounded-full"
                style={{
                  background: `rgba(${YLW_RGB},0.08)`,
                  border:     `1px solid rgba(${YLW_RGB},0.16)`,
                }}
                animate={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
                transition={{
                  left:    { type: 'spring', stiffness: 420, damping: 36, mass: 0.8 },
                  width:   { type: 'spring', stiffness: 420, damping: 36, mass: 0.8 },
                  opacity: { duration: 0.14 },
                }}
              />

              {NAV_LINKS.map(({ label, id }) => {
                const isActive = activeId === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => go(id)}
                    onMouseEnter={handleLinkEnter}
                    className="relative z-10 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-150"
                    style={{ color: isActive ? YLW : 'rgba(255,255,255,0.62)' }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}

                    {/* Animated racing underline — shared layout, slides between items */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden
                        className="absolute inset-x-2 bottom-[3px] h-[2px] rounded-full"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${YLW} 20%, ${YLW} 80%, transparent)`,
                          boxShadow:  `0 0 6px 1px rgba(${YLW_RGB},0.55)`,
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.6 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 md:block">
          <button
            type="button"
            onClick={() => go('contacts')}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#070708] transition-all duration-300 active:scale-[0.97]"
            style={{ background: YLW }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 20px rgba(${YLW_RGB},0.40)` }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
          >
            Записаться
          </button>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen(v => !v)}
        >
          <Burger open={open} />
        </button>
      </div>

      {/* ── Mobile menu ──────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div
              className="relative border-t px-4 pb-5 pt-2"
              style={{
                background:     'rgba(7,7,8,0.96)',
                backdropFilter: 'blur(24px)',
                borderColor:    `rgba(${YLW_RGB},0.10)`,
              }}
            >
              {/* Grid bg */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:`linear-gradient(rgba(${YLW_RGB},0.025) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(${YLW_RGB},0.025) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
                aria-hidden
              />

              <div className="relative flex flex-col gap-1">
                {NAV_LINKS.map(({ label, id }, i) => {
                  const isActive = activeId === id
                  return (
                    <motion.button
                      key={id}
                      type="button"
                      onClick={() => go(id)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-colors duration-150"
                      style={{
                        color:      isActive ? YLW : 'rgba(255,255,255,0.72)',
                        background: isActive ? `rgba(${YLW_RGB},0.07)` : 'transparent',
                        borderLeft: isActive ? `2px solid ${YLW}` : '2px solid transparent',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{label}</span>
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: YLW, boxShadow: `0 0 6px ${YLW}` }}
                          aria-hidden
                        />
                      )}
                    </motion.button>
                  )
                })}

                <motion.button
                  type="button"
                  onClick={() => go('contacts')}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.045 + 0.04, duration: 0.28 }}
                  className="mt-3 w-full rounded-xl py-3.5 text-sm font-semibold text-[#070708] transition-all active:scale-[0.98]"
                  style={{ background: YLW, boxShadow: `0 4px 18px rgba(${YLW_RGB},0.22)` }}
                >
                  Записаться на обучение
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
