import { Globe, Zap, Lock, Gem } from "lucide-react";

const features = [
  {
    icon: <Globe className="w-10 h-10 text-red-500" />,
    title: "Borderless Funding",
    description: "Access capital from anywhere in the world without restrictions.",
  },
  {
    icon: <Zap className="w-10 h-10 text-red-500" />,
    title: "Instant Settlements",
    description: "Funds arrive directly to your wallet in minutes, not months.",
  },
  {
    icon: <Lock className="w-10 h-10 text-red-500" />,
    title: "Blockchain Transparency",
    description: "Every transaction recorded immutably on Ethereum. Complete accountability.",
  },
  {
    icon: <Gem className="w-10 h-10 text-red-500" />,
    title: "Low Fees",
    description: "Minimal platform fees. Keep more of what you raise.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-primary/5 border-b-4 border-primary"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Why Choose FundChain
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 font-medium max-w-2xl mx-auto">
            Built on principles of transparency, accessibility, and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 border-2 border-foreground/20 bg-white hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-foreground/70 font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
