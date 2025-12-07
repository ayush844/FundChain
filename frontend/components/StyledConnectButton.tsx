"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function StyledConnectButton() {
  return (
    <div className="rainbow-custom">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          mounted,
          openAccountModal,
          openChainModal,
          openConnectModal,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div aria-hidden={!ready}>
              {/* ---------------- DISCONNECTED ---------------- */}
              {!connected ? (
                <button
                  onClick={openConnectModal}
                  className="px-6 py-2 bg-primary text-white font-bold border-2 border-primary 
                             hover:bg-primary/90 transition-colors rounded-md shadow-md text-sm"
                >
                  Connect Wallet
                </button>
              ) : chain.unsupported ? (
                /* ---------------- WRONG NETWORK ---------------- */
                <button
                  onClick={openChainModal}
                  className="px-6 py-2 bg-red-600 text-white font-bold border-2 border-red-600 
                             rounded-md hover:bg-red-700 transition-all text-sm shadow-md"
                >
                  Wrong Network
                </button>
              ) : (
                /* ---------------- CONNECTED (IMPROVED) ---------------- */
                <button
                  onClick={openAccountModal}
                  className="flex items-center gap-3 px-4 py-2 
                             bg-white text-primary border-2 border-primary rounded-full 
                             hover:bg-primary/10 transition-all shadow-sm"
                >
                  {/* Avatar */}
                  {account.ensAvatar ? (
                    <img
                      src={account.ensAvatar}
                      alt="avatar"
                      className="w-6 h-6 rounded-full border border-primary/40"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold">
                      {account.displayName?.slice(0, 2)?.toUpperCase()}
                    </div>
                  )}

                  {/* Wallet Address */}
                  <span className="font-semibold text-sm">
                    {account.displayName}
                  </span>

                  {/* Balance */}
                  {account.displayBalance && (
                    <span className="text-xs text-primary/70 font-medium">
                      {account.displayBalance}
                    </span>
                  )}
                </button>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
