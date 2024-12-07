"use client";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { base } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { NEXT_PUBLIC_CDP_API_KEY } from "../config";
import { useWagmiConfig } from "../wagmi";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BuildType, OktoProvider } from "okto-sdk-react";

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const OKTO_CLIENT_API_KEY = process.env.NEXT_PUBLIC_OKTO_CLIENT_API_KEY;

function OnchainProviders({ children }: Props) {
  const wagmiConfig = useWagmiConfig();

  if (!GOOGLE_CLIENT_ID) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!OKTO_CLIENT_API_KEY) {
    throw new Error("Missing OKTO_CLIENT_API_KEY");
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <OnchainKitProvider
              apiKey={NEXT_PUBLIC_CDP_API_KEY}
              chain={base}
              config={{
                appearance: {
                  mode: "auto",
                  theme: "base",
                },
              }}
            >
              <RainbowKitProvider modalSize="compact">
                {children}
              </RainbowKitProvider>
            </OnchainKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </OktoProvider>
    </GoogleOAuthProvider>
  );
}

export default OnchainProviders;
