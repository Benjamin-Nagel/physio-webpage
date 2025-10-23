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
import { treatments } from "@/data/treatments";

export default function Leistungen() {
	return (
		<PageWrapper context={{ id: 239, type: "my-page" }}>
			<PageTopContent>
				<Text headline="Lorem Ipsum">
					<LoremIpsum size="big" />
				</Text>
			</PageTopContent>
			<PageMiddleContent>
				<Grid
					elements={treatments.map((treatment) => {
						return {
							description: treatment.short_description,
							image: {
								cmsImageId: treatment.image,
								rounded: true,
							},
							link: {
								href: `/leistungen/${treatment.slug}`,
								title: "mehr",
							},
							title: treatment.name,
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
					headline="Warum unsere Leistungen?"
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
