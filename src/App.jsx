import { MotionConfig } from 'framer-motion'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { DirectionCards } from './components/DirectionCards'
import { WhyUs } from './components/WhyUs'
import { TrainingProgram } from './components/TrainingProgram'
import { Safety } from './components/Safety'
import { Contacts } from './components/Contacts'
import { Sponsors } from './components/Sponsors'
import { Footer } from './components/Footer'
import { AnimatedBackgroundLines } from './components/AnimatedBackgroundLines'

export default function App() {

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <DirectionCards />

        <div className="relative overflow-hidden bg-[#070708]">
          <AnimatedBackgroundLines />
          <WhyUs />
          <TrainingProgram />
          <Safety />
          <Contacts />
          <Sponsors />
          <Footer />
        </div>
      </main>
    </MotionConfig>
  )
}
