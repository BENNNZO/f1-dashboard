import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    env: {
        NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || `wss://${process.env.RAILWAY_STATIC_URL || process.env.VERCEL_URL}`
    }
};

export default nextConfig;



