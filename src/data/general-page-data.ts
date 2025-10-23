import type { WebpageDataType } from "@/types/types";

export const webpageData: WebpageDataType = {
	address: {
		city: "Köln",
		lat: 50.11111,
		lng: 6.33333,
		number: "123",
		street: "Meine Strasse",
		zipCode: "50123",
	},
	baseUrl: "https://www.physio-page.tld",
	description:
		"Physiotherapie, Krankengymnastik und manuelle Therapie in Köln Eigelstein.",
	email: "info@physio-page.tld",
	fax: "+49 221 12 12 13",
	keywords: [
		"Physiotherapie Köln",
		"Krankengymnastik",
		"Manuelle Therapie",
		"Lymphdrainage",
		"CMD Behandlung",
	],
	mobile: "+49 176 12 12 12 12",
	name: "Physio Name",
	openHours: [
		{
			day: "Montag",
			end: "17:00",
			start: "09:00",
		},
		{
			day: "Dienstag",
			end: "17:00",
			start: "09:00",
		},
		{
			day: "Mittwoch",
			end: "17:00",
			start: "08:00",
		},
		{
			day: "Donnerstag",
			end: "17:00",
			start: "09:00",
		},
		{
			day: "Freitag",
			end: "17:00",
			start: "09:00",
		},
	],
	telephone: "+49 221 12 12 12",
	webpageName: "Physio Name",
};
