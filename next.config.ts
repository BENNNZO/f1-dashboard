import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    env: {
        NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL
    }
};

export default nextConfig;

