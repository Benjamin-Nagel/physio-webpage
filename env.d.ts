namespace NodeJS {
	interface ProcessEnv {
		PAGE_URL: string;
		WORDPRESS_API_URL: string;
		WORKFLOW_BUILD?: boolean;
		NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string;
		NEXT_PUBLIC_CMS_MODE?: string;
	}
}
