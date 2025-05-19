import Header from "@/components/header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const creepster = localFont({
  src: "./fonts/Creepster-Regular.ttf",
  variable: "--font-creepster",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ricky and Morty - Episode List",
  description: "This is a Rick and Morty episode list app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${creepster.variable} antialiased bg-background`}
      >
        <Header title="Ricky and Morty" />
        {children}
      </body>
    </html>
  );
}
