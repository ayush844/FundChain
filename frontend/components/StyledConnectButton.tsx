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
                  className="px-4 py-1.5 bg-primary text-white font-semibold 
                             border-2 border-primary rounded-md text-xs sm:text-sm
                             hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Connect Wallet
                </button>
              ) : chain.unsupported ? (
                /* ---------------- WRONG NETWORK ---------------- */
                <button
                  onClick={openChainModal}
                  className="px-4 py-1.5 bg-red-600 text-white font-semibold 
                             rounded-md border-2 border-red-600 text-xs sm:text-sm 
                             hover:bg-red-700 transition shadow-sm"
                >
                  Wrong Network
                </button>
              ) : (
                /* ---------------- CONNECTED (COMPACT VERSION) ---------------- */
                <button
                  onClick={openAccountModal}
                  className="flex items-center gap-2 sm:gap-2.5 
                             px-3 sm:px-3.5 py-1.5 bg-white text-primary 
                             border-2 border-primary rounded-md 
                             hover:bg-primary/10 transition-colors shadow-sm text-xs sm:text-sm"
                >
                  {/* Avatar */}
                  {account.ensAvatar ? (
                    <img
                      src={account.ensAvatar}
                      alt="avatar"
                      className="w-5 h-5 rounded-full border border-primary/40"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                      <span className="text-primary text-[10px] font-bold">
                        {account.displayName?.slice(0, 2)?.toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Address */}
                  <span className="font-semibold truncate max-w-[70px] sm:max-w-[110px] text-xs sm:text-sm">
                    {account.displayName}
                  </span>

                  {/* Balance */}
                  {account.displayBalance && (
                    <span className="text-[10px] sm:text-xs text-primary/70 font-medium">
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
