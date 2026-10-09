'use client';

import React from 'react';
import './globals.css';
import { MarketplaceProvider } from '@/lib/marketplaceContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AI Content Creator Marketplace — Kampus.VC Challenge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="ByteXL HackXlarate 2026 Kampus.VC Challenge: AI-native two-sided creative marketplace connecting generative AI directors with top brands." />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <MarketplaceProvider>
          {children}
        </MarketplaceProvider>
      </body>
    </html>
  );
}
