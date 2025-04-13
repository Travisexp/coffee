import { Providers } from '@/providers';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Retail Brand - Premium Products',
  description: 'Discover our curated collection of premium products designed to enhance your lifestyle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121212] text-gray-200`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
