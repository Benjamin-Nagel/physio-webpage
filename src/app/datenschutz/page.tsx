import type { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { generateSimpleMetadata } from "@/data/seo";

export async function generateMetadata(): Promise<Metadata> {
	return generateSimpleMetadata("Datenschutz");
}

export default function Datenschutz() {
	return <PageWrapper context={{ id: 235, type: "my-page" }}></PageWrapper>;
}
