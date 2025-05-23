import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { EpisodeProvider } from "@/context/EpisodeContext";
import { FilterProvider } from "@/context/FilterContext";
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
}>): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${creepster.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FilterProvider>
            <EpisodeProvider>
              <div className="relative min-h-screen w-full overflow-hidden">
                <div
                  className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-fixed"
                  style={{
                    backgroundImage: "url('/background.jpg')",
                  }}
                />

                <div className="absolute inset-0 z-10 bg-black/60" />

                <div className="relative z-20">
                  <Navbar />
                  <main className="container mx-auto px-4 py-6">
                    {children}
                  </main>
                </div>
              </div>
            </EpisodeProvider>
          </FilterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
