// frontend/hooks/useFactory.ts
"use client";

import { useCallback } from "react";
import { useReadContract } from "wagmi";
import factoryAbi from "@/contracts/CrowdfundingFactory.json";
import { ethers } from "ethers";

export const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // replace with your factory address

export type CampaignItem = {
  CampaignAddress: string;
  owner: string;
  name: string;
  creationTime: string; // unix timestamp string
};

export function useFactoryList() {
  // Read the getAllCampaigns() function from the factory
  const { data, isLoading, error } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryAbi.abi,
    functionName: "getAllCampaigns", 
    query: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  });

  // Convert raw data into typed JS objects
  const campaigns: CampaignItem[] | undefined = (data as any[] | undefined)?.map(
    (c: any) => {
      // Some ABIs decode structs as arrays + named props; handle both cases
      const CampaignAddress = c?.CampaignAddress ?? c[0];
      const owner = c?.owner ?? c[1];
      const name = c?.name ?? c[2];
      const creationTime =
        (c?.creationTime?.toString && c.creationTime.toString()) ??
        (c[3] && c[3].toString());
      return { CampaignAddress, owner, name, creationTime };
    }
  );

  return {
    campaigns,
    isLoading,
    error,
  };
}
