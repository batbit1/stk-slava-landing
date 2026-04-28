import { BlurReveal, Stagger, StaggerItem } from './Animate'

const YLW_RGB = '214, 255, 0'

const placeholderLogos = ['Партнёр 1', 'Партнёр 2', 'Партнёр 3', 'Партнёр 4']

export function Sponsors() {
  return (
    <section className="border-t border-white/[0.06] bg-[#070708] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <BlurReveal className="text-center" delay={0}>
          <p className="mb-2 text-[0.58rem] font-bold uppercase tracking-[0.36em] text-white/35">
            Партнёры и спонсоры
          </p>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/38">
            Открыты к сотрудничеству с брендами, разделяющими ценности безопасного
            детского спорта и технологичного образования.
          </p>
        </BlurReveal>

        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" stagger={0.08}>
          {placeholderLogos.map((name) => (
            <StaggerItem key={name}>
              <div
                className="flex aspect-[5/2] items-center justify-center rounded-xl border border-dashed px-4 text-[0.62rem] font-medium uppercase tracking-wider text-white/22 transition-all duration-300 hover:border-white/18 hover:text-white/40"
                style={{ borderColor: `rgba(${YLW_RGB},0.10)` }}
              >
                {name}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
