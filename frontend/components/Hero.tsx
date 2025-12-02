import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-background min-h-screen flex items-center justify-center border-b-4 border-primary">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-40 -left-40 w-80 h-80 border-2 border-primary/30 rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 border-2 border-secondary/30 rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 border-2 border-primary bg-primary/10">
            <span className="text-primary font-bold text-xs sm:text-sm tracking-widest uppercase">For Visionaries</span>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance tracking-wide text-foreground">
              Fund Your <span className="text-primary border-b-4 border-primary px-2">Wild Ideas</span> on Ethereum
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 font-medium leading-relaxed max-w-2xl mx-auto">
              Turn ambitious dreams into reality with transparent, borderless crowdfunding powered by blockchain
              technology.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4">
            <button className="px-8 sm:px-10 py-3 sm:py-4 bg-primary text-white font-bold text-sm sm:text-base hover:bg-primary/90 transition-colors duration-200 border-2 border-primary flex items-center justify-center gap-2 group">
              <span>Start Your Campaign</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-primary border-2 border-primary font-bold text-sm sm:text-base hover:bg-primary/5 transition-colors duration-200">
              Explore Projects
            </button>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center pt-8 sm:pt-12">
            <div className="px-6 sm:px-8 py-4 border-2 border-primary/30 bg-primary/5">
              <div className="text-2xl sm:text-3xl font-bold text-primary">$45M+</div>
              <div className="text-xs sm:text-sm text-foreground/70 font-medium mt-1">Funds Raised</div>
            </div>
            <div className="px-6 sm:px-8 py-4 border-2 border-secondary/30 bg-secondary/5">
              <div className="text-2xl sm:text-3xl font-bold text-secondary">15K+</div>
              <div className="text-xs sm:text-sm text-foreground/70 font-medium mt-1">Active Projects</div>
            </div>
            <div className="px-6 sm:px-8 py-4 border-2 border-accent/30 bg-accent/5">
              <div className="text-2xl sm:text-3xl font-bold text-accent">500K+</div>
              <div className="text-xs sm:text-sm text-foreground/70 font-medium mt-1">Community Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
