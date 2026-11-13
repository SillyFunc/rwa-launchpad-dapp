import { PieChart, type PieSeriesOption } from 'echarts/charts'
import {
  TooltipComponent,
  type TooltipComponentOption,
} from 'echarts/components'
import {
  init,
  use as registerCharts,
  type ComposeOption,
  type EChartsType,
} from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

import { m } from '@/paraglide/messages.js'

registerCharts([PieChart, TooltipComponent, SVGRenderer])

export interface TokenAllocation {
  id: string
  name: string
  value: number
  color: string
}

type ChartOption = ComposeOption<PieSeriesOption | TooltipComponentOption>

export default function TokenDistributionChart({
  allocations,
}: {
  allocations: readonly TokenAllocation[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<EChartsType | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = init(container, undefined, { renderer: 'svg' })
    chartRef.current = chart
    const observer = new ResizeObserver(() => chart.resize())
    observer.observe(container)

    return () => {
      observer.disconnect()
      chart.dispose()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const typography = getComputedStyle(container)
    const option: ChartOption = {
      animation: !shouldReduceMotion,
      animationDuration: 400,
      animationDurationUpdate: 250,
      textStyle: {
        fontFamily: typography.fontFamily,
        fontSize: Number.parseFloat(typography.fontSize),
      },
      tooltip: {
        trigger: 'item',
        renderMode: 'richText',
        confine: true,
        formatter: '{b}: {d}%',
        backgroundColor: '#1D1D1D',
        borderColor: '#FCD438',
        textStyle: {
          color: '#FFFFFF',
          fontFamily: typography.fontFamily,
          fontSize: Number.parseFloat(typography.fontSize),
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['54%', '92%'],
          center: ['50%', '50%'],
          startAngle: 90,
          clockwise: false,
          stillShowZeroSum: false,
          label: { show: false },
          labelLine: { show: false },
          emphasis: { scale: false },
          data: allocations.map((allocation) => ({
            id: allocation.id,
            name: allocation.name,
            value: allocation.value,
            itemStyle: { color: allocation.color },
          })),
        },
      ],
    }

    chartRef.current?.setOption(option, { notMerge: true })
  }, [allocations, shouldReduceMotion])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={m.project_distribution_chart_alt()}
      className="aspect-square w-full text-xs"
    />
  )
}
