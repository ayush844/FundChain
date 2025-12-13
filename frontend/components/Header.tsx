"use client";

import { useEffect, useState } from "react";
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

useEffect(() => {
  if (!isOpen) return;

  const html = document.documentElement;
  const body = document.body;

  const scrollY = window.scrollY;

  // Lock scroll
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";

  return () => {
    // Restore scroll
    html.style.overflow = "";
    body.style.overflow = "";
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";

    window.scrollTo(0, scrollY);
  };
}, [isOpen]);


  return (
<>

{/* Mobile backdrop overlay */}
{isOpen && (
  <div
    className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm"
    onClick={() => setIsOpen(false)}
  />
)}


    <header className="sticky top-0 z-50 relative bg-background/95 backdrop-blur-md border-b border-primary sm:border-b-4">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-12 sm:h-12 border-2 border-primary bg-primary flex items-center justify-center">
              <span className="text-white font-black text-base sm:text-xl">FC</span>
            </div>

            <div className="leading-tight">
              <span className="block text-lg sm:text-2xl font-bold text-primary">
                FundChain
              </span>
              <p className="hidden sm:block text-xs text-foreground/60 font-medium">
                Fund Bold Ideas
              </p>
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
            className="md:hidden p-1.5 rounded-md hover:bg-muted/70 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden absolute left-4 right-4 top-full mt-3
               p-4 rounded-xl bg-background
               border border-primary/20 shadow-lg
               flex flex-col gap-4 z-60 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="md:hidden mb-2 w-full flex justify-center items-center">
              <StyledConnectButton />
            </div>
            

            {isConnected && !isLanding && (
              <>
                <Link
                  href="/projects"
                  className={`text-sm font-medium px-2 py-1.5 rounded hover:bg-primary/10 transition-colors items-center flex justify-center items-center border border-gray-300 ${
                    pathname.startsWith("/projects")
                      ? "text-primary font-semibold border-2 border-primary pb-1"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Projects
                </Link>

                <Link
                  href="/dashboard"
                  className={`text-sm font-medium px-2 py-1.5 rounded hover:bg-primary/10 transition-colors flex justify-center items-center  border border-gray-300 ${
                    pathname.startsWith("/dashboard")
                      ? "text-primary font-semibold border-2 border-primary pb-1"
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

</>
  );
}
