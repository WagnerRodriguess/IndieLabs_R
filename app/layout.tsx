'use client'; 
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import AuthProvider from '../components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const pathname = usePathname();
  const isGamePage = pathname.startsWith('/games/');

  return (
    <html lang="en">
      <head>
        <title>Indie Labs</title>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
          {!isGamePage && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}