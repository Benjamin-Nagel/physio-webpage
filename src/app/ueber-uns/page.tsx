import type { Metadata } from "next";
import {
	PageBottomContent,
	PageMiddleContent,
	PageTopContent,
	PageWrapper,
} from "@/components/PageWrapper";
import { generateSimpleMetadata } from "@/data/seo";

export async function generateMetadata(): Promise<Metadata> {
	return generateSimpleMetadata("Über uns");
}

export default function UeberUns() {
	return (
		<PageWrapper context={{ id: 208, type: "my-page" }}>
			<PageTopContent></PageTopContent>
			<PageMiddleContent></PageMiddleContent>
			<PageBottomContent></PageBottomContent>
		</PageWrapper>
	);
}
