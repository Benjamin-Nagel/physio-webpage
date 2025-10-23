import type { ReactElement, SVGProps } from "react";
import { complaints } from "./complaints";
import { treatments } from "./treatments";

type NavigationEntry = {
	name: string;
	href: string;
};

export type SubNavigationEntry = NavigationEntry & {
	description?: string;
	icon?: ReactElement<SVGProps<SVGSVGElement>>;
};

export type TopNavigationEntry = NavigationEntry & {
	children?: SubNavigationEntry[];
};

export const navigation: TopNavigationEntry[] = [
	{
		href: "/",
		name: "Home",
	},
	{
		children: complaints.map(({ slug, icon, ...rest }) => ({
			...rest,
			href: `/beschwerden/${slug}`,
			icon: icon,
		})),
		href: "/beschwerden",
		name: "Beschwerden",
	},
	{
		children: treatments.map(({ slug, icon, ...rest }) => ({
			...rest,
			href: `/leistungen/${slug}`,
			icon: icon,
		})),
		href: "/leistungen",
		name: "Leistungen",
	},
	{
		href: "/aktuelles",
		name: "Aktuelles",
	},
	{
		href: "/kontakt",
		name: "Kontakt",
	},
	{
		children: [
			{
				href: "/patienteninfo/ersttermin",
				name: "Ersttermin",
			},
			{
				href: "/patienteninfo/faq",
				name: "FAQ",
			},
			{
				href: "/patienteninfo/partner",
				name: "Partner",
			},
		],
		href: "/patienteninfo",
		name: "Patienteninfo",
	},
	{
		children: [
			{
				href: "/ueber-uns/impressionen",
				name: "Impressionen",
			},
			{
				href: "/ueber-uns/philosophie",
				name: "Philosophie",
			},
			{
				href: "/ueber-uns/praxisraeume",
				name: "Praxisräume",
			},
			{
				href: "/ueber-uns/team",
				name: "Team",
			},
		],
		href: "/ueber-uns",
		name: "Über uns",
	},
] as const;
