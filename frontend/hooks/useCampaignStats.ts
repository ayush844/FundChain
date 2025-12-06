"use client";

import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import campaignAbi from "@/contracts/Crowdfunding.json";
import { formatEther } from "viem";

export function useCampaignStats(addresses: string[]) {
  const contractCalls = useMemo(() => {
    return addresses.flatMap((addr) => [
      {
        address: addr as `0x${string}`,
        abi: campaignAbi.abi,
        functionName: "goal",
      },
      {
        address: addr as `0x${string}`,
        abi: campaignAbi.abi,
        functionName: "getContractBalance",
      },
      {
        address: addr as `0x${string}`,
        abi: campaignAbi.abi,
        functionName: "getCampaignStatus",
      },
    ]);
  }, [addresses]);

  const { data, isLoading } = useReadContracts({
    contracts: contractCalls,
    allowFailure: true,
  });

  // Convert flat results → grouped stats per campaign
  const stats = useMemo(() => {
    if (!data || data.length === 0) return [];

    const grouped: any[] = [];

    for (let i = 0; i < addresses.length; i++) {
      const goal = data[i * 3]?.result as bigint | undefined;
      const balance = data[i * 3 + 1]?.result as bigint | undefined;
      const status = data[i * 3 + 2]?.result as number | undefined;

      const goalEth = goal ? Number(formatEther(goal)) : 0;
      const balanceEth = balance ? Number(formatEther(balance)) : 0;

      const progress = goalEth > 0 ? (balanceEth / goalEth) * 100 : 0;
      const progressClamped = Math.min(progress, 100);

      grouped.push({
        goalEth,
        balanceEth,
        status,
        progress,
        progressClamped,
      });
    }

    return grouped;
  }, [data, addresses]);

  return { stats, isLoading };
}
