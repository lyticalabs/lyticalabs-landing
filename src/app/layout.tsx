import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const SITE_NAME = 'Lytica Labs';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lyticalabs.ai';
const DESCRIPTION = 'Lytica Labs turns modern data stacks into an AI-native analytics layer for revenue, operations, and data teams.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Generative Analytics for Revenue & Ops Teams`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Generative Analytics for Revenue & Ops Teams`,
    description: DESCRIPTION,
    images: [{ url: '/assets/lytica-brand-dark-224x164.png', width: 224, height: 164, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Generative Analytics for Revenue & Ops Teams`,
    description: DESCRIPTION,
    images: ['/assets/lytica-brand-dark-224x164.png'],
  },
  icons: [{ url: '/assets/favicon.svg', type: 'image/svg+xml' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
