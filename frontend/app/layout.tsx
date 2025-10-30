import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { Providers } from '../components/providers';
import { Navbar } from '../components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GameBro - Game Top-up Marketplace',
  description: 'Top up your favourite mobile games instantly with PromptPay or TrueMoney.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100">
      <body className={`${inter.className} min-h-screen bg-slate-950`}> 
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-800 bg-slate-900 py-6 text-center text-sm text-slate-400">
              © {new Date().getFullYear()} GameBro — Level up faster.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
