import type { Metadata } from "next";
import { PageMiddleContent, PageWrapper } from "@/components/PageWrapper";
import { generateSimpleMetadata } from "@/data/seo";

const galleryImages = [
	{ alt: "Behandlungsraum mit Therapiegeräten", src: "/images/praxis-1.jpg" },
	{
		alt: "Massageraum mit entspannter Atmosphäre",
		src: "/images/praxis-2.jpg",
	},
	{
		alt: "Patient beim Krankengymnastik Training",
		src: "/images/praxis-3.jpg",
	},
	{ alt: "Therapeut erklärt Übung", src: "/images/praxis-4.jpg" },
];

export async function generateMetadata(): Promise<Metadata> {
	return generateSimpleMetadata("Impressionen");
}

export default function Impressionen() {
	return (
		<PageWrapper context={{ id: 213, type: "my-page" }}>
			<PageMiddleContent>
				{/* <ImageGallery images={galleryImages} /> */}
				<p>ImageGallery</p>
			</PageMiddleContent>
		</PageWrapper>
	);
}
