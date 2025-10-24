import type {
	ForwardRefExoticComponent,
	ReactElement,
	RefAttributes,
	SVGProps,
} from "react";
import type { treatments } from "@/data/treatments";

export type OpeningHour = {
	day:
		| "Montag"
		| "Dienstag"
		| "Mittwoch"
		| "Donnerstag"
		| "Freitag"
		| "Samstag"
		| "Sonntag";
	start: string;
	end: string;
};

export type WebpageDataType = {
	webpageName: string;
	name: string;
	description: string;
	keywords: string[];
	baseUrl: string;
	address: {
		street: string;
		number: string;
		zipCode: string;
		city: string;
		lat: number;
		lng: number;
	};
	email: string;
	openHours: OpeningHour[];
	mobile: string;
	telephone: string;
	fax: string;
};

export type GenericIcon = ForwardRefExoticComponent<
	Omit<SVGProps<SVGSVGElement>, "ref"> & {
		title?: string;
		titleId?: string;
	} & RefAttributes<SVGSVGElement>
>;

export type SvgIconType =
	| React.ReactElement<React.SVGProps<SVGSVGElement>>
	| React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type GenericContentProps = {
	headline: string;
	style?: "light" | "dark";
};

export type GenericAcfContent = {
	id: number;
	name: string;
	slug: string;
	seo_title?: string;
	seo_description?: string;
};

export type FaqContent = {
	id: number;
	question: string;
	answer: string;
	seo_title?: string;
	seo_description?: string;
	content?: string;
};

export type TeamMember = {
	id: number;
	name: string;
	image: number;
	position: string;
	qualifikationen: string;
	bio: string;
};

export type PageInformation = GenericAcfContent & {
	title: string;
	hero_title?: string;
	hero_text?: string;
	hero_image?: number;
	content_title?: string;
	content?: string;
	cta_text?: string;
	cta_link?: string;
};

export type Treatment = GenericAcfContent & {
	short_description?: string;
	description?: string;
	image: number;
	icon?: ReactElement<SVGProps<SVGSVGElement>>;
	complaints: string[];
	cta_text?: string;
	cta_link?: string;
};

type TreatmentSlug = (typeof treatments)[number]["slug"];

export type Complaint = GenericAcfContent & {
	short_description?: string;
	description?: string;
	image: number;
	icon?: ReactElement<SVGProps<SVGSVGElement>>;
	faqs?: [
		{
			question: string;
			answer: string;
		},
	];
	treatments: TreatmentSlug[];
};
