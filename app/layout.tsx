import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Providers from "./providers";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dog Search",
  description: "Created with Love for Fetch",
  icons: {
    icon: "./favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} bg-fetch-bg font-[family-name:var(--font-lexend)] text-fetch-text antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
