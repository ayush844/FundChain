import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t-4 border-primary bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 border-2 border-primary bg-primary flex items-center justify-center">
                <span className="text-white font-black text-sm sm:text-lg">FC</span>
              </div>
              <span className="font-bold text-foreground text-lg sm:text-xl">FundChain</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/70 font-medium">
              Supporting innovative ideas worldwide via Ethereum.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-2 sm:mb-4 text-sm lg:text-base">Product</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="#" className="text-foreground/70 font-medium hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 font-medium hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 font-medium hover:text-primary transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2 sm:mb-4 text-sm lg:text-base">Company</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="#" className="text-foreground/70 font-medium hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 font-medium hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 font-medium hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2 sm:mb-4 text-sm lg:text-base">Legal</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="#" className="text-foreground/70 font-medium hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 font-medium hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 font-medium hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-foreground/20 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm text-foreground/70 font-medium text-center sm:text-left">
            © 2025 FundChain. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
              <Github size={20} />
            </Link>
            <Link href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
