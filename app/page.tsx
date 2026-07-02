import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Benefits } from "@/components/benefits"
import { FeaturedProducts } from "@/components/featured-products"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Faq } from "@/components/faq"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
      <Faq />
      <SiteFooter />
    </main>
  )
}
