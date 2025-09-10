export const metadata = { title: "NFL Prop Mini App", description: "$1 USDC prop sweepstakes on Base" };
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import { AppShell } from "@/components/AppShell";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
