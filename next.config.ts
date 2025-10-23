import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		inlineCss: true,
	},
	// trailingSlash: true,
	images: {
		remotePatterns: [new URL("http://localhost:8080/**")],
		unoptimized: true,
	},
	// /* config options here */
	output: "export",
};

export default nextConfig;
