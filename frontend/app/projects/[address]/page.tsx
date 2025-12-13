"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import campaignAbi from "@/contracts/Crowdfunding.json";
import { formatEther, parseEther } from "viem";
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

  const [showTierModal, setShowTierModal] = useState(false);
  const [tierName, setTierName] = useState("");
  const [tierAmount, setTierAmount] = useState("");


  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [daysToAdd, setDaysToAdd] = useState("");

  const [fundingTierIndex, setFundingTierIndex] = useState<number | null>(null);


  const { writeContract, data: txHash, isPending } = useWriteContract();

  const { isLoading: txConfirming, isSuccess: txSuccess } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

    const handleCreateTier = async () => {
      writeContract({
        address: address as `0x${string}`,
        abi: campaignAbi.abi,
        functionName: "addTier",
        args: [tierName, parseEther(tierAmount)],
      });
    };

    const handleDeleteTier = (index: number) => {
      writeContract({
        address: address as `0x${string}`,
        abi: campaignAbi.abi,
        functionName: "removeTier",
        args: [index],
      });
    };

    const handleExtendDeadline = () => {
      writeContract({
        address: address as `0x${string}`,
        abi: campaignAbi.abi,
        functionName: "extendDeadline",
        args: [BigInt(daysToAdd)],
      });
    };

    const handleTogglePause = () => {
      writeContract({
        address: address as `0x${string}`,
        abi: campaignAbi.abi,
        functionName: "togglePause",
      });
    };

  const handleFundTier = (tierIndex: number, amountWei: bigint) => {
    setFundingTierIndex(tierIndex);
    writeContract({
      address: address as `0x${string}`,
      abi: campaignAbi.abi,
      functionName: "fund",
      args: [tierIndex],
      value: amountWei, // 💰 THIS IS IMPORTANT
    });
  };


    useEffect(() => {
      if (txSuccess) {
        // close modal
        setShowTierModal(false);
        setShowDeadlineModal(false);

        // reset inputs
        setTierName("");
        setTierAmount("");
        setDaysToAdd("");

        setFundingTierIndex(null);
      }
    }, [txSuccess]);

    useEffect(() => {
      if (!isPending && !txConfirming) {
        setFundingTierIndex(null);
      }
    }, [isPending, txConfirming]);


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
      // 🛑 PAUSED OVERRIDES EVERYTHING
      if (paused) {
        return { text: "Paused", color: "text-yellow-500" };
      }

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
    }, [status, paused]);

    const isCampaignOver = Number(status) !== 0;

  /* ------------------ SAFE CONDITIONAL UI ------------------ */

  if (!checked) return <div className="p-6 text-white">Checking wallet…</div>;
  if (!address) return <div className="p-6 text-white">Invalid campaign address</div>;

  /* ------------------ PAGE UI ------------------ */

  return (
    <section className="min-h-screen bg-background p-6 relative">

{showTierModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Create Tier</h3>

      <input
        placeholder="Tier name"
        value={tierName}
        onChange={(e) => setTierName(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        placeholder="Amount (ETH)"
        value={tierAmount}
        onChange={(e) => setTierAmount(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowTierModal(false)}
          className="px-4 py-2 text-sm border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleCreateTier}
          disabled={isPending}
          className="px-4 py-2 text-sm bg-primary text-white rounded"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  </div>
)}

{showDeadlineModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-sm">
      <h3 className="font-semibold mb-4">Extend Deadline</h3>

      <input
        type="number"
        placeholder="Days to add"
        value={daysToAdd}
        onChange={(e) => setDaysToAdd(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowDeadlineModal(false)}
          className="border px-4 py-2 rounded text-sm"
        >
          Cancel
        </button>

        <button
          onClick={handleExtendDeadline}
          className="bg-secondary text-white px-4 py-2 rounded text-sm"
        >
          Extend
        </button>
      </div>
    </div>
  </div>
)}


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

          {paused && (
            <div className="text-xs text-yellow-600 mt-2">
              Campaign is currently paused
            </div>
          )}


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
              <button onClick={() => setShowTierModal(true)} disabled={isPending || txConfirming} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded border border-primary hover:bg-primary/90">
                <Plus size={16} /> Create New Tier
              </button>

              <button onClick={() => setShowDeadlineModal(true)} className="flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm rounded border border-secondary hover:bg-secondary/90">
                <CalendarPlus size={16} /> Extend Deadline
              </button>

<button
  onClick={handleTogglePause}
  className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm rounded"
>
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
                const isThisTierFunding = fundingTierIndex === i && (isPending || txConfirming);

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

                    <button
                      disabled={paused || isCampaignOver || isPending || txConfirming}
                      onClick={() => handleFundTier(i, amountWei as bigint)}
                      className={`mt-4 w-full px-4 py-2 rounded text-sm font-medium
                        ${
                          paused
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-primary/90"
                        }`}
                    >
                      {paused
                        ? "Paused"
                        : isCampaignOver
                        ? "Campaign Ended"
                        : isThisTierFunding
                        ? "Funding..."
                        : "Fund this Tier"}
                    </button>

                    <div className="w-full flex items-center justify-center">
                    {isOwner && (
                      <button
                        onClick={() => handleDeleteTier(i)}
                        className="mt-2 text-base text-red-600 hover:underline flex items-center cursor-pointer"
                      >
                        Delete Tier
                      </button>

                    )}
                    </div>
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
