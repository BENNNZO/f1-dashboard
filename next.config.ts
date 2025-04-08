import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    env: {
        NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || `wss://${process.env.VERCEL_URL || process.env.RAILWAY_STATIC_URL}`
    }
};

export default nextConfig;


