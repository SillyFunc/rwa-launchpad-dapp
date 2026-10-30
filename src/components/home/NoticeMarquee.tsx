import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'motion/react'

const SPEED = 40
const START_DELAY = 1.5

export function NoticeMarquee({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const copyRef = useRef<HTMLSpanElement>(null)
  const controlsRef = useRef<ReturnType<typeof animate>>(null)
  const isInViewRef = useRef(false)
  const isHoveredRef = useRef(false)
  const isInView = useInView(containerRef)
  const shouldReduceMotion = useReducedMotion()
  const x = useMotionValue(0)

  // 离开视口、悬停或按住都只暂停，恢复时从原位置继续
  const syncPlayback = () => {
    const controls = controlsRef.current
    if (!controls) return
    if (isInViewRef.current && !isHoveredRef.current) controls.play()
    else controls.pause()
  }

  useEffect(() => {
    const copy = copyRef.current
    if (!copy || shouldReduceMotion) return

    // 字体加载完成等导致宽度变化时，按新宽度重算位移与时长，保证循环无缝、速度恒定
    const observer = new ResizeObserver(() => {
      controlsRef.current?.stop()
      const distance = copy.offsetWidth
      controlsRef.current = animate(x, [0, -distance], {
        duration: distance / SPEED,
        delay: START_DELAY,
        ease: 'linear',
        repeat: Infinity,
      })
      syncPlayback()
    })
    observer.observe(copy)

    return () => {
      observer.disconnect()
      controlsRef.current?.stop()
      controlsRef.current = null
    }
  }, [shouldReduceMotion, x])

  useEffect(() => {
    isInViewRef.current = isInView
    syncPlayback()
  }, [isInView])

  // 触屏上 pointerleave 在手指抬起或转为页面滚动时触发，因此同时覆盖悬停与按住
  const setHovered = (hovered: boolean) => {
    isHoveredRef.current = hovered
    syncPlayback()
  }

  if (shouldReduceMotion) {
    return <p className={`truncate ${className}`}>{text}</p>
  }

  return (
    <p
      ref={containerRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={`overflow-hidden ${className}`}
    >
      <motion.span style={{ x }} className="flex w-max whitespace-nowrap">
        <span ref={copyRef} className="pr-12">
          {text}
        </span>
        <span aria-hidden className="pr-12">
          {text}
        </span>
      </motion.span>
    </p>
  )
}
