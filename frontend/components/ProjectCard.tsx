// frontend/components/ProjectCard.tsx
"use client";

import Link from "next/link";
import { ethers } from "ethers";
import { formatEther } from "ethers";

import { useEffect, useState } from "react";
import campaignAbi from "@/contracts/Crowdfunding.json";
import { useReadContract } from "wagmi";

type Props = {
  address: string;
  name: string;
  owner: string;
  creationTime: string; // unix timestamp string
};

export default function ProjectCard({ address, name, owner, creationTime }: Props) {
  const [dateStr, setDateStr] = useState("");
  // Read contract balance for this campaign (optional)
  const { data: balanceData } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "getContractBalance",
    query: {
        refetchInterval: 4000, // re-run every 4s 
    }
  });

    // === GET GOAL ===
  const { data: goalData } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "goal",
    query: { refetchInterval: false },
  });

  useEffect(() => {
    if (creationTime) {
      const t = Number(creationTime) * 1000;
      setDateStr(new Date(t).toLocaleString());
    }
  }, [creationTime]);

  const balanceWei = balanceData ?? 0;
//   const balanceEth =
//     balanceWei && balanceWei?.toString ? ethers.utils.formatEther(balanceWei.toString()) : "0";

const balanceEth =
  balanceWei ? formatEther(balanceWei as bigint) : "0";


  // === FORMAT BALANCE ===
  const balanceEthNum = balanceData ? Number(formatEther(balanceData as bigint)) : 0;

  // === FORMAT GOAL ===
  const goalEthNum = goalData ? Number(formatEther(goalData as bigint)) : 0;

  // === PROGRESS CALCULATIONS ===
  const progress = goalEthNum > 0 ? (balanceEthNum / goalEthNum) * 100 : 0;
  const progressClamped = Math.min(progress, 100);
  const overfundMultiplier = goalEthNum > 0 ? balanceEthNum / goalEthNum : 0;


  return (
<div className="relative rounded-2xl bg-white p-6 border border-gray-200
                shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]
                hover:shadow-[0_18px_45px_-12px_rgba(0,0,0,0.25)]
                transition-all duration-300 hover:-translate-y-1">

  {/* LEFT ACCENT STRIP */}
  <div className="absolute inset-y-0 left-0 w-1.5 rounded-l-2xl
                  bg-gradient-to-b from-primary via-secondary to-primary" />

  {/* SOFT INNER GLOW */}
  <div className="absolute inset-0 rounded-2xl
                  bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

  {/* CONTENT */}
  <div className="relative">

    {/* PROGRESS SECTION */}
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Funding Progress
        </span>
        <span className="text-sm font-bold text-gray-900">
          {progress.toFixed(1)}%
        </span>
      </div>

      <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            progress >= 100
              ? "bg-gradient-to-r from-green-400 to-green-600"
              : "bg-gradient-to-r from-primary to-secondary"
          }`}
          style={{ width: `${progressClamped}%` }}
        />
      </div>

      {progress < 100 ? (
        <p className="mt-2 text-xs text-gray-500">
          {balanceEthNum.toFixed(4)} / {goalEthNum} ETH raised
        </p>
      ) : (
        <p className="mt-2 text-xs font-semibold text-green-600">
          Overfunded {overfundMultiplier.toFixed(2)}× 🎉
        </p>
      )}
    </div>

    {/* SECTION DIVIDER */}
    <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

    {/* DETAILS */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

      {/* LEFT */}
<div className="flex-1 min-w-0 basis-0 w-full">
  <h3
    className="text-xl font-bold text-gray-900 truncate"
    title={name}
  >
    {name || "Untitled Campaign"}
  </h3>

  <div className="mt-1 space-y-1 text-sm">
    <div className="flex items-center gap-1 min-w-0">
      <span className="font-semibold text-gray-700 shrink-0">
        Creator:
      </span>
      <span
        className="block truncate w-full text-gray-500 text-sm"
        title={owner}
      >
        {owner}
      </span>
    </div>

    <p className="text-xs text-gray-500">
      <span className="font-semibold text-gray-700">Created:</span>{" "}
      {dateStr || "—"}
    </p>
  </div>
</div>

      {/* RIGHT */}
      <div className="w-full md:w-auto shrink-0 text-left md:text-right">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
          Balance
        </p>

        <p className="text-2xl font-bold text-gray-900 mb-3">
          {Number(balanceEth).toFixed(4)} ETH
        </p>

        <Link
          href={`/projects/${address}`}
          className="inline-flex items-center justify-center px-5 py-2 rounded-lg
                     bg-primary text-white text-sm font-semibold
                     hover:bg-primary/90 transition-all
                     shadow-md hover:shadow-lg w-full md:w-auto"
        >
          View Campaign →
        </Link>
      </div>

    </div>
  </div>
</div>

  );
}
