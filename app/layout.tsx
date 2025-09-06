export const metadata = { title: "NFL Prop Mini App", description: "$1 USDC prop sweepstakes on Base" };
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
