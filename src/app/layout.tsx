import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import AppInit from "@/components/app-init";

import { CustomProvider } from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geist_mono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EvolveX | Wiki",
  description: "Evolvex dev team wiki.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist_mono.className} antialiased`}>
        <CustomProvider>
          {children}
          <AppInit />
        </CustomProvider>
        <Toaster />
      </body>
    </html>
  );
}
