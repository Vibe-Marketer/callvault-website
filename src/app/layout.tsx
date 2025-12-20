import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'CallVault – Turn Your Calls Into a Profit Library',
    template: '%s | CallVault',
  },
  description: 'Stop doing more. Start profiting from the calls you already have. CallVault turns every Fathom recording into an organized, searchable library for coaches and consultants.',
  metadataBase: new URL('https://callvaultai.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://callvaultai.com',
    siteName: 'CallVault',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@callvaultai',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background`}>
        {children}
        <script defer data-domain="callvaultai.com" src="https://plausible.io/js/pa-bRUjMEzJqZJc0A60MquWq.js"></script>
        <script
          dangerouslySetInnerHTML={{
             __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`
          }}
        />
      </body>
    </html>
  );
}
