import { motion } from 'framer-motion'
import { BlurReveal, FadeUp } from './Animate'

const YLW     = '#D6FF00'
const YLW_RGB = '214, 255, 0'
const EASE    = [0.22, 1, 0.36, 1]

const STEPS = [
  {
    n:     '01',
    title: 'Знакомство с картингом',
    text:  'Первое занятие — без давления и соревнований. Ребёнок садится в карт, знакомится с трассой, узнаёт об экипировке и базовых правилах поведения на картодроме.',
  },
  {
    n:     '02',
    title: 'Безопасность и базовое управление',
    text:  'Шлем, защита, правильная посадка, взгляд вперёд. Ребёнок учится работать рулём, тормозить и разгоняться в безопасном темпе под контролем тренера.',
  },
  {
    n:     '03',
    title: 'Тренировки на трассе',
    text:  'Регулярные занятия на картодроме: траектории, повороты, торможение перед апексом, управление дистанцией. Развивается реакция, внимание и уверенность.',
  },
  {
    n:     '04',
    title: 'Техническая подготовка',
    text:  'Дети изучают устройство карта, основы механики и принципы работы техники. Это развивает инженерное мышление и помогает ребёнку понять, как управлять машиной осознанно.',
  },
  {
    n:     '05',
    title: 'Соревнования и рост пилота',
    text:  'Когда пилот готов — он выходит на старт. Разбор заездов, работа с волнением, спортивная дисциплина и индивидуальная траектория развития от новичка до уверенного гонщика.',
  },
]

export function TrainingProgram() {
  return (
    <section
      id="program"
      className="scroll-mt-24 relative overflow-hidden border-t border-white/[0.06] bg-[#070708] py-24 sm:py-32"
    >
      {/* Racing grid bg */}
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

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl lg:mx-0">
          <BlurReveal delay={0}>
            <p className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.38em]" style={{ color: YLW }}>
              Программа обучения
            </p>
          </BlurReveal>
          <BlurReveal delay={0.08}>
            <h2
              className="text-balance font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
            >
              Путь от первого заезда{' '}
              <span style={{ color: YLW }}>до соревнований</span>
            </h2>
          </BlurReveal>
          <FadeUp delay={0.16}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
              Пять последовательных этапов — каждый закрепляет навыки предыдущего и готовит к следующему.
            </p>
          </FadeUp>
        </div>

        {/* ── Timeline ──────────────────────────────────────────────── */}
        <div className="mt-16 flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.n}
              className="step-hover group relative"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-48px' }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
            >
              {/* Vertical track line (hidden for last) */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute left-[27px] top-[52px] hidden h-full w-px lg:block"
                  style={{ background: `linear-gradient(to bottom, rgba(${YLW_RGB},0.18), rgba(${YLW_RGB},0.04))` }}
                  aria-hidden
                />
              )}

              <div className="step-card flex gap-5 rounded-2xl border p-6 lg:gap-8 lg:p-8"
                style={{
                  borderColor: `rgba(${YLW_RGB},0.08)`,
                  backgroundColor: `rgba(${YLW_RGB},0.02)`,
                }}
              >
                {/* Number badge */}
                <div
                  className="num-badge relative z-10 flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-xl border text-sm font-black tabular-nums"
                  style={{
                    borderColor: `rgba(${YLW_RGB},0.22)`,
                    backgroundColor: `rgba(${YLW_RGB},0.06)`,
                    color: YLW,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.04em',
                  }}
                >
                  {step.n}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-base font-semibold tracking-tight text-white lg:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/52 lg:text-[0.9375rem]">
                    {step.text}
                  </p>

                  {/* Accent line — CSS grows on .step-hover:hover */}
                  <div className="mt-4 accent-line" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
