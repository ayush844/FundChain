"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import StyledConnectButton from "@/components/StyledConnectButton";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isConnected } = useAccount();

  // Show landing links only on home page (/)
  const isLanding = pathname === "/";

  console.log(pathname)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="w-10 sm:w-12 h-10 sm:h-12 border-2 border-primary bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors duration-200">
              <span className="text-white font-black text-lg sm:text-xl">FC</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-primary">FundChain</span>
              <p className="text-xs text-foreground/60 font-medium">Fund Bold Ideas</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {isLanding && (
              <>
                <Link
                  href="#features"
                  className="text-foreground font-medium hover:text-primary transition-colors duration-200 text-sm"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-foreground font-medium hover:text-primary transition-colors duration-200 text-sm"
                >
                  How It Works
                </Link>
                <Link
                  href="#stats"
                  className="text-foreground font-medium hover:text-primary transition-colors duration-200 text-sm"
                >
                  Impact
                </Link>
              </>
            )}

            {/* When wallet is connected */}
            {isConnected && !isLanding && (
              <>
                <Link
                  href="/projects"
                  className={`text-sm font-medium transition-colors ${
                    pathname.startsWith("/projects")
                      ? "text-primary font-semibold border-b-2 border-primary pb-1"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Projects
                </Link>

                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    pathname.startsWith("/dashboard")
                      ? "text-primary font-semibold border-b-2 border-primary pb-1"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}

          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <StyledConnectButton />

            {/* Only show on landing */}
            {/* {isLanding && (
              <Link
                href="/projects"
                className="px-6 py-2 bg-primary text-white font-bold hover:bg-primary/90 transition-colors duration-200 text-sm border-2 border-primary"
              >
                Launch App
              </Link>
            )} */}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t-2 border-primary flex flex-col gap-4">
            <div className="md:hidden mb-2 w-full flex justify-center items-center">
              <StyledConnectButton />
            </div>
            {isLanding && (
              <>
                <Link
                  href="#features"
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  href="#stats"
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  Impact
                </Link>
{/* 
                <Link
                  href="/projects"
                  className="w-full px-6 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors duration-200 border-2 border-primary mt-2 text-center"
                >
                  Launch App
                </Link> */}
              </>
            )}

            {isConnected && !isLanding && (
              <>
                <Link
                  href="/projects"
                  className={`text-sm font-medium transition-colors ${
                    pathname.startsWith("/projects")
                      ? "text-primary font-semibold border-b-2 border-primary pb-1"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Projects
                </Link>

                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    pathname.startsWith("/dashboard")
                      ? "text-primary font-semibold border-b-2 border-primary pb-1"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}

          </nav>
        )}
      </div>
    </header>
  );
}
