import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { Inter } from 'next/font/google';
import NavBar from '@/components/nav-bar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aerotoolbox',
  description: 'Cloudfront',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black bg-slate-200`}>
        <Providers>
          <div className="container mx-auto max-w-screen-xl">
            <NavBar />
            <main className="min-h-screen pt-24 sm:px-0 px-2">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
