import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Sidebar } from "@/components/sidebar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Header from "@/components/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Movies App",
    default: "Next.js Movies App",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="app-container relative">
          <div className="pl-0 lg:pl-4 hidden lg:block">
            <Sidebar />
          </div>
          <main className="lg:ml-10">
            <div className="lg:rounded-tl-lg bg-accent fixed w-full h-full" />
            <div className="lg:rounded-tl-lg bg-accent fixed w-full h-[var(--radius)] z-20" />
            <div className="py-[var(--radius)] relative">{children}</div>
          </main>
        </div>
        <TailwindIndicator />
      </body>
    </html>
  );
}
