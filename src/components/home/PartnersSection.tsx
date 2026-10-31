import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'motion/react'
import { SectionHeading } from './SectionHeading.tsx'

import logo227 from '@/assets/home/partners/logo-227.png'
import logo228 from '@/assets/home/partners/logo-228.png'
import logo229 from '@/assets/home/partners/logo-229.png'
import logo230 from '@/assets/home/partners/logo-230.png'
import logo231 from '@/assets/home/partners/logo-231.png'
import logo232 from '@/assets/home/partners/logo-232.png'
import logo233 from '@/assets/home/partners/logo-233.png'
import logo234 from '@/assets/home/partners/logo-234.png'
import logo235 from '@/assets/home/partners/logo-235.png'
import logo236 from '@/assets/home/partners/logo-236.png'
import logo238 from '@/assets/home/partners/logo-238.png'
import logo239 from '@/assets/home/partners/logo-239.png'
import logo240 from '@/assets/home/partners/logo-240.png'
import logo241 from '@/assets/home/partners/logo-241.png'
import logo242 from '@/assets/home/partners/logo-242.png'
import logo243 from '@/assets/home/partners/logo-243.png'
import logo244 from '@/assets/home/partners/logo-244.png'
import logo245 from '@/assets/home/partners/logo-245.png'
import logo246 from '@/assets/home/partners/logo-246.png'

const SCROLL_SPEED = 30

const partnerLogos = [
  { src: logo227, name: '金色财经' },
  { src: logo228, name: '火星财经' },
  { src: logo229, name: '非小号' },
  { src: logo230, name: 'CoinMarketCap' },
  { src: logo231, name: '币安' },
  { src: logo232, name: 'Huobi' },
  { src: logo233, name: 'Goldman Sachs' },
  { src: logo234, name: 'IDG Capital' },
  { src: logo235, name: 'Morgan Stanley' },
  { src: logo236, name: 'SoftBank' },
  { src: logo238, name: 'Andreessen Horowitz' },
  { src: logo239, name: 'HZD' },
  { src: logo240, name: 'imToken' },
  { src: logo241, name: 'MetaMask' },
  { src: logo242, name: 'HyperPay' },
  { src: logo243, name: 'Bitcoin' },
  { src: logo244, name: 'Tether' },
  { src: logo245, name: 'OpenSea' },
  { src: logo246, name: 'Uniswap' },
]

for (let index = partnerLogos.length - 1; index > 0; index--) {
  const randomIndex = Math.floor(Math.random() * (index + 1))
  const logo = partnerLogos[index]
  partnerLogos[index] = partnerLogos[randomIndex]
  partnerLogos[randomIndex] = logo
}

const partnerRows = [
  {
    spacingClassName: 'gap-19.75 pr-19.75',
    heightClassName: 'h-12.25',
    logos: partnerLogos.slice(0, 6),
  },
  {
    spacingClassName: 'gap-13.5 pr-13.5',
    heightClassName: 'h-12.25',
    logos: partnerLogos.slice(6, 13),
  },
  {
    spacingClassName: 'gap-15.75 pr-15.75',
    heightClassName: 'h-12',
    logos: partnerLogos.slice(13),
  },
]

function PartnerRow({
  row,
  reverse,
}: {
  row: (typeof partnerRows)[number]
  reverse: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<ReturnType<typeof animate>>(null)
  const isInViewRef = useRef(false)
  const isHoveredRef = useRef(false)
  const isInView = useInView(containerRef)
  const shouldReduceMotion = useReducedMotion()
  const x = useMotionValue(0)

  const syncPlayback = () => {
    const controls = controlsRef.current
    if (!controls) return
    if (isInViewRef.current && !isHoveredRef.current) controls.play()
    else controls.pause()
  }

  useEffect(() => {
    const copy = copyRef.current
    if (!copy || shouldReduceMotion) {
      x.set(0)
      return
    }

    const observer = new ResizeObserver(() => {
      const distance = copy.getBoundingClientRect().width
      if (!distance) return
      controlsRef.current?.stop()
      controlsRef.current = animate(
        x,
        reverse ? [-distance, 0] : [0, -distance],
        {
          duration: distance / SCROLL_SPEED,
          ease: 'linear',
          repeat: Infinity,
        },
      )
      syncPlayback()
    })
    observer.observe(copy)

    return () => {
      observer.disconnect()
      controlsRef.current?.stop()
      controlsRef.current = null
    }
  }, [reverse, shouldReduceMotion, x])

  useEffect(() => {
    isInViewRef.current = isInView
    syncPlayback()
  }, [isInView])

  const setHovered = (hovered: boolean) => {
    isHoveredRef.current = hovered
    syncPlayback()
  }

  const renderLogos = (duplicate = false) =>
    row.logos.map((logo) => (
      <img
        key={logo.src}
        alt={duplicate ? '' : logo.name}
        src={logo.src}
        className="h-full w-auto shrink-0"
      />
    ))

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      tabIndex={shouldReduceMotion ? 0 : undefined}
      role={shouldReduceMotion ? 'region' : undefined}
      aria-label={
        shouldReduceMotion ? 'Partner logos, scroll horizontally' : undefined
      }
      className={`w-full ${shouldReduceMotion ? 'overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400' : 'overflow-hidden'}`}
    >
      <motion.div style={{ x }} className={`flex w-max ${row.heightClassName}`}>
        <div
          ref={copyRef}
          className={`flex h-full shrink-0 items-center ${row.spacingClassName}`}
        >
          {renderLogos()}
        </div>
        {!shouldReduceMotion && (
          <div
            aria-hidden
            className={`flex h-full shrink-0 items-center ${row.spacingClassName}`}
          >
            {renderLogos(true)}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export function PartnersSection() {
  return (
    <section className="relative mt-8">
      <SectionHeading title="Partners" />
      <div className="mt-11 flex flex-col gap-6">
        {partnerRows.map((row, index) => (
          <PartnerRow key={index} row={row} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
