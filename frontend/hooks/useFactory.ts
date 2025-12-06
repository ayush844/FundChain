// frontend/hooks/useFactory.ts
"use client";

import { useCallback } from "react";
import { useReadContract } from "wagmi";
import factoryAbi from "@/contracts/CrowdfundingFactory.json";
import { ethers } from "ethers";

export const FACTORY_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // replace with your factory address

export type CampaignItem = {
  CampaignAddress: string;
  owner: string;
  name: string;
  creationTime: string; // unix timestamp string
};

export function useFactoryList() {
  // Read the getAllCampaigns() function from the factory
  const { data, isLoading, error, refetch } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryAbi.abi,
    functionName: "getAllCampaigns", 
    query: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnReconnect: false,
      staleTime: 5000, // 5 seconds — avoids UI flicker
    },
  });

  // Convert raw data into typed JS objects
  const campaigns: CampaignItem[] | undefined = Array.isArray(data)
    ? data.map((c: any) => {
        const CampaignAddress = c?.CampaignAddress ?? c[0];
        const owner = c?.owner ?? c[1];
        const name = c?.name ?? c[2];
        const creationTime =
          c?.creationTime?.toString?.() ??
          c[3]?.toString?.() ??
          "0";

        return {
          CampaignAddress,
          owner,
          name,
          creationTime,
        };
      })
    : undefined;

  return {
    campaigns,
    isLoading,
    error,
    refetch
  };
}
