/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['avatars.githubusercontent.com'],
    },
    // Handle hydration mismatches more gracefully
    experimental: {
        suppressHydrationWarnings: true,
    },
    // Custom webpack config to handle client-side only libraries
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Handle browser-specific code
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },
};

export default nextConfig;
