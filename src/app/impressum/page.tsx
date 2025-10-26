import type { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import { generateSimpleMetadata } from "@/data/seo";

export async function generateMetadata(): Promise<Metadata> {
	return generateSimpleMetadata("Impressum");
}

export default function Impressum() {
	return <PageWrapper context={{ id: 237, type: "my-page" }}></PageWrapper>;
}
