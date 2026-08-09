import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  experimental: {
    middlewarePrefetch: "strict",
  },
  /* config options here */
};

export default nextConfig;
