export default function Stats() {
  return (
    <section
      id="stats"
      className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-background border-b-4 border-primary"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 text-7xl sm:text-8xl lg:text-9xl opacity-10 animate-spin-slow">
          🎊
        </div>
        <div className="absolute -bottom-10 -right-10 text-7xl sm:text-8xl lg:text-9xl opacity-10 animate-float">
          🎉
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {[
            { label: "Funds Raised", value: "$45M", subtext: "In 2024" },
            { label: "Active Projects", value: "15,000+", subtext: "Worldwide" },
            { label: "Community Members", value: "500K+", subtext: "And Growing" },
            { label: "Success Rate", value: "87%", subtext: "Project Completion" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 sm:p-8 border-2 border-foreground/20 bg-white hover:border-primary hover:shadow-lg transition-all duration-200"
            >
              <div className="text-sm sm:text-base text-foreground/60 font-medium uppercase tracking-wide mb-3">
                {stat.label}
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-2">{stat.value}</div>
              <p className="text-xs sm:text-sm text-foreground/70 font-medium">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
