import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-99a5f5ba-101d-41db-ad02-69ea0904665f.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
