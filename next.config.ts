import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isWorkflowBuild = process.env.WORKFLOW_BUILD || false
let repoName = ""
if (isProd && isWorkflowBuild) {
	const pageUrlParts = process.env.PAGE_URL?.split("/")
	repoName = pageUrlParts[pageUrlParts.length - 1]
}

const resultBasePath = isProd ? `/${repoName}` : ""
const resultAssetPrefix = isProd ? `/${repoName}/` : ""

const nextConfig: NextConfig = {
	experimental: {
		inlineCss: true,
	},
	images: {
		remotePatterns: isProd === true ? [] : [new URL("http://localhost:8080/**")],
		unoptimized: true,
	},
	// /* config options here */
	output: "export",
	trailingSlash: true,
	basePath: resultBasePath,
  	assetPrefix: resultAssetPrefix,
};

export default nextConfig;
