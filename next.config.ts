import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH=/validation-ideas for GitHub Pages; empty for local dev at "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};
export default nextConfig;
