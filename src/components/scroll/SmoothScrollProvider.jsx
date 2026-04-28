import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
    })

    let rafId = 0
    const onFrame = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(onFrame)
    }

    rafId = requestAnimationFrame(onFrame)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return children
}
