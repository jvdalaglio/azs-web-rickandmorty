import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const creepster = localFont({
  src: "./fonts/Creepster-Regular.ttf",
  variable: "--font-creepster",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Rick and Morty Gerenciador de Episódios",
  description: "Gerencie seus episódios favoritos da série Rick and Morty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${creepster.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
            <Navbar />
            <main className="container mx-auto px-4 py-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
