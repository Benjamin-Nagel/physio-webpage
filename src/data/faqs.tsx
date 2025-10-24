import type { FaqContent } from "@/types/types";

export const faqs = [
	{
		answer: `<ul>
 	<li>Befund</li>
 	<li>Sportkleidung</li>
 	<li>Handtuch</li>
</ul>`,
		content: `Content`,
		id: 251,
		question: "Was bringe ich mit?",
		seo_description: "seo beschreibung",
		seo_title: "seo titel",
	},
] as const satisfies FaqContent[];
