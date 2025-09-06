export const metadata = { title: "NFL Prop Mini App", description: "$1 USDC prop sweepstakes on Base" };
import "./globals.css";
import { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OnchainKitProvider chain={base} config={{ appearance: { name: "NFL Prop Mini App" } }}>
          {children}
        </OnchainKitProvider>
      </body>
    </html>
  );
}
