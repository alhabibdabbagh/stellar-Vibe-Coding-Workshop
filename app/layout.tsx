import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MicroWallet - Stellar Soroban DApp",
  description: "A decentralized wallet powered by Stellar Soroban",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
