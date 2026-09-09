import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@temperkit/schema", "@temperkit/runtime"],
};

export default nextConfig;
