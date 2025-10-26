import type { Metadata } from "next";
import {
	PageBottomContent,
	PageMiddleContent,
	PageTopContent,
	PageWrapper,
} from "@/components/PageWrapper";
import { CTA } from "@/components/ui/Cta";
import { Grid } from "@/components/ui/Grid";
import { LoremIpsum } from "@/components/ui/LoremIpsum";
import { Text } from "@/components/ui/Text";
import { complaints } from "@/data/complaints";
import { generateSimpleMetadata } from "@/data/seo";

export async function generateMetadata(): Promise<Metadata> {
	return generateSimpleMetadata("Beschwerden");
}

export default function Beschwerden() {
	return (
		<PageWrapper context={{ id: 231, type: "my-page" }}>
			<PageTopContent>
				<Text headline="Wie wir bei Schmerzen vorgehen">
					<p>
						Wir betrachten Bewegung ganzheitlich - und suchen die Ursache Ihrer
						Beschwerden, um langfristige Besserung zu erreichen.
					</p>
					<LoremIpsum size="big" />
				</Text>
			</PageTopContent>
			<PageMiddleContent>
				<Grid
					elements={complaints.map((complaint) => {
						return {
							description: complaint.short_description,
							image: {
								cmsImageId: complaint.image,
								rounded: true,
							},
							link: {
								href: `/beschwerden/${complaint.slug}`,
								title: "mehr",
							},
							title: complaint.name,
						};
					})}
					headline="Wobei wir helfen können"
					style="dark"
				/>
				<Grid
					elements={[
						{ description: "", title: "Nach Operation oder Unfall" },
						{ description: "", title: "Bei wiederkehrenden Schmerzen" },
						{ description: "", title: "Bei Bewegungseinschränkungen" },
						{ description: "", title: "Bei Verspannungen durch Büroarbeit" },
					]}
					headline="Wann Sie zu uns kommen sollten"
					style="dark"
				/>
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
