'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styled from 'styled-components';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1rem; /* opcional, para dar um respiro nas laterais em telas menores */
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Container>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
      </Container>
    </html>
  );
}
