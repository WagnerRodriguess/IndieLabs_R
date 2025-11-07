'use client'; 
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Metadata } from "next";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const pathname = usePathname();
  const isGamePage = pathname.startsWith('/games/');

  return (

    
    <html lang="pt-br">

      <head>
          <title>Indie Labs</title>
      </head>
      
      <body className={inter.className}>
        <Header />
        {children}
        {!isGamePage && <Footer />}
      </body>
    </html>
  );
}