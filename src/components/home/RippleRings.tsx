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

const RING_GAP = 20
const RIPPLE_DURATION = 1.6

// 沿用设计稿的径向渐变（越外越暗），首尾各一个间距内淡入淡出，每轮外扩一个间距后无缝衔接
function ringOpacity(radius: number, center: number, innerRadius: number) {
  const fadeIn = Math.min(1, Math.max(0, (radius - innerRadius) / RING_GAP))
  const fadeOut = Math.min(1, Math.max(0, (center - radius) / RING_GAP))
  return 0.8 * (0.6 - 0.5 * (radius / center)) * fadeIn * fadeOut
}

function Ring({
  baseRadius,
  center,
  innerRadius,
  offset,
}: {
  baseRadius: number
  center: number
  innerRadius: number
  offset: MotionValue<number>
}) {
  const radius = useTransform(offset, (value) => baseRadius + value)
  const opacity = useTransform(radius, (value) =>
    ringOpacity(value, center, innerRadius),
  )

  return <motion.circle cx={center} cy={center} r={radius} opacity={opacity} />
}

export function RippleRings({
  size,
  innerRadius = (size / 2) % RING_GAP,
  color = '#FF7800',
  className,
}: {
  size: number
  innerRadius?: number
  color?: string
  className?: string
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(svgRef)
  const shouldReduceMotion = useReducedMotion()
  const offset = useMotionValue(0)
  const center = size / 2
  const ringCount = Math.round((center - innerRadius) / RING_GAP) + 1

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
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke={color}
      strokeWidth={0.5}
      className={className}
    >
      {Array.from({ length: ringCount }, (_, index) => (
        <Ring
          key={index}
          baseRadius={innerRadius + index * RING_GAP}
          center={center}
          innerRadius={innerRadius}
          offset={offset}
        />
      ))}
    </svg>
  )
}
