import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Header from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/site-footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Movies App",
    default: "Next.js Movies App",
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              {children}
              <Footer />
              <TailwindIndicator />
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
