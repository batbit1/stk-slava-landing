import { FadeIn } from './Animate'

const YLW_RGB = '214, 255, 0'

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#070708] py-10">
      {/* Top accent line */}
      <div
        className="absolute left-0 top-0 h-px w-full"
        style={{
          background: `linear-gradient(to right, transparent 0%, rgba(${YLW_RGB},0.18) 40%, rgba(${YLW_RGB},0.18) 60%, transparent 100%)`,
        }}
        aria-hidden
      />

      <FadeIn delay={0.05}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-white/30 sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="font-medium text-white/50">СТК Слава</span>
            {' '}— Школа автоспорта для детей. Оренбург.
          </p>
          <p className="max-w-sm sm:text-right">
            Информация на сайте носит ознакомительный характер и не является публичной офертой.
          </p>
        </div>
      </FadeIn>
    </footer>
  )
}
