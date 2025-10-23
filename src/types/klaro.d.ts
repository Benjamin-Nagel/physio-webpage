declare module "klaro/dist/klaro-no-css" {
	export interface KlaroConfig {
		version: number;
		elementID: string;
		styling: Styling;
		showDescriptionEmptyStore: boolean;
		noAutoLoad: boolean;
		htmlTexts: boolean;
		embedded: boolean;
		groupByPurpose: boolean;
		autoFocus: boolean;
		showNoticeTitle: boolean;
		storageMethod: string;
		cookieName: string;
		cookieExpiresAfterDays: number;
		cookieDomain?: string;
		cookiePath?: string;
		default: boolean;
		mustConsent: boolean;
		acceptAll: boolean;
		hideDeclineAll: boolean;
		hideLearnMore: boolean;
		noticeAsModal: boolean;
		disablePoweredBy?: boolean;
		additionalClass?: string;
		lang?: string;
		translations: Translations;
		services: Service[];
	}

	export interface Styling {
		theme: string[];
	}

	export interface Translations {
		zz?: Translation;
		[key: string]: Translation;
	}

	export interface Translation {
		privacyPolicyUrl?: string;
		consentModal?: Description;
		inlineTracker?: Description;
		externalTracker?: Description;
		adsense?: Description;
		matomo?: Description;
		camera?: Description;
		cloudflare?: Description;
		intercom?: Description;
		mouseflow?: Description;
		googleFonts?: Description;
		purposes?: Purposes;
	}

	export interface Description {
		description: string;
		title?: string;
	}

	export interface Purposes {
		analytics: string;
		security: string;
		livechat: string;
		advertising: string;
		styling: string;
	}

	export interface Service {
		name: string;
		description?: string;
		default?: boolean;
		contextualConsentOnly?: boolean;
		purposes: string[];
		title?: string;
		cookies?: string[];
		callback?: (constent: boolean, service: Service) => void;
		required?: boolean;
		optOut?: boolean;
		onlyOnce?: boolean;
	}

	export interface ConsentManager {
		getConsent(name: string): boolean;
		resetConsents(): void;
	}

	export interface Klaro {
		setup(config: KlaroConfig): void;
		show(config?: KlaroConfig, modal?: boolean): void;
		getManager(config?: KlaroConfig): ConsentManager;
	}

	const klaro: Klaro;
	export = klaro;
}
