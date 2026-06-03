import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'PakHub — Find Your Perfect Place in Pakistan',
  description: "Multan's trusted platform to find properties for rent and sale. Browse, view, and connect with sellers easily.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          style={{ fontFamily: "'Inter', 'Geist Sans', Arial, sans-serif" }}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
