import type { Metadata } from "next";
import { webpageData } from "./general-page-data";

export const baseMetadata: Metadata = {
	alternates: {
		canonical: webpageData.baseUrl,
	},
	description: webpageData.description,
	keywords: webpageData.keywords,
	metadataBase: new URL(webpageData.baseUrl),
	openGraph: {
		description: webpageData.description,
		images: [
			{
				alt: webpageData.name,
				height: 630,
				url: "/og-image.jpg",
				width: 1200,
			},
		],
		locale: "de_DE",
		siteName: webpageData.webpageName,
		title: webpageData.name,
		type: "website",
		url: webpageData.baseUrl,
	},
	robots: {
		follow: true,
		googleBot: {
			follow: true,
			index: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
		index: true,
	},
	title: {
		default: webpageData.name,
		template: `%s | ${webpageData.name}`,
	},
	twitter: {
		card: "summary_large_image",
		description: webpageData.description,
		images: ["/og-image.jpg"],
		title: webpageData.name,
	},
};
