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

const SIZE = 343
const CENTER = SIZE / 2
const RING_GAP = 20
const INNER_RADIUS = 31.5
const RING_COUNT = Math.round((CENTER - INNER_RADIUS) / RING_GAP) + 1
const RIPPLE_DURATION = 1.6

// 沿用设计稿的径向渐变（越外越暗），首尾各一个间距内淡入淡出，每轮外扩一个间距后无缝衔接
function ringOpacity(radius: number) {
  const fadeIn = Math.min(1, Math.max(0, (radius - INNER_RADIUS) / RING_GAP))
  const fadeOut = Math.min(1, Math.max(0, (CENTER - radius) / RING_GAP))
  return 0.8 * (0.6 - 0.5 * (radius / CENTER)) * fadeIn * fadeOut
}

function Ring({
  baseRadius,
  offset,
}: {
  baseRadius: number
  offset: MotionValue<number>
}) {
  const radius = useTransform(offset, (value) => baseRadius + value)
  const opacity = useTransform(radius, ringOpacity)

  return <motion.circle cx={CENTER} cy={CENTER} r={radius} opacity={opacity} />
}

export function IndustryRipple({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(svgRef)
  const shouldReduceMotion = useReducedMotion()
  const offset = useMotionValue(0)

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return
    const controls = animate(offset, [0, RING_GAP], {
      duration: RIPPLE_DURATION,
      ease: 'linear',
      repeat: Infinity,
    })
    return () => controls.stop()
  }, [isInView, shouldReduceMotion, offset])

  return (
    <svg
      ref={svgRef}
      aria-hidden
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      fill="none"
      stroke="#FF7800"
      strokeWidth={0.5}
      className={className}
    >
      {Array.from({ length: RING_COUNT }, (_, index) => (
        <Ring
          key={index}
          baseRadius={INNER_RADIUS + index * RING_GAP}
          offset={offset}
        />
      ))}
    </svg>
  )
}
