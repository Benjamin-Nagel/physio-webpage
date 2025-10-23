"use client";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { KlaroConfig, Service } from "klaro/dist/klaro-no-css";
import "../../public/klaro.css";

// import Klaro without CSS

import type klaro from "klaro/dist/klaro-no-css";
import { useEffect, useRef, useState } from "react";


export interface KlaroConsentEvent extends Event {
    detail: {
        accepted: boolean;
    };
}

type ExtendedCookie = {
	name: string;
	description: string;
	lifeTime: string;
	type: string;
	hosts: string;
};

type ServiceEntry = Omit<Service, "cookies"> & {
	hosts: string;
	provider: {
		name: string;
		description: string;
		address: string;
		cookieUrl: string;
		dataPrivacyUrl: string;
	};
	cookies?: ExtendedCookie[];
};
type ProviderEntry = Omit<Service, "cookies"> & {
	hosts: string;
	provider: {
		name: string;
		description: string;
		address: string;
		cookieUrl: string;
		dataPrivacyUrl: string;
	};
};

type CookieInformation = {
	services: ServiceEntry[];
	providers: ProviderEntry[];
};

export const cookieServices: CookieInformation = {
	providers: [],
	services: [
		{
			cookies: [
				// A list of regex expressions or strings giving the names of
				// cookies set by this service. If the user withdraws consent for a
				// given service, Klaro will then automatically delete all matching
				// cookies.

				// you can also explicitly provide a path and a domain for
				// a given cookie. This is necessary if you have services that
				// set cookies for a path that is not "/" or a domain that
				// is not the current domain. If you do not set these values
				// properly, the cookie can't be deleted by Klaro
				// (there is no way to access the path or domain of a cookie in JS)
				// Notice that it is not possible to delete cookies that were set
				// on a third-party domain! See the note at mdn:
				// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#new-cookie_domain
				// [/^_pk_.*$/, '/', 'klaro.kiprotect.com'], //for the production version
				// [/^_pk_.*$/, '/', 'localhost'], //for the local version
				{
					description: "",
					hosts: "",
					lifeTime: "",
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
			callback: (consent, service) => {
				console.log("event google: " + consent)
				if (service && service.name === 'google-maps') {
                // Senden eines benutzerdefinierten Events, das React abfangen kann
					document.dispatchEvent(new CustomEvent('klaro-google-maps-consent', {
						detail: { accepted: consent }
					}));
				}
			},
			purposes: ["functional"],
			title: "Google Maps",
		},
		{
			cookies: [
				{
					description: "",
					hosts: "",
					lifeTime: "",
					name: "external-tracker",
					type: "http",
				},
			],
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
};

export const klaroConfig: KlaroConfig = {
	// Show "accept all" to accept all services instead of "ok" that only accepts
	// required and "default: true" services
	acceptAll: true,

	// You can make the consent notice autofocused by enabling the following option
	autoFocus: true,

	// You can also set a custom expiration time for the Klaro cookie.
	// By default, it will expire after 120 days.
	cookieExpiresAfterDays: 365,

	// You can customize the name of the cookie that Klaro uses for storing
	// user consent decisions. If undefined, Klaro will use 'klaro'.
	cookieName: "klaro",

	// You can change to cookie domain for the consent manager itself.
	// Use this if you want to get consent once for multiple matching domains.
	// If undefined, Klaro will use the current domain.
	//cookieDomain: '.github.com',

	// You can change to cookie path for the consent manager itself.
	// Use this to restrict the cookie visibility to a specific path.
	// If undefined, Klaro will use '/' as cookie path.
	//cookiePath: '/',

	// Defines the default state for services (true=enabled by default).
	default: false,

	// You can customize the ID of the DIV element that Klaro will create
	// when starting up. If undefined, Klaro will use 'klaro'.
	elementID: "klaro",

	// Setting 'embedded' to true will render the Klaro modal and notice without
	// the modal background, allowing you to e.g. embed them into a specific element
	// of your website, such as your privacy notice.
	embedded: false,

	// You can group services by their purpose in the modal. This is advisable
	// if you have a large number of services. Users can then enable or disable
	// entire groups of services instead of having to enable or disable every service.
	groupByPurpose: true,

	// replace "decline" with cookie manager modal
	hideDeclineAll: false,

	// hide "learnMore" link
	hideLearnMore: false,

	// Setting this to true will render the descriptions of the consent
	// modal and consent notice are HTML. Use with care.
	htmlTexts: true,

	// You can also remove the 'Realized with Klaro!' text in the consent modal.
	// Please don't do this! We provide Klaro as a free open source tool.
	// Placing a link to our website helps us spread the word about it,
	// which ultimately enables us to make Klaro! better for everyone.
	// So please be fair and keep the link enabled. Thanks :)
	//disablePoweredBy: true,

	// you can specify an additional class (or classes) that will be added to the Klaro `div`
	//additionalClass: 'my-klaro',

	// You can define the UI language directly here. If undefined, Klaro will
	// use the value given in the global "lang" variable. If that does
	// not exist, it will use the value given in the "lang" attribute of your
	// HTML tag. If that also doesn't exist, it will use 'en'.
	lang: "de",

	// If "mustConsent" is set to true, Klaro will directly display the consent
	// manager modal and not allow the user to close it before having actively
	// consented or declines the use of third-party services.
	mustConsent: true,

	// Setting this to true will keep Klaro from automatically loading itself
	// when the page is being loaded.
	noAutoLoad: false,

	// show cookie notice as modal
	noticeAsModal: false,

	// This is a list of third-party services that Klaro will manage for you.
	services: cookieServices.services.map(
		({ cookies, ...rest }: ServiceEntry) => ({
			cookies: cookies?.map((cookie) => cookie.name),
			...rest,
		}),
	),

	// You can show a description in contextual consent overlays for store
	// being empty. In that case the accept always button is omitted.
	// The description contains a link for opening the consent manager.
	showDescriptionEmptyStore: true,

	// You can show a title in the consent notice by enabling the following option
	showNoticeTitle: true,

	// How Klaro should store the user's preferences. It can be either 'cookie'
	// (the default) or 'localStorage'.
	storageMethod: "cookie",

	// You can override CSS style variables here. For IE11, Klaro will
	// dynamically inject the variables into the CSS. If you still consider
	// supporting IE9-10 (which you probably shouldn't) you need to use Klaro
	// with an external stylesheet as the dynamic replacement won't work there.
	styling: {
		theme: ["light", "top", "wide"],
	},

	// You can overwrite existing translations and add translations for your
	// service descriptions and purposes. See `src/translations/` for a full
	// list of translations that can be overwritten:
	// https://github.com/KIProtect/klaro/tree/master/src/translations

	// Example config that shows how to overwrite translations:
	// https://github.com/KIProtect/klaro/blob/master/src/configs/i18n.js
	translations: {
		// translationsed defined under the 'zz' language code act as default
		// translations.
		// If you erase the "consentModal" translations, Klaro will use the
		// bundled translations.
		de: {
			adsense: {
				description: "Anzeigen von Werbeanzeigen (Beispiel)",
				title: "Google AdSense Werbezeugs",
			},
			camera: {
				description: "Eine Überwachungskamera (nur ein Beispiel zu IMG-Tags)",
			},
			cloudflare: {
				description: "Schutz gegen DDoS-Angriffe",
			},
			consentModal: {
				description:
					'Hier können Sie einsehen und anpassen, welche Information wir über Sie sammeln. Einträge die als "Beispiel" gekennzeichnet sind dienen lediglich zu Demonstrationszwecken und werden nicht wirklich verwendet.',
			},
			externalTracker: {
				description: "Beispiel für ein externes Tracking Skript",
			},
			googleFonts: {
				description: "Web-Schriftarten von Google gehostet",
			},
			inlineTracker: {
				description: "Beispiel für ein Inline-Tracking Skript",
			},
			intercom: {
				description:
					"Chat Widget & Sammeln von Besucherstatistiken (nur ein Beispiel)",
			},
			matomo: {
				description: "Sammeln von Besucherstatistiken",
			},
			mouseflow: {
				description: "Echtzeit-Benutzeranalyse (nur ein Beispiel)",
			},
			privacyPolicyUrl: "/datenschutz",
			purposes: {
				advertising: "Anzeigen von Werbung",
				analytics: "Besucher-Statistiken",
				livechat: "Live Chat",
				security: "Sicherheit",
				styling: "Styling",
			},
		},
	},
	// With the 0.7.0 release we introduce a 'version' paramter that will make
	// it easier for us to keep configuration files backwards-compatible in the future.
	version: 1,
};

export default function CookieManager() {
	const klaroRef = useRef<klaro.Klaro | null>(null);
	const [ready, setReady] = useState(false);
	const [visibleTooltip, setVisibleTooltip] = useState(false);
	useEffect(() => {
		let mounted = true;
		(async () => {
			if (typeof window === "undefined") return;
			try {
				const klaro = await import("klaro/dist/klaro-no-css");
				// setup nur, wenn noch nicht geschehen
				if (!klaroRef.current) {
					if (klaro.setup) {
						klaro.setup(klaroConfig);
					}
					klaroRef.current = klaro;
				}
				if (mounted) setReady(true);
			} catch (err) {
				// Logging für Debug (keine sensiblen Daten)
				console.error("Fehler beim Laden von Klaro:", err);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	// Klick-Handler: falls Klaro noch nicht geladen ist, lade es jetzt und öffne dann Manager
	const openManager = async () => {
		try {
			if (!klaroRef.current) {
				const klaro = await import("klaro/dist/klaro-no-css");
				if (klaro.setup) {
					klaro.setup(klaroConfig);
				}
				klaroRef.current = klaro;
				setReady(true);
				// kleine Verzögerung geben, damit Klaro initialisiert
				setTimeout(() => klaroRef.current?.show(klaroConfig, true), 50);
				return;
			}
			klaroRef.current?.show(klaroConfig, true);
		} catch (err) {
			console.error("Konnte Klaro-Manager nicht öffnen:", err);
		}
	};

	// Tastatur-Unterstützung: Enter/Space öffnet das Overlay
	const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			openManager();
		}
	};

	return (
		<>
			{/* Das Klaro-Element wird benötigt, damit Klaro dort den DOM mounten kann */}
			<div id="klaro" />

			{/* Overlay-Button */}
			<button
				aria-label="Cookie Einstellungen öffnen"
				onBlur={() => setVisibleTooltip(false)}
				onClick={openManager}
				onFocus={() => setVisibleTooltip(true)}
				onKeyDown={onKeyDown}
				onMouseEnter={() => setVisibleTooltip(true)}
				onMouseLeave={() => setVisibleTooltip(false)}
				style={{
					alignItems: "center",
					background: "#0f172a", // neutral dunkel (du kannst Farben ersetzen)
					border: "none",
					borderRadius: "50%",
					bottom: "18px",
					boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
					color: "#ffffff",
					cursor: "pointer",
					display: "inline-flex",
					height: "56px",
					justifyContent: "center",
					position: "fixed",
					right: "18px",
					transition: "transform 150ms ease, background 150ms ease",
					width: "56px",
					zIndex: 99999,
				}}
				title="Cookie Einstellungen"
				type="button"
			>
				{/* Icon — Heroicons */}
				<ShieldCheckIcon
					aria-hidden
					style={{ height: "24px", width: "24px" }}
				/>

				{/* Tooltip / Datenschutz-Text */}
				<span
					aria-hidden={!visibleTooltip}
					role="tooltip"
					style={{
						background: "#111827",
						borderRadius: "8px",
						bottom: "calc(18px + 14px)", // neben dem Button, leicht nach oben versetzt
						boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
						color: "#fff",
						fontSize: "13px",
						opacity: visibleTooltip ? 1 : 0,
						padding: "8px 10px",
						pointerEvents: visibleTooltip ? "auto" : "none",
						position: "absolute",
						right: "76px",
						transform: visibleTooltip
							? "translateX(0) scale(1)"
							: "translateX(6px) scale(0.95)",
						transformOrigin: "right center",
						transition: "opacity 140ms ease, transform 140ms ease",
						whiteSpace: "nowrap",
						zIndex: 100000,
					}}
				>
					Datenschutz & Cookie-Einstellungen
				</span>

				{/* optionaler visueller Lade-Indikator */}
				{!ready && (
					<span
						aria-hidden
						style={{
							bottom: "-6px",
							color: "#cbd5e1",
							fontSize: "10px",
							left: "50%",
							position: "absolute",
							transform: "translateX(-50%)",
						}}
					>
						Läd…
					</span>
				)}
			</button>
		</>
	);
}
