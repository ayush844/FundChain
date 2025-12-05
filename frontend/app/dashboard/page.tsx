"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Copy, Wallet, Plus, Layers, ChevronRight } from "lucide-react";
import { useFactoryList } from "@/hooks/useFactory"; // optional - use if available
import ProjectCard from "@/components/ProjectCard"; // optional - your existing ProjectCard (light tweaks below)

function truncateAddress(addr?: string) {
  if (!addr) return "";
  return addr.length > 12 ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : addr;
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [copied, setCopied] = useState(false);
  // If you have useFactoryList, uncomment the next line and remove mock data
  // const { campaigns = [], isLoading } = useFactoryList();
  // Mock campaigns to show layout if hook not present
  const campaigns = [
    {
      CampaignAddress: "0xabc1234567890abcdef1234567890abcdef1234",
      owner: address ?? "0x0000",
      name: "Solar-Powered Scooter",
      creationTime: `${Math.floor(Date.now() / 1000) - 86400 * 5}`,
    },
    {
      CampaignAddress: "0xdef9876543210fedcba9876543210fedcba9876",
      owner: address ?? "0x0000",
      name: "Open-Source Space Radio",
      creationTime: `${Math.floor(Date.now() / 1000) - 86400 * 30}`,
    },
    {
      CampaignAddress: "0xabc1234567890xycdef1234567890abcdef1234",
      owner: address ?? "0x0000",
      name: "Solar-Powered Scooter",
      creationTime: `${Math.floor(Date.now() / 1000) - 86400 * 5}`,
    },
    {
      CampaignAddress: "0xdef9876543210fedcba9876543219fedcba9876",
      owner: address ?? "0x0000",
      name: "Open-Source Space Radio",
      creationTime: `${Math.floor(Date.now() / 1000) - 86400 * 30}`,
    },
    {
      CampaignAddress: "0xabc1234567890abcdef1278567890abcdef1234",
      owner: address ?? "0x0000",
      name: "Solar-Powered Scooter",
      creationTime: `${Math.floor(Date.now() / 1000) - 86400 * 5}`,
    },
    {
      CampaignAddress: "0xabc1234567890abcdef9874567890abcdef1234",
      owner: address ?? "0x0000",
      name: "Open-Source Space Radio",
      creationTime: `${Math.floor(Date.now() / 1000) - 86400 * 30}`,
    },
  ];

  const totalCampaigns = campaigns.length;
  // Total raised placeholder — replace by summing balances from your hooks
  const totalRaised = useMemo(() => 3.72, []); // ETH

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    // small toast would be nice; for now a basic alert (optional)
    // alert("Address copied");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      {/* Subtle top rings like hero */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-40 -left-40 w-72 h-72 border-2 border-primary/30 rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 border-2 border-secondary/30 rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* compact header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Dashboard
            </h2>
            <p className="mt-1 text-sm text-foreground/70 max-w-xl">
              Quick overview of your wallet, campaigns and earnings. Manage or
              launch new ideas from here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded border-2 border-primary hover:bg-primary/90 transition justify-center"
            >
              <Plus className="w-4 h-4" />
              Create Campaign
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary rounded border-2 border-primary font-semibold hover:bg-primary/5 transition justify-center"
            >
              <Layers className="w-4 h-4" />
              Explore Projects
            </Link>
          </div>
        </div>

        {/* main grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left column: user & stats (stacked on mobile) */}
          <div className="lg:col-span-1 space-y-4">
            {/* Wallet card */}
            <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-white/6 to-white/3 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 justify-center">
                  <div className="bg-primary/10 text-primary p-2 rounded-md">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-foreground/80 font-medium">
                      Connected Wallet
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-sm font-medium text-foreground break-all">
                        {isConnected ? truncateAddress(address) : "Not connected"}
                      </div>

                      {isConnected && (
                        <>
                          {!copied ? (
                            <button
                              onClick={handleCopy}
                              className="ml-1 inline-flex items-center gap-1 py-1 border border-white/20 rounded text-xs text-white/70 hover:bg-white/5 transition"
                              aria-label="Copy address"
                            >
                              <Copy className="w-3 h-3 text-black" />
                            </button>
                          ) : (
                            <div className="ml-1 inline-flex items-center gap-1 px-2 py-1 bg-green-600/20 border border-green-500/40 rounded text-xs text-green-400 transition">
                              ✓
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats small */}
            <div className="rounded-lg border border-secondary/10 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-foreground/70">Your Campaigns</div>
                  <div className="text-lg font-semibold text-foreground">{totalCampaigns}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground/70">Total Raised</div>
                  <div className="text-lg font-semibold text-foreground">{totalRaised} ETH</div>
                </div>
              </div>

              {/* <div className="mt-3">
                <div className="text-xs text-foreground/60">Quick actions</div>
                <div className="mt-2 flex gap-2">
                  <Link
                    href="/create"
                    className="text-sm px-3 py-1 bg-primary text-white rounded border-2 border-primary"
                  >
                    New Campaign
                  </Link>
                  <Link
                    href="/projects"
                    className="text-sm px-3 py-1 bg-white text-primary rounded border border-primary"
                  >
                    View Projects
                  </Link>
                </div>
              </div> */}
            </div>

            {/* Small help / tip */}
            <div className="rounded-lg border border-primary/30 bg-[#0a0a0a] p-4 text-sm text-white shadow-md">
              <strong className="text-primary font-semibold">Tip</strong>
              <p className="mt-2 text-white/80 leading-relaxed">
                Click <span className="font-semibold text-primary">Create Campaign</span> to launch a new
                project. All funds are securely held in the campaign contract until you withdraw.
              </p>
            </div>
          </div>

          {/* Right column: campaigns list */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Your Active Campaigns</h3>
              <div className="text-sm text-foreground/70">{totalCampaigns} items</div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {campaigns.map((c) => (
                <article
                  key={c.CampaignAddress}
                  className="bg-white rounded-lg p-4 shadow-md border border-gray-100"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {c.name}
                      </h4>
                      <p className="text-xs text-foreground/60 mt-1 truncate">
                        {truncateAddress(c.CampaignAddress)} • {new Date(Number(c.creationTime) * 1000).toLocaleDateString("en-GB")
}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/projects/${c.CampaignAddress}`}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded text-sm"
                      >
                        View
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Progress region - reuse ProjectCard progress logic if available */}
                  <div className="mt-3">
                    {/* lightweight placeholder bar — replace with real values */}
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "42%" }} />
                    </div>
                    <div className="mt-2 text-xs text-foreground/70">
                      42% funded • 0.42 / 1.00 ETH
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-foreground/60">
                    <div>Backers: 12</div>
                    <div>Status: <span className="ml-1 font-medium text-foreground">Active</span></div>
                  </div>
                </article>
              ))}
            </div>

            {/* no campaigns hint */}
            {campaigns.length === 0 && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-primary/10 text-center text-foreground/70">
                You haven't created any campaigns yet. Click <Link href="/create" className="text-primary font-semibold">Create Campaign</Link> to start.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
