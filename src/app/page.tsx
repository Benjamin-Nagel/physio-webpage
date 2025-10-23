import {
	ArrowPathIcon,
	HeartIcon,
	ShieldCheckIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";
import {
	PageBottomContent,
	PageMiddleContent,
	PageWrapper,
} from "@/components/PageWrapper";
import { Grid } from "@/components/ui/Grid";
import { complaints } from "@/data/complaints";
import { webpageData } from "@/data/general-page-data";
import { treatments } from "@/data/treatments";

export const metadata: Metadata = {
	description:
		"Individuelle Physiotherapie, Krankengymnastik, manuelle Therapie & Massagen.",
	keywords: "Physiotherapie, Krankengymnastik, Massage, Lymphdrainage, CMD",
	openGraph: {
		description: "Individuelle Physiotherapie & ganzheitliche Betreuung.",
		images: [{ height: 630, url: "/og-image.jpg", width: 1200 }],
		locale: "de_DE",
		siteName: webpageData.webpageName,
		title: webpageData.name,
		type: "website",
		url: webpageData.baseUrl,
	},
	robots: {
		follow: true,
		googleBot: {
			follow: true,
			index: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
			noimageindex: false,
		},
		index: true,
		nocache: false,
	},
	title: webpageData.webpageName,
	twitter: {
		card: "summary_large_image",
		description: `Physiotherapie, Krankengymnastik, Massagen in ${webpageData.address.city}`,
		images: ["/og-image.jpg"],
		title: webpageData.name,
	},
};

export const testimonials = [
	{
		author: "Maria L.",
		text: "Nach nur wenigen Sitzungen konnte ich meine Schmerzen deutlich reduzieren – sehr professionelles Team!",
	},
	{
		author: "Jens K.",
		text: "Die Therapie hier ist individuell und effektiv, ich fühle mich bestens betreut.",
	},
	{
		author: "Sabrina M.",
		text: "Sehr kompetente Physiotherapeuten, die auf meine Bedürfnisse eingehen. Absolute Empfehlung!",
	},
	{
		author: "Thomas R.",
		text: "Meine Mobilität hat sich nach wenigen Wochen enorm verbessert. Tolles Team!",
	},
];
export const benefits = [
	{
		description:
			"Jede Therapie wird auf Ihre persönlichen Bedürfnisse und Ziele zugeschnitten.",
		icon: UserGroupIcon,
		title: "Individuelle Betreuung",
	},
	{
		description:
			"Qualifizierte Physiotherapeuten mit langjähriger Erfahrung und Fachwissen.",
		icon: ShieldCheckIcon,
		title: "Erfahrenes Team",
	},
	{
		description:
			"Innovative Therapien wie Krankengymnastik am Gerät oder Ultraschalltherapie.",
		icon: ArrowPathIcon,
		title: "Moderne Methoden",
	},
	{
		description:
			"Einfache Erreichbarkeit mit Parkmöglichkeiten direkt vor der Praxis.",
		icon: HeartIcon,
		title: "Zentrale Lage",
	},
];

export default function Home() {
	return (
		<PageWrapper context={{ id: 203, type: "my-page" }}>
			<PageMiddleContent>
				<Grid
					elements={treatments
						.sort((first, second) => first.name.localeCompare(second.name))
						.map(({ name, short_description, image, slug }) => {
							return {
								description: short_description,
								//icon: icon,
								image: {
									cmsImageId: image,
								},
								link: {
									href: `/leistungen/${slug}`,
									title: "Mehr...",
								},
								title: name,
							};
						})}
					headline="Unsere Leistungen"
					style="dark"
				/>

				<Grid
					elements={complaints
						.sort((first, second) => first.name.localeCompare(second.name))
						.map(({ name, short_description, image, slug }) => {
							return {
								description: short_description,
								//icon: icon,
								image: {
									cmsImageId: image,
								},
								link: {
									href: `/beschwerden/${slug}`,
									title: "Mehr...",
								},
								title: name,
							};
						})}
					headline="Beschwerden"
				/>

				<Grid
					elements={benefits
						.sort((first, second) => first.title.localeCompare(second.title))
						.map(({ title, description, icon }) => {
							return {
								description: description,
								icon: icon,
								title: title,
							};
						})}
					headline="Warum uns wählen"
					style="dark"
				/>
			</PageMiddleContent>
			<PageBottomContent>
				<section className="py-12 bg-indigo-50">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
						<h2 className="text-3xl font-bold mb-6">Patientenstimmen</h2>
						{testimonials.map((t) => (
							<blockquote className="text-gray-700 italic" key={t.author}>
								“{t.text}” – <strong>{t.author}</strong>
							</blockquote>
						))}
					</div>
				</section>

				<section className="py-12 bg-white text-center">
					<h2 className="text-3xl font-bold mb-6">Kontakt</h2>
					<Link
						className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500"
						href="/kontakt"
					>
						Termin vereinbaren
					</Link>
				</section>
			</PageBottomContent>
		</PageWrapper>
	);
}
