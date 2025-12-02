import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background border-b-4 border-primary">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 border-4 border-primary bg-primary text-white text-center space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Ready to Change the World?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-medium opacity-95 max-w-2xl mx-auto">
              Join thousands of visionaries launching projects that matter. Your idea deserves support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <button className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-primary font-bold text-sm sm:text-base hover:bg-primary/90 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 group border-2 border-white">
              <span>Launch Campaign</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent text-white border-2 border-white font-bold text-sm sm:text-base hover:bg-white/10 transition-colors duration-200">
              Learn More
            </button>
          </div>

          <div className="border-t-2 border-white/30 pt-6 sm:pt-8">
            <p className="text-xs sm:text-sm font-medium opacity-90">
              ✓ No credit card required • ✓ 0% platform fees for first project • ✓ 24/7 support
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
