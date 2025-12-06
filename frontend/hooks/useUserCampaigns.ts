"use client";

import { useReadContract } from "wagmi";
import factoryAbi from "@/contracts/CrowdfundingFactory.json";
import { FACTORY_ADDRESS } from "./useFactory";

export function useUserCampaigns(user?: string) {
  const enabled = Boolean(user);

  const { data, isLoading, error } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryAbi.abi,
    functionName: "getUserCampaigns",
    args: user ? [user] : undefined,
    query: {
      enabled,
      refetchInterval: false,
    },
  });

    const campaigns =
    Array.isArray(data)
      ? data.map((c: any) => ({
          CampaignAddress: c?.CampaignAddress ?? c?.CampaignAddress ?? c[0],
          owner: c?.owner ?? c[1],
          name: c?.name ?? c[2],
          creationTime:
            c?.creationTime?.toString?.() ?? c?.creationTime ?? c[3]?.toString?.() ?? "0",
        }))
      : [];

  return { campaigns, isLoading, error };
}
