import type { CookieInformation, WebpageDataType } from "@/types/types";

const cookieInformation: CookieInformation = {
	providers: [
		{
			hosts: "",
			name: "externalTracker",
			provider: {
				address: "",
				cookieUrl: "",
				dataPrivacyUrl: "",
				description: "",
				name: "",
			},
			purposes: ["analytics", "security"],
			title: "External Tracker",
		},
	],
	services: [
		{
			cookies: [
				{
					description: "",
					hosts: "",
					lifeTime: "365",
					name: "klaro",
					type: "http",
				},
			],

			// If "default" is set to true, the service will be enabled by default
			// Overwrites global "default" setting.
			// We recommend leaving this to "false" for services that collect
			// personal information.
			default: true,

			description: "asdasdsds",

			hosts: "",
			// Each service should have a unique (and short) name.
			name: "consent",
			provider: {
				address: "",
				cookieUrl: "",
				dataPrivacyUrl: "",
				description: "",
				name: "",
			},

			// The purpose(s) of this service. Will be listed on the consent notice.
			// Do not forget to add translations for all purposes you list here.
			purposes: ["functional"],
			required: true,

			// The title of your service as listed in the consent modal.
			title: "Consent Manager",
		},
		{
			callback: (consent, service) => {
				if (service && service.name === "google-maps") {
					// Senden eines benutzerdefinierten Events, das React abfangen kann
					document.dispatchEvent(
						new CustomEvent("klaro-google-maps-consent", {
							detail: { accepted: consent },
						}),
					);
				}
			},
			contextualConsentOnly: false,
			cookies: [],
			default: false,
			hosts: "",
			name: "google-maps",
			provider: {
				address: "",
				cookieUrl: "",
				dataPrivacyUrl: "",
				description: "",
				name: "",
			},
			purposes: ["functional"],
			title: "Google Maps",
		},
	],
};

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
	cookieInformation: cookieInformation,
	description:
		"Physiotherapie, Krankengymnastik und manuelle Therapie in STADT.",
	email: "info@physio-page.tld",
	fax: "+49 221 12 12 13",
	keywords: [
		"Physiotherapie STADT",
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
