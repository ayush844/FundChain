"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygonAmoy, hardhat } from "wagmi/chains";
import { darkTheme, lightTheme } from "@rainbow-me/rainbowkit";

const config = getDefaultConfig({
  appName: "Crowdfunding Dapp",
  projectId: "0444c92e10178565891722fdcc2ced4d",  // Get from WalletConnect Cloud
  chains: [hardhat, polygonAmoy],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
