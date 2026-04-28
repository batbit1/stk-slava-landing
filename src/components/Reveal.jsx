import { useInView } from '../hooks/useInView'

export function Reveal({ children, className = '' }) {
  const [ref, isInView] = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'reveal-visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
