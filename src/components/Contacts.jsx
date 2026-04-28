import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactInfo } from '../data/siteContent'
import { BlurReveal, FadeUp, Stagger, StaggerItem } from './Animate'

const YLW     = '#D6FF00'
const YLW_RGB = '214, 255, 0'
const EASE    = [0.22, 1, 0.36, 1]

const AGE_OPTIONS = [
  '5 лет', '6 лет', '7 лет', '8 лет', '9 лет',
  '10 лет', '11 лет', '12 лет', '13 лет', '14 лет', '15+ лет',
]

/* ── Phone mask helpers ──────────────────────────────────────────────────── */

// Extract up to 10 raw digits after the country code
function toPhoneDigits(raw) {
  const d = raw.replace(/\D/g, '')
  // strip leading 7 or 8 (handles pasted "+79…" / "89…" / "79…")
  return (d.startsWith('7') || d.startsWith('8')) ? d.slice(1, 11) : d.slice(0, 10)
}

// Format 0-10 raw digits → "+7 (XXX) XXX-XX-XX" (partial is fine while typing)
function formatPhoneMask(digits) {
  if (!digits) return '+7'
  let s = '+7 (' + digits.slice(0, 3)
  if (digits.length < 3) return s
  s += ') ' + digits.slice(3, 6)
  if (digits.length < 6) return s
  s += '-' + digits.slice(6, 8)
  if (digits.length < 8) return s
  s += '-' + digits.slice(8, 10)
  return s
}

// Normalize any entered phone to 11 digits starting with 7.
function normalizePhoneForSubmit(raw) {
  let digits = raw.replace(/\D/g, '')
  if (digits.length === 10) digits = `7${digits}`
  if (digits.length === 11 && digits.startsWith('8')) digits = `7${digits.slice(1)}`
  return digits
}

/* ── Masked phone input ──────────────────────────────────────────────────── */
function PhoneInput({ value, onChange, hasError, id, name }) {
  function handleChange(e) {
    const digits = toPhoneDigits(e.target.value)
    onChange(formatPhoneMask(digits))
  }

  function handleKeyDown(e) {
    // prevent backspace/delete from eating the "+7" prefix
    const { selectionStart, selectionEnd } = e.target
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      selectionStart <= 2 &&
      selectionEnd <= 2
    ) {
      e.preventDefault()
    }
  }

  function handleFocus(e) {
    // always land cursor at the end so typing starts after "+7"
    const len = e.target.value.length
    requestAnimationFrame(() => e.target.setSelectionRange(len, len))
  }

  return (
    <input
      id={id}
      name={name}
      type="tel"
      inputMode="numeric"
      value={value || '+7'}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      placeholder="+7 (999) 999-99-99"
      className={inputCls(hasError)}
    />
  )
}

/* ── Icons ───────────────────────────────────────────────────────────────── */
function TelegramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  )
}


/* ── Form field wrapper ──────────────────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/45">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[0.7rem] font-medium"
            style={{ color: '#ff5a5a' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* shared input/select style */
const inputCls = (hasErr) => [
  'w-full rounded-xl border bg-white/[0.04] px-4 py-3.5',
  'text-sm text-white placeholder-white/25 outline-none',
  'transition-all duration-200',
  'focus:bg-white/[0.07]',
  hasErr
    ? 'border-[#ff5a5a]/60 focus:border-[#ff5a5a]'
    : 'border-white/[0.10] focus:border-[#D6FF00]/60',
].join(' ')

/* ── Success state ───────────────────────────────────────────────────────── */
function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center justify-center gap-6 py-16 text-center"
    >
      {/* Animated check circle */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full opacity-20 blur-xl"
          style={{ background: YLW }}
        />
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="relative">
          <circle cx="28" cy="28" r="27" stroke={YLW} strokeWidth="1.5" />
          <motion.path
            d="M16 28l9 9 15-18"
            stroke={YLW}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
          />
        </svg>
      </motion.div>

      <div>
        <p className="text-xl font-bold text-white">Заявка отправлена!</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
          Мы скоро свяжемся с вами и расскажем о бесплатном первом занятии.
        </p>
      </div>

      <div
        className="h-px w-24"
        style={{ background: `linear-gradient(to right, transparent, rgba(${YLW_RGB},0.35), transparent)` }}
      />

      <p className="text-[0.65rem] font-medium uppercase tracking-[0.26em] text-white/28">
        СТК Слава · Оренбург
      </p>
    </motion.div>
  )
}

