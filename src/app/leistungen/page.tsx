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
						{
							description:
								"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
							title: "Nach Operation oder Unfall",
						},
						{
							description:
								"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
							title: "Bei wiederkehrenden Schmerzen",
						},
						{
							description:
								"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
							title: "Bei Bewegungseinschränkungen",
						},
						{
							description:
								"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
							title: "Bei Verspannungen durch Büroarbeit",
						},
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
