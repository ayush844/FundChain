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


  return (
    <div className="border rounded-lg p-4 shadow-sm bg-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

            {/* Left Section */}
            <div className="flex-1">
            <h3 className="text-lg font-semibold">{name || "Untitled Campaign"}</h3>
            <p className="text-sm text-muted">Creator: {owner}</p>
            <p className="text-sm text-muted">Created: {dateStr || "—"}</p>
            </div>

            {/* Right Section */}
            <div className="text-left md:text-right w-full md:w-auto">
            <p className="text-sm text-muted">Balance</p>

            <p className="font-medium mb-2">
                {Number(balanceEth).toFixed(4)} ETH
            </p>

            <Link
                href={`/projects/${address}`}
                className="inline-block px-3 py-1 rounded bg-primary text-white text-sm w-full md:w-auto text-center"
            >
                View
            </Link>
            </div>

        </div>
    </div>

  );
}
