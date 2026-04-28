import { motion } from 'framer-motion'
import { IconShield, IconTrophy, IconWheel } from './Icons'
import { BlurReveal, FadeUp, Stagger, StaggerItem } from './Animate'

const YLW     = '#D6FF00'
const YLW_RGB = '214, 255, 0'

const ADVANTAGES = [
  {
    Icon: IconShield,
    title: 'Безопасность без компромиссов',
    text: 'Полная экипировка, безопасная трасса, постоянный контроль тренеров на каждом занятии.',
  },
  {
    Icon: IconTrophy,
    title: 'До реальных соревнований',
    text: 'Не просто катание — системный путь от первого заезда до официальных гонок региона.',
  },
  {
    Icon: IconWheel,
    title: 'Техника и инженерия',
    text: 'Дети изучают устройство карта, учатся думать как пилот и понимать машину изнутри.',
  },
]

export function WhyUs() {
  return (
    <section
      id="about"
      className="scroll-mt-24 relative overflow-hidden border-t border-white/[0.06] bg-[#070708] py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(${YLW_RGB},0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${YLW_RGB},0.022) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-[0.07]"
        style={{ background: `radial-gradient(ellipse at center, ${YLW}, transparent 70%)` }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl lg:mx-0">
          <BlurReveal delay={0}>
            <p className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.38em]" style={{ color: YLW }}>
              О школе
            </p>
          </BlurReveal>
          <BlurReveal delay={0.08}>
            <h2
              className="text-balance font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
            >
              СТК Слава — воспитываем пилотов,{' '}
              <span style={{ color: YLW }}>а не просто учим ездить</span>
            </h2>
          </BlurReveal>
          <FadeUp delay={0.18}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/58 lg:text-[1.0625rem]">
              Мы работаем в Оренбурге с детьми от 5 лет. Наша программа — это не просто
              катание на карте. Это системный путь: теория, техника, тренировки на трассе
              и реальные соревнования. Каждый ребёнок растёт по своему темпу, под
              наблюдением опытных тренеров.
            </p>
          </FadeUp>
        </div>

        {/* Divider */}
        <motion.div
          className="my-12 h-px w-full"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-64px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          style={{
            transformOrigin: 'left',
            background: `linear-gradient(to right, rgba(${YLW_RGB},0.18), transparent 60%)`,
          }}
        />

        {/* Cards — staggered, CSS hover via .card-hover */}
        <Stagger className="grid gap-4 sm:grid-cols-3" stagger={0.12}>
          {ADVANTAGES.map(({ Icon, title, text }) => (
            <StaggerItem key={title}>
              {/* card-hover: CSS handles border, bg, lift, box-shadow on hover */}
              <article
                className="card-hover group/card h-full rounded-2xl border p-7 backdrop-blur-sm"
                style={{
                  borderColor: `rgba(${YLW_RGB},0.10)`,
                  backgroundColor: `rgba(${YLW_RGB},0.03)`,
                }}
              >
                {/* num-badge: icon container glows when parent card-hover is hovered */}
                <div
                  className="num-badge mb-5 flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: `rgba(${YLW_RGB},0.20)`,
                    backgroundColor: `rgba(${YLW_RGB},0.06)`,
                  }}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/52">{text}</p>

                {/* accent-line: CSS grows width on .card-hover:hover */}
                <div className="mt-5 accent-line" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
