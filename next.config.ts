import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Redirects for pages that live on the main app (alpha.lyticalabs.ai)
  async redirects() {
    return [
      { source: '/contact', destination: 'https://alpha.lyticalabs.ai/contact', permanent: false },
      { source: '/careers', destination: 'https://alpha.lyticalabs.ai/careers', permanent: false },
      { source: '/support', destination: 'https://alpha.lyticalabs.ai/support', permanent: false },
      { source: '/sign-in', destination: 'https://alpha.lyticalabs.ai/sign-in', permanent: false },
    ];
  },
};

export default nextConfig;
