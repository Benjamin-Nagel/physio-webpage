import "./globals.css";

import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import CookieManager from "@/components/Klaro";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import { baseMetadata } from "@/data/seo";

const Footer = dynamic(() =>
	import("@/components/Footer").then((block) => block.Footer),
);

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export const metadata = baseMetadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="de">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="bg-white">
					<Header />
					<main>{children}</main>
					<Footer />
				</div>
				<SeoStructuredData />
				<CookieManager />
			</body>
		</html>
	);
}
