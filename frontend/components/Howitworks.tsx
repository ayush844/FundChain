const steps = [
  {
    number: "01",
    title: "Create Your Project",
    description: "Share your vision and set your funding goal",
  },
  {
    number: "02",
    title: "Build Support",
    description: "Engage with your community and gather backers",
  },
  {
    number: "03",
    title: "Reach Your Goal",
    description: "Watch funds accumulate in real-time",
  },
  {
    number: "04",
    title: "Deliver & Build",
    description: "Execute your project and make an impact",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background border-b-4 border-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 font-medium max-w-2xl mx-auto">
            A simple four-step process to bring your ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="h-full p-6 sm:p-8 border-2 border-primary/40 bg-primary/5 hover:border-primary hover:bg-primary/10 transition-all duration-200">
                <div className="text-4xl sm:text-5xl font-black text-primary mb-4 opacity-40">{step.number}</div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 font-medium">{step.description}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 border-2 border-primary/30 bg-background" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
