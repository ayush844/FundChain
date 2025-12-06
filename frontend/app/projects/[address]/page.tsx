"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { useAccount, useReadContract } from "wagmi";
import campaignAbi from "@/contracts/Crowdfunding.json";
import { formatEther } from "viem";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Clock,
  Wallet,
  Rocket,
  Plus,
  CalendarPlus,
  Pause,
  Play,
  ArrowDownCircle,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";


export default function CampaignDetailPage() {
  const { checked } = useRequireWallet();
  const { address: connectedWallet } = useAccount();
  const path = usePathname();
  const address = path?.split("/").pop() ?? "";

  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // reset after 1.5s
  };


  /* -----------------------------------------------------
   * ALL HOOKS MUST RUN EVERY RENDER (NO CONDITIONS ABOVE)
   * ----------------------------------------------------- */

  const { data: tiersData, isLoading: loadingTiers } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "getTiers",
  });

  const { data: owner } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "owner",
  });

  const { data: goal } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "goal",
  });

  const { data: balance } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "getContractBalance",
  });

  const { data: deadline } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "deadline",
  });

  const { data: status } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "getCampaignStatus",
  });

  const { data: paused } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "paused",
  });

  const { data: campaignName } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "name",
  });

  const { data: description } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "description",
  });

  /* ------------------ COMPUTED VALUES ------------------ */

  // owner (unknown → string)
  const ownerStr =
    owner && typeof owner === "string"
      ? owner
      : owner?.toString?.() || "";

  const campaignNameStr =
  typeof campaignName === "string"
    ? campaignName
    : campaignName?.toString?.() || "Loading…";

  const descriptionStr =
    typeof description === "string"
      ? description
      : description?.toString?.() || "No description provided for this campaign.";


  // detect owner
  const isOwner =
    connectedWallet &&
    ownerStr &&
    connectedWallet.toLowerCase() === ownerStr.toLowerCase();

  const goalEth = goal ? Number(formatEther(goal as bigint)) : 0;
  const balanceEth = balance ? Number(formatEther(balance as bigint)) : 0;

  const progress = goalEth > 0 ? (balanceEth / goalEth) * 100 : 0;
  const progressClamped = Math.min(progress, 100);

  const deadlineDate =
    typeof deadline === "bigint"
      ? new Date(Number(deadline) * 1000).toLocaleDateString()
      : "-";

  const statusLabel = useMemo(() => {
    switch (Number(status)) {
      case 0:
        return { text: "Active", color: "text-green-400" };
      case 1:
        return { text: "Successful", color: "text-blue-400" };
      case 2:
        return { text: "Failed", color: "text-red-400" };
      default:
        return { text: "Unknown", color: "text-gray-400" };
    }
  }, [status]);

  /* ------------------ SAFE CONDITIONAL UI ------------------ */

  if (!checked) return <div className="p-6 text-white">Checking wallet…</div>;
  if (!address) return <div className="p-6 text-white">Invalid campaign address</div>;

  /* ------------------ PAGE UI ------------------ */

  return (
    <section className="min-h-screen bg-background p-6 relative">
      {/* subtle rings */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-72 h-72 border border-primary/30 rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 border border-secondary/30 rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* HEADER CARD */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">

          {/* NAME + DESCRIPTION */}
          <h1 className="text-3xl font-bold text-foreground">
            {campaignNameStr || "Loading…"}
          </h1>

          <p className="text-foreground/70 mt-2 leading-relaxed">
            {descriptionStr || "No description provided for this campaign."}
          </p>
{/* Campaign Address */}
<div className="mt-4 flex items-center gap-2">
  <span className="text-sm text-foreground/70">Campaign Address:</span>

  <span className="text-sm font-mono break-all text-primary">
    {address}
  </span>

  <button
    onClick={handleCopyAddress}
    aria-label="Copy address"
    className="ml-1 inline-flex items-center justify-center p-1.5 border rounded hover:bg-primary/10 text-primary"
  >
    {!copied ? (
      <Copy size={14} />
    ) : (
      <Check size={14} className="text-green-500" />
    )}
  </button>
</div>


          {/* Owner-only actions */}
          {isOwner && (
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded border border-primary hover:bg-primary/90">
                <Plus size={16} /> Create New Tier
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm rounded border border-secondary hover:bg-secondary/90">
                <CalendarPlus size={16} /> Extend Deadline
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm rounded border border-accent hover:bg-accent/90">
                {paused ? (
                  <>
                    <Play size={16} /> Unpause Campaign
                  </>
                ) : (
                  <>
                    <Pause size={16} /> Pause Campaign
                  </>
                )}
              </button>

              {Number(status) === 1 && (
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded border border-green-700 hover:bg-green-700">
                  <ArrowDownCircle size={16} /> Withdraw Funds
                </button>
              )}
            </div>
          )}

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Owner */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Wallet className="text-primary" size={18} />
                <span className="text-sm font-medium text-primary">Owner</span>
              </div>
              <p className="text-xs text-foreground/70 mt-1 break-all">{ownerStr}</p>
            </div>

            {/* Deadline */}
            <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
              <div className="flex items-center gap-2">
                <Clock className="text-secondary" size={18} />
                <span className="text-sm font-medium text-secondary">Deadline</span>
              </div>
              <p className="text-xs text-foreground/70 mt-1">{deadlineDate}</p>
            </div>

            {/* Goal */}
            <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-2">
                <Rocket className="text-accent" size={18} />
                <span className="text-sm font-medium text-accent">Goal</span>
              </div>
              <p className="text-xs text-foreground/70 mt-1">{goalEth} ETH</p>
            </div>

            {/* Status */}
            <div className="p-3 rounded-lg bg-white border border-gray-200">
              <div className="flex items-center gap-2">
                <Users className={statusLabel.color} size={18} />
                <span className={`text-sm font-medium ${statusLabel.color}`}>
                  Status
                </span>
              </div>
              <p className="text-xs text-foreground/70 mt-1">{statusLabel.text}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="text-sm font-medium text-foreground mb-2">
              {balanceEth} / {goalEth} ETH Raised
            </div>

            <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full ${
                  progress >= 100 ? "bg-green-500" : "bg-primary"
                }`}
                style={{ width: `${progressClamped}%` }}
              />
            </div>
          </div>
        </div>

        {/* ---------------- TIER LIST ---------------- */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Reward Tiers</h2>

          {loadingTiers && (
            <p className="mt-4 text-white">Loading tiers…</p>
          )}

          {!loadingTiers && Array.isArray(tiersData) && tiersData.length === 0 && (
            <p className="mt-4 text-foreground/70 text-sm">
              This campaign does not have any reward tiers yet.
            </p>
          )}

          {!loadingTiers && Array.isArray(tiersData) && tiersData.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(tiersData as any[]).map((t: any, i: number) => {
                const name = t?.name ?? t[0];
                const amountWei = t?.amount ?? t[1];
                const backers = t?.backers?.toString?.() ?? t[2]?.toString?.() ?? "0";
                const amountEth = amountWei ? Number(formatEther(amountWei as bigint)) : 0;

                return (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold text-foreground">{name}</div>
                        <div className="text-sm text-foreground/60">Backers: {backers}</div>
                      </div>
                      <div className="text-right font-medium text-primary">
                        {amountEth} ETH
                      </div>
                    </div>

                    <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 text-sm font-medium">
                      Fund this Tier
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
