import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Saira, Saira_Stencil_One } from 'next/font/google';
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const saira = Saira({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-saira',
});

const sairaStencilOne = Saira_Stencil_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-saira-stencil',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capputeeno",
  description: "Loja de tecnologia minimalista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${saira.variable} ${sairaStencilOne.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
