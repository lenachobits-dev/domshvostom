import type { Metadata } from "next";
import "./globals.css";
import { Caveat, Nunito, Nunito_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { BridgeProvider } from "@/components/bridge-provider";
import { Toaster } from "@/components/ui/sonner";
import SiteHeader from "@/components/site-header";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-heading",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ui",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-accent",
});

const appName = "Дом с Хвостом";

export const metadata: Metadata = {
  title: appName,
  description: appName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn(
        "font-sans",
        nunito.variable,
        nunitoSans.variable,
        caveat.variable
      )}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
        />
      </head>
      <body className="antialiased min-h-screen bg-background flex flex-col">
        <BridgeProvider />
        <SiteHeader />
        <main data-header-offset className="flex-1">
          {children}
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
