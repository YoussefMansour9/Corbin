import type {Metadata} from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { FloatingWhatsAppButton } from '@/components/landing/whatsapp-icon';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
  fallback: ['system-ui', 'arial'],
});


export const metadata: Metadata = {
  title: 'Corbin Staffing',
  description: 'Let Us Find The Right Employees For Your Needs',
  keywords: ['staffing', 'recruitment', 'outsourcing', 'hiring', 'professionals'],
  authors: [{ name: 'Corbin Staffing' }],
  icons: {
    icon: [
      { url: '/images/Logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/Logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/Logo.png',
    apple: '/images/Logo.png',
  },
  openGraph: {
    title: 'Corbin Staffing',
    description: 'Let Us Find The Right Employees For Your Needs',
    images: ['/images/Logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Corbin Staffing',
    description: 'Let Us Find The Right Employees For Your Needs',
    images: ['/images/Logo.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/images/Logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/Logo.png" />
      </head>
      <body className={`${poppins.className} antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Script
            src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
            strategy="afterInteractive"
        />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
