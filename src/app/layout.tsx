import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const SITE_NAME = 'Lytica Labs';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lyticalabs.ai').replace(/\/$/, '');
const DEFAULT_OG_IMAGE = '/assets/lytica-brand-dark-224x164.png';
const DESCRIPTION =
  'Lytica Labs turns modern data stacks into an AI-native analytics layer for revenue, operations, and data teams.';

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
};

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
};

const STRUCTURED_DATA = [
  { id: 'organization', data: ORGANIZATION_JSON_LD },
  { id: 'website', data: WEBSITE_JSON_LD },
] as const;

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
    images: [{ url: DEFAULT_OG_IMAGE, width: 224, height: 164, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Generative Analytics for Revenue & Ops Teams`,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
        {STRUCTURED_DATA.map(({ id, data }) => (
          <script
            id={`lytica-json-ld-${id}`}
            key={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data),
            }}
          />
        ))}
        {/* Deployment marker: dev-branch-2026-04-27 */}
        {children}
      </body>
    </html>
  );
}
