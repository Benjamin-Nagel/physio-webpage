import type { Metadata } from "next";
import {
	HeroOverrideContent,
	PageBottomContent,
	PageMiddleContent,
	PageTopContent,
	PageWrapper,
} from "@/components/PageWrapper";
import { CTA } from "@/components/ui/Cta";
import { Grid, type GridElement } from "@/components/ui/Grid";
import { Hero } from "@/components/ui/Hero";
import { LoremIpsum } from "@/components/ui/LoremIpsum";
import { Text } from "@/components/ui/Text";
import { complaints } from "@/data/complaints";
import { baseMetadata } from "@/data/seo";
import { treatments } from "@/data/treatments";

interface BeschwerdeParams {
	id: number;
	params: Promise<{ id: number; slug: string }>;
}

export async function generateMetadata({
	params,
}: BeschwerdeParams): Promise<Metadata> {
	const { slug } = await params;
	const complaint = complaints.find((item) => item.slug === slug);

	const clone = baseMetadata;
	clone.title = complaint?.name;
	clone.description = complaint?.short_description;

	return clone;
}

export async function generateStaticParams() {
	return complaints.map((item) => {
		return { id: item.id, slug: item.slug };
	});
}

export default async function Beschwerde({ params }: BeschwerdeParams) {
	const { slug } = await params;
	const complaint = complaints.find((item) => item.slug === slug);

	if (!complaint) {
		return <div>Seite nicht gefunden</div>;
	}

	return (
		<PageWrapper context={{ id: 231, type: "my-page" }}>
			<HeroOverrideContent>
				<Hero
					description={complaint.short_description}
					headline={complaint.name}
					image={{ cmsImageId: complaint.image }}
				/>
			</HeroOverrideContent>
			<PageTopContent>
				<Text headline={`Wie entstehen ${complaint.name}`} style="dark">
					<LoremIpsum size="big" />
				</Text>
				<Text headline={`Ursachen für ${complaint.name}`} style="dark">
					<LoremIpsum size="big" />
				</Text>
			</PageTopContent>
			<PageMiddleContent>
				{complaint.treatments.length > 0 ? (
					<Grid
						elements={complaint.treatments
							.map((aTreatmentSlug) => {
								const treatment = treatments.find(
									(treatment) => treatment.slug === aTreatmentSlug,
								);
								if (!treatment) {
									return undefined;
								}
								return {
									description: treatment.short_description,
									// icon: leistung?.icon,
									image: {
										cmsImageId: treatment.image,
										rounded: true,
									},
									link: {
										href: `/leistungen/${treatment.slug}`,
										title: "Mehr",
									},
									title: treatment.name,
								} satisfies GridElement;
							})
							.filter((element) => element !== undefined)}
						headline={`Wie wir bei ${complaint.name} helfen können?`}
					></Grid>
				) : undefined}
			</PageMiddleContent>
			<PageBottomContent>
				<CTA
					button={{ href: "/kontakt", title: "Termin vereinbaren" }}
					content="Schmerzfrei bewegen - beginnen Sie jetzt Ihren Weg zu mehr Lebensqualität."
					headline="Terminvereinbarung"
				/>
			</PageBottomContent>
		</PageWrapper>
	);
}
