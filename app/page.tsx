import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ProblemSection, MechanismSection, ComparisonSection } from "@/components/story-sections"
import { CollectionsGrid } from "@/components/collections-grid"
import { Reviews } from "@/components/reviews"
import { OfferCountdown } from "@/components/offer-countdown"
import { Faq } from "@/components/faq"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSection />
        <MechanismSection />
        <ComparisonSection />
        <CollectionsGrid />
        <Reviews />
        <OfferCountdown />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
