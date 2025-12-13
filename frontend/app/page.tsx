"use client"

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation"

import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/Howitworks"
import Stats from "@/components/Stats"
import CTA from "@/components/Cta"
import Footer from "@/components/Footer"

export default function Home() {

  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);


  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </div>
  )
}
