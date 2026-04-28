import { useEffect, useRef, useState } from 'react'

export function useInView() {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      queueMicrotask(() => setIsInView(true))
      return
    }

    let observer
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsInView(true)
        },
        // Проценты в rootMargin поддерживаются не везде — px надёжнее и не ломает конструктор.
        { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
      )
      observer.observe(el)
    } catch {
      queueMicrotask(() => setIsInView(true))
      return
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}