/* ── Telegram config ─────────────────────────────────────────────────────── */
const TELEGRAM_BOT_TOKEN = '7637457851:AAHqXxrMGy58KfIBqYjc7YbhQLBAn7nXjUc'
const TELEGRAM_CHAT_ID = '8292491666'

async function sendToTelegram({ name, phone, childAge }) {
  console.log(
    'Telegram url exists:',
    Boolean(TELEGRAM_BOT_TOKEN),
    Boolean(TELEGRAM_CHAT_ID),
  )
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Missing Telegram credentials')
  }

  const text =
    `🚀 <b>Новая заявка с сайта СТК Слава</b>\n\n` +
    `👤 <b>Имя родителя:</b> ${name}\n` +
    `📞 <b>Телефон:</b> ${phone}\n` +
    `🏎 <b>Возраст ребёнка:</b> ${childAge}\n` +
    `🎁 <b>Интерес:</b> бесплатное первое занятие`

  const payload = { chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }
  console.log('Sending Telegram lead', payload)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    console.log('TELEGRAM FETCH START')
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    )
    console.log('TELEGRAM STATUS:', response.status)

    const data = await response.json()
    console.log('Telegram response:', data)

    if (!response.ok || !data.ok) {
      throw new Error(data?.description || 'Telegram API error')
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

/* ── Lead form ───────────────────────────────────────────────────────────── */
function LeadForm() {
  const [form, setForm]     = useState({ name: '', phone: '', age: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [isLoading, setIsLoading] = useState(false)

  function validate() {
    const e = {}
    const phoneDigits = normalizePhoneForSubmit(form.phone)
    if (!form.name.trim()) e.name = 'Введите имя'
    if (phoneDigits.length !== 11 || !phoneDigits.startsWith('7')) {
      e.phone = 'Введите корректный номер телефона'
    }
    if (!form.age) e.age = 'Выберите возраст ребёнка'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (isLoading) return
    console.log('MOBILE FORM SUBMIT START')

    const name = form.name.trim()
    const phone = form.phone
    const childAge = form.age
    console.log('FORM VALUES:', { name, phone, childAge })

    const phoneDigits = normalizePhoneForSubmit(phone)
    console.log('PHONE DIGITS:', phoneDigits)

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    try {
      setIsLoading(true)
      setStatus('loading')
      await sendToTelegram({
        name,
        phone: `+${phoneDigits}`,
        childAge,
      })
      setForm({ name: '', phone: '', age: '' })
      setStatus('success')
    } catch (err) {
      console.error('MOBILE FORM ERROR:', err)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <SuccessState key="success" />
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <Field label="Имя родителя" error={errors.name}>
            <input
              id="lead-name"
              name="name"
              type="text"
              placeholder="Александр"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              className={inputCls(!!errors.name)}
            />
          </Field>

          {/* Phone */}
          <Field label="Телефон" error={errors.phone}>
            <PhoneInput
              id="lead-phone"
              name="phone"
              value={form.phone}
              onChange={val => handleChange('phone', val)}
              hasError={!!errors.phone}
            />
          </Field>

          {/* Age */}
          <Field label="Возраст ребёнка" error={errors.age}>
            <select
              id="lead-child-age"
              name="childAge"
              value={form.age}
              onChange={e => handleChange('age', e.target.value)}
              className={inputCls(!!errors.age) + ' cursor-pointer appearance-none'}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23ffffff40' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
            >
              <option value="" disabled style={{ background: '#0d0d0f' }}>Выберите возраст</option>
              {AGE_OPTIONS.map(opt => (
                <option key={opt} value={opt} style={{ background: '#0d0d0f' }}>{opt}</option>
              ))}
            </select>
          </Field>

          {/* Network error banner */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                key="net-err"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-[#ff5a5a]/30 bg-[#ff5a5a]/10 px-4 py-3 text-sm text-[#ff9090]"
              >
                Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="btn-ylw relative z-10 mt-2 flex min-h-[54px] w-full items-center justify-center overflow-hidden rounded-xl text-sm font-bold text-[#070708] pointer-events-auto disabled:opacity-70"
            style={{ background: YLW }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.18 }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5"
                >
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Отправка...
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Записаться
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <p className="text-center text-[0.65rem] leading-relaxed text-white/28">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

/* ── Main section export ─────────────────────────────────────────────────── */
export function Contacts() {
  return (
    <section
      id="contacts"
      className="scroll-mt-24 relative overflow-hidden border-t border-white/[0.06] bg-[#070708] py-24 sm:py-32"
    >
      {/* Racing grid */}
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

      {/* Center glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[700px] -translate-x-1/2 -translate-y-1/3 opacity-[0.055]"
        style={{ background: `radial-gradient(ellipse at center, ${YLW}, transparent 65%)` }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-14 text-center">
          <BlurReveal delay={0}>
            <p
              className="mb-4 text-[0.58rem] font-bold uppercase tracking-[0.40em]"
              style={{ color: YLW }}
            >
              Заявка
            </p>
          </BlurReveal>

          <BlurReveal delay={0.08}>
            <h2
              className="text-balance font-bold leading-[1.08] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(1.85rem, 4.2vw, 3.5rem)' }}
            >
              Запишите ребёнка на{' '}
              <span style={{ color: YLW }}>бесплатное первое занятие</span>
            </h2>
          </BlurReveal>

          <FadeUp delay={0.16}>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/50">
              Оставьте заявку — мы расскажем о программе, возрасте, расписании и поможем выбрать первый удобный визит.
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <p
              className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.20em]"
              style={{
                background: `rgba(${YLW_RGB},0.08)`,
                color: YLW,
                border: `1px solid rgba(${YLW_RGB},0.18)`,
              }}
            >
              🎁 Первое занятие бесплатно. После заявки мы свяжемся с вами и расскажем детали.
            </p>
          </FadeUp>
        </div>

        {/* ── Form card ───────────────────────────────────────────── */}
        <FadeUp delay={0.22}>
          <div className="relative mx-auto max-w-lg">
            {/* Outer glow ring */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
              style={{ boxShadow: `0 0 0 1px rgba(${YLW_RGB},0.12), 0 0 60px 0 rgba(${YLW_RGB},0.06)` }}
              aria-hidden
            />

            {/* Glass card */}
            <div
              className="relative overflow-hidden rounded-2xl border p-8 sm:p-10"
              style={{
                borderColor: `rgba(${YLW_RGB},0.10)`,
                background: 'rgba(255,255,255,0.032)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(to right, transparent 5%, rgba(${YLW_RGB},0.35) 50%, transparent 95%)` }}
                aria-hidden
              />

              {/* Glass sheen */}
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-[0.025] blur-3xl"
                style={{ background: YLW }}
                aria-hidden
              />

              <LeadForm />
            </div>
          </div>
        </FadeUp>

        {/* ── Divider ─────────────────────────────────────────────── */}
        <motion.div
          className="mx-auto my-14 h-px w-40"
          style={{ background: `linear-gradient(to right, transparent, rgba(${YLW_RGB},0.18), transparent)` }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-64px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        />

        {/* ── Contact info cards ───────────────────────────────────── */}
        <Stagger className="flex flex-wrap items-start justify-center gap-5 text-left" stagger={0.08}>
          {[
            { label: 'Телефон',  value: contactInfo.phone,    href: contactInfo.phoneHref,    rel: '' },
            { label: 'Telegram', value: contactInfo.telegram,  href: contactInfo.telegramHref, rel: 'noreferrer' },
            { label: 'Адрес',    value: contactInfo.address,   href: null,                     rel: '' },
          ].map(({ label, value, href, rel }) => (
            <StaggerItem key={label}>
              <div
                className="card-hover min-w-[155px] rounded-2xl border px-5 py-4"
                style={{
                  borderColor: `rgba(${YLW_RGB},0.08)`,
                  backgroundColor: `rgba(${YLW_RGB},0.022)`,
                }}
              >
                <p className="mb-1 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/35">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={rel ? '_blank' : undefined}
                    rel={rel || undefined}
                    className="text-sm font-medium text-white transition-colors duration-200 hover:text-[#D6FF00]"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-normal leading-relaxed text-white/75">{value}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

      </div>
    </section>
  )
}
