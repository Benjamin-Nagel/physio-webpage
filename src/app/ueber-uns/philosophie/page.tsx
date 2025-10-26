import type { Metadata } from "next";
import {
	PageBottomContent,
	PageMiddleContent,
	PageTopContent,
	PageWrapper,
} from "@/components/PageWrapper";
import { generateSimpleMetadata } from "@/data/seo";

export async function generateMetadata(): Promise<Metadata> {
	return generateSimpleMetadata("Philosophie");
}

export default function Philosophie() {
	return (
		<PageWrapper context={{ id: 210, type: "my-page" }}>
			<PageTopContent></PageTopContent>
			<PageMiddleContent></PageMiddleContent>
			<PageBottomContent></PageBottomContent>
		</PageWrapper>
	);
}
