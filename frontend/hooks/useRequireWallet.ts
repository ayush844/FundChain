"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export function useRequireWallet() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Wallet not connected → redirect to landing page
    if (!isConnected) {
      router.replace("/");
    } else {
      setChecked(true); // allow page to render
    }
  }, [isConnected, router]);

  return { checked };
}
