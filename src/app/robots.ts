import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			allow: "/",
			disallow: ["*/404", "/_next/", "/api/"],
			userAgent: "*",
		},
		sitemap: `${"baseUrl"}/sitemap.xml`,
	};
}
