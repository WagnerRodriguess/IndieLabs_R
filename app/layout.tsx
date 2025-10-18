'use client';
import { usePathname } from 'next/navigation';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const pathname = usePathname();
  const isGamePage = pathname.startsWith('/games/');

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        
        {children} 
        
        {!isGamePage && <Footer />}

      </body>
    </html>
  );
}