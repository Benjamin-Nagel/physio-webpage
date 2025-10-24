import {
	ArrowPathIcon,
	ChartBarIcon,
	ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import {
	Exercise,
	GroupDiscussionMeeting,
	Head,
	Health,
	Joints,
	Pain,
	PainManagment,
	Refused,
} from "healthicons-react";
import {
	HeroOverrideContent,
	PageMiddleContent,
	PageTopContent,
	PageWrapper,
} from "@/components/PageWrapper";
import { Hero } from "@/components/ui/Hero";
import { treatments } from "@/data/treatments";
import { usePageContent } from "@/lib/fetchContent";
import type { Treatment } from "@/types/types";

const kgOffers = [
	{
		description:
			"Sanfte Übungen zur Verbesserung der Beweglichkeit und Reduzierung von Steifheit.",
		icon: Joints,
		name: "Mobilisation der Gelenke",
	},
	{
		description:
			"Gezieltes Training zur Stabilisierung und Unterstützung geschwächter Muskelgruppen.",
		icon: Exercise,
		name: "Kräftigung der Muskulatur",
	},
	{
		description:
			"Methoden zur Reduzierung von Schmerzen und Vorbeugung von Verletzungen.",
		icon: Pain,
		name: "Schmerzlinderung & Prävention",
	},
	// weitere Angebote…
];

const therapySteps = [
	{
		description:
			"Analyse Ihrer Beschwerden, Anamnese und Zielsetzung für die Therapie.",
		icon: Head,
		step: 1,
		title: "Erstgespräch & Befund",
	},
	{
		description:
			"Auf Sie zugeschnittene Übungen zur Verbesserung von Beweglichkeit und Kraft.",
		icon: ClipboardDocumentIcon,
		step: 2,
		title: "Individueller Trainingsplan",
	},
	{
		description:
			"Begleitete Übungen unter fachlicher Anleitung, damit Sie die Techniken sicher erlernen.",
		icon: Refused,
		step: 3,
		title: "Übungsanleitung & Betreuung",
	},
	{
		description:
			"Regelmäßige Kontrolle und Anpassung der Übungen zur optimalen Entwicklung.",
		icon: ChartBarIcon,
		step: 4,
		title: "Fortschrittskontrolle",
	},
];

const kgBenefits = [
	{
		description:
			"Gezielte Übungen, die Ihre Gelenk- und Muskelbeweglichkeit nachhaltig fördern.",
		icon: ArrowPathIcon,
		title: "Verbesserung der Beweglichkeit",
	},
	{
		description:
			"Reduzierung von Beschwerden durch gezielte, therapeutische Übungen.",
		icon: PainManagment,
		title: "Schmerzlinderung",
	},
	{
		description:
			"Kräftigung der Muskulatur zur Stabilisierung und Vorbeugung von Verletzungen.",
		icon: Health,
		title: "Prävention von Verletzungen",
	},
	{
		description:
			"Individuelle Anleitung durch qualifizierte Physiotherapeuten.",
		icon: GroupDiscussionMeeting,
		title: "Persönliche Betreuung",
	},
];

interface LeistungParams {
	params: {
		slug: string;
	};
}

export async function generateStaticParams() {
	return treatments.map((item) => {
		return { slug: item.slug };
	});
}

export default function Leistung({ params }: LeistungParams) {
	const { slug } = params;
	const treatment = treatments.find((item) => item.slug === slug);

	const content: Treatment = usePageContent<"treatments">({
		id: treatment?.id || 0,
		type: "treatments",
	});
	if (!treatment) {
		return <div>Seite nicht gefunden</div>;
	}

	const heroHeadline = treatment.name;
	let heroDescription: string = treatment.short_description;

	if (content.short_description) {
		heroDescription = content.short_description;
	}

	return (
		<PageWrapper context={{ id: 241, type: "my-page" }}>
			<HeroOverrideContent>
				<Hero
					description={heroDescription}
					headline={heroHeadline}
					image={{ cmsImageId: content.image }}
				/>
			</HeroOverrideContent>
			<PageTopContent>
				<div>
					{content.description && (
						<div
							className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
							dangerouslySetInnerHTML={{ __html: content.description }}
						/>
					)}
				</div>
			</PageTopContent>

			<PageMiddleContent>
				<section className="py-12 bg-gray-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-6">
							Unsere Krankengymnastik-Angebote
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{kgOffers.map((offer) => (
								<div
									className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
									key={offer.name}
								>
									<div className="flex columns-2 gap-2">
										<offer.icon className="w-10 h-10 text-indigo-600 mb-4" />
										<h3 className="text-xl font-semibold mb-2">{offer.name}</h3>
									</div>
									<p className="text-gray-600">{offer.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="py-12 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-8">
							Ihr Therapieplan
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{therapySteps.map(({ step, title, description, icon: Icon }) => (
								<div
									className="flex flex-col items-start p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition"
									key={step}
								>
									<div className="flex columns-2 gap-2">
										<Icon className="w-10 h-10 text-indigo-600 mb-4" />
										<h3 className="text-xl font-semibold mb-2">{title}</h3>
									</div>
									<p className="text-gray-600">{description}</p>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className="py-12 bg-indigo-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-8">
							Ihre Vorteile
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{kgBenefits.map(({ title, description, icon: Icon }) => (
								<div
									className="flex flex-col items-start p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
									key={title}
								>
									<div className="flex columns-2 gap-2">
										<Icon className="w-10 h-10 text-indigo-600 mb-4" />
										<h3 className="text-xl font-semibold mb-2">{title}</h3>
									</div>
									<p className="text-gray-600">{description}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</PageMiddleContent>
		</PageWrapper>
	);
}
