import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dots and Boxes",
  description:
    "A multiplayer game where the goal is to connect dots to form boxes. The player with the most boxes wins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} h-full w-full bg-gradient-to-br from-slate-100 to-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
