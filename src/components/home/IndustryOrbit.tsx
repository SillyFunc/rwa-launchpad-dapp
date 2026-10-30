import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react'
import industryNode from '@/assets/home/industry-node.svg'
import industryIcon1 from '@/assets/home/industry-icon-1.svg'
import industryIcon2 from '@/assets/home/industry-icon-2.svg'
import industryIcon3 from '@/assets/home/industry-icon-3.svg'
import industryIcon4 from '@/assets/home/industry-icon-4.svg'
import industryIcon5 from '@/assets/home/industry-icon-5.svg'

const industries = [
  { label: '房地产', icon: industryIcon1 },
  { label: '金融', icon: industryIcon2 },
  { label: 'Web3', icon: industryIcon3 },
  { label: '风险投资', icon: industryIcon4 },
  { label: '娱乐', icon: industryIcon5 },
]

const ORBIT_RADIUS = 120
const START_ANGLE = -90
const ORBIT_DURATION = 60
const ENTRANCE_DURATION = 0.9
const ENTRANCE_STAGGER = 0.08

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

function OrbitNode({
  label,
  icon,
  index,
  orbit,
  hasEntered,
  shouldReduceMotion,
}: {
  label: string
  icon: string
  index: number
  orbit: MotionValue<number>
  hasEntered: boolean
  shouldReduceMotion: boolean | null
}) {
  const progress = useMotionValue(shouldReduceMotion ? 1 : 0)
  const baseAngle = START_ANGLE + (index * 360) / industries.length

  useEffect(() => {
    if (!hasEntered || shouldReduceMotion) return
    const controls = animate(progress, 1, {
      delay: index * ENTRANCE_STAGGER,
      duration: ENTRANCE_DURATION,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [hasEntered, shouldReduceMotion, index, progress])

  const x = useTransform(
    [orbit, progress],
    ([angle, spread]: number[]) =>
      ORBIT_RADIUS * spread * Math.cos(toRadians(baseAngle + angle)),
  )
  const y = useTransform(
    [orbit, progress],
    ([angle, spread]: number[]) =>
      ORBIT_RADIUS * spread * Math.sin(toRadians(baseAngle + angle)),
  )
  const scale = useTransform(progress, [0, 1], [0.4, 1])

  return (
    <motion.div
      style={{ x, y, scale, opacity: progress }}
      className="absolute top-1/2 left-1/2 -mt-5.25 -ml-5.25 flex size-10.5 items-center justify-center"
    >
      <img alt="" src={industryNode} className="absolute inset-0 size-full" />
      <img alt="" src={icon} className="relative" />
      {/* 标签统一放在图标下方，公转到任意位置都不会超出容器 */}
      <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-xs whitespace-nowrap text-white">
        {label}
      </span>
    </motion.div>
  )
}

export function IndustryOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasEntered = useInView(containerRef, { once: true, amount: 0.4 })
  const isInView = useInView(containerRef)
  const shouldReduceMotion = useReducedMotion()
  const orbit = useMotionValue(0)

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return
    const from = orbit.get()
    const controls = animate(orbit, [from, from + 360], {
      duration: ORBIT_DURATION,
      ease: 'linear',
      repeat: Infinity,
    })
    return () => controls.stop()
  }, [isInView, shouldReduceMotion, orbit])

  return (
    <div ref={containerRef} className="absolute inset-0">
      {industries.map((industry, index) => (
        <OrbitNode
          key={industry.label}
          {...industry}
          index={index}
          orbit={orbit}
          hasEntered={hasEntered}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </div>
  )
}
