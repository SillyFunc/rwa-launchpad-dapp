import { HeroBanner } from '@/components/home/HeroBanner.tsx'
import { IndustrySection } from '@/components/home/IndustrySection.tsx'
import { PartnersSection } from '@/components/home/PartnersSection.tsx'
import { RwaIntro } from '@/components/home/RwaIntro.tsx'
import { SolutionsSection } from '@/components/home/SolutionsSection.tsx'

export function HomePage() {
  return (
    <div className="relative w-full overflow-hidden pb-12">
      <HeroBanner />
      <RwaIntro />
      <SolutionsSection />
      <IndustrySection />
      <PartnersSection />
    </div>
  )
}
