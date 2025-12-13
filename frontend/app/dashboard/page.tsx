"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Copy, Wallet, Plus, Layers, ChevronRight } from "lucide-react";

import { useUserCampaigns } from "@/hooks/useUserCampaigns";
import { useCampaignStats } from "@/hooks/useCampaignStats";

function truncateAddress(addr?: string) {
  if (!addr) return "";
  return addr.length > 14 ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : addr;
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [copied, setCopied] = useState(false);

  // Fetch user's campaigns
  const { campaigns = [], isLoading } = useUserCampaigns(address);

  const totalCampaigns = campaigns.length;

  // Extract addresses → pass once to stats hook
  const campaignAddresses = useMemo(
    () => campaigns.map((c: any) => c.CampaignAddress),
    [campaigns]
  );

  // Fetch stats in ONE HOOK CALL
  const { stats, isLoading: statsLoading } = useCampaignStats(campaignAddresses);

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      {/* Decorative Rings */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-40 -left-40 w-72 h-72 border border-primary/30 rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 border border-secondary/30 rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Dashboard
            </h2>
            <p className="mt-1 text-sm text-foreground/70 max-w-xl">
              Overview of your wallet, campaigns, and performance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded border-2 border-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Create Campaign
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary rounded border-2 border-primary font-semibold hover:bg-primary/5"
            >
              <Layers className="w-4 h-4" />
              Explore Projects
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1 space-y-4">
            {/* WALLET CARD */}
            <div className="rounded-lg border border-primary/20 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-md">
                  <Wallet className="w-5 h-5" />
                </div>

                <div>
                  <div className="text-sm text-foreground/80 font-medium">
                    Connected Wallet
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium break-all">
                      {isConnected ? truncateAddress(address) : "Not connected"}
                    </span>

                    {isConnected &&
                      (!copied ? (
                        <button
                          onClick={handleCopy}
                          className="p-1 border rounded hover:bg-primary/10"
                        >
                          <Copy className="w-3 h-3 text-primary" />
                        </button>
                      ) : (
                        <span className="text-green-500 text-sm">✓</span>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STATS CARD */}
            <div className="rounded-lg border border-secondary/10 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-foreground/70">Your Campaigns</div>
                  <div className="text-lg font-semibold text-foreground">
                    {totalCampaigns}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-foreground/70">Total Raised</div>
                  <div className="text-lg font-semibold text-foreground">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>

            {/* TIP */}
            <div className="rounded-lg border border-primary/30 bg-[#0a0a0a] p-4 text-sm text-white shadow-md">
              <strong className="text-primary">Tip</strong>
              <p className="mt-2 text-white/80">
                Your campaigns update in real-time. Click any card to view
                detailed stats or manage tiers.
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Your Campaigns</h3>
              <span className="text-sm text-foreground/70">
                {totalCampaigns} items
              </span>
            </div>

            {/* LOADING */}
            {isLoading && (
              <div className="mt-6 text-foreground/70 text-sm">
                Loading campaigns…
              </div>
            )}

            {/* NO CAMPAIGNS */}
            {!isLoading && campaigns.length === 0 && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-primary/10 text-center text-foreground/70">
                You haven’t created any campaigns yet.
                <Link href="/create" className="text-primary font-semibold ml-1">
                  Create one now.
                </Link>
              </div>
            )}

            {/* CAMPAIGN CARDS */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {!statsLoading &&
                campaigns.map((c, i) => {
                  const st = stats[i] || {
                    goalEth: 0,
                    balanceEth: 0,
                    status: 0,
                    progressClamped: 0,
                  };

                  return (
                    <article
                      key={c.CampaignAddress}
                      className="bg-white rounded-lg p-4 shadow-md border border-gray-100"
                    >
                      {/* HEADER */}
                    <div className="flex items-start justify-between gap-3">
                      {/* LEFT INFO (truncate properly) */}
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold truncate">{c.name}</h4>

                        <p className="text-xs text-foreground/60 mt-1 truncate">
                          {truncateAddress(c.CampaignAddress)} •{" "}
                          {new Date(Number(c.creationTime) * 1000).toLocaleDateString()}
                        </p>
                      </div>

                      {/* VIEW BUTTON (fixed width, never shrinks) */}
                      <Link
                        href={`/projects/${c.CampaignAddress}`}
                        className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
                      >
                        View <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>


                      {/* PROGRESS BAR */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full ${
                              st.progressClamped >= 100
                                ? "bg-green-500"
                                : "bg-primary"
                            }`}
                            style={{ width: `${st.progressClamped}%` }}
                          />
                        </div>

                        <div className="mt-2 text-xs text-foreground/70">
                          {st.progressClamped.toFixed(0)}% funded •{" "}
                          {st.balanceEth} / {st.goalEth} ETH
                        </div>
                      </div>

                      {/* STATUS */}
                      <div className="mt-3 text-xs text-foreground/60">
                        Status:{" "}
                        <span className="font-medium">
                          {st.status === 0
                            ? "Active"
                            : st.status === 1
                            ? "Successful"
                            : "Failed"}
                        </span>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
