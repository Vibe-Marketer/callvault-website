import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import PlausibleProvider from 'next-plausible';

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
      <head>
        <PlausibleProvider
          domain="callvaultai.com"
          customDomain="https://plausible.io"
          selfHosted={false}
        />
        {/* Termly Consent Management */}
        <Script
          id="termly-consent"
          strategy="beforeInteractive"
          src="https://app.termly.io/resource-blocker/3f67edc8-fd4d-4d1f-bd41-4dc048b22b0f?autoBlock=on"
        />
        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "uosln8lejc");
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background`}>
        {children}
      </body>
    </html>
  );
}
