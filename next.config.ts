import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isWorkflowBuild = process.env.WORKFLOW_BUILD || false;
let repoName = "";
if (isProd && isWorkflowBuild && process.env.PAGE_URL !== undefined) {
	const url = new URL(process.env.PAGE_URL);
	const pathName = url.pathname;
	repoName = pathName.substring(1, pathName.length);
}

const resultBasePath = isProd && repoName !== "" ? `/${repoName}` : "";
const resultAssetPrefix = isProd && repoName !== "" ? `/${repoName}/` : "";

const nextConfig: NextConfig = {
	assetPrefix: resultAssetPrefix,
	basePath: resultBasePath,
	experimental: {
		inlineCss: true,
	},
	images: {
		remotePatterns:
			isProd === true ? [] : [new URL("http://localhost:8080/**")],
		unoptimized: true,
	},
	// /* config options here */
	output: "export",
	trailingSlash: true,
};

export default nextConfig;
