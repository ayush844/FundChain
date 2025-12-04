// frontend/app/projects/[address]/page.tsx
"use client";

import { usePathname } from "next/navigation";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import campaignAbi from "@/contracts/Crowdfunding.json";
import { useReadContract } from "wagmi";
import { formatEther } from "ethers";

export default function CampaignDetailPage() {
  const { checked } = useRequireWallet();

  const path = usePathname(); // /projects/0x123...
  const address = path?.split("/").pop() ?? "";

  // New Wagmi v2 syntax
  const { data: tiersData, isLoading } = useReadContract({
    address: address as `0x${string}`,
    abi: campaignAbi.abi,
    functionName: "getTiers",
    query: {
      refetchInterval: false, // same as watch: false
    },
  });

  if (!checked) return <div>Checking wallet…</div>;
  if (!address) return <div>Invalid campaign address</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Campaign: {address}</h1>

      {isLoading && <p>Loading tiers…</p>}

      {!isLoading && Array.isArray(tiersData) && (
        <ul className="mt-4 space-y-2">
          {(tiersData as any[]).map((t: any, i: number) => {
            const tierName = t?.name ?? t[0];
            const amountWei = t?.amount ?? t[1];
            const backers = t?.backers?.toString?.() ?? t[2]?.toString?.() ?? "0";

            const amountEth = amountWei
              ? formatEther(amountWei as bigint)
              : "0";

            return (
              <li key={i} className="p-3 border rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{tierName}</div>
                    <div className="text-sm text-muted">Backers: {backers}</div>
                  </div>
                  <div className="text-right font-medium">
                    {Number(amountEth).toFixed(4)} ETH
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
