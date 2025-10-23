
import type { FaqContent } from "@/types/types";

export const faqs = [
    {
					id: 251,
					question: "Was bringe ich mit?",
					answer: `<ul>
 	<li>Befund</li>
 	<li>Sportkleidung</li>
 	<li>Handtuch</li>
</ul>`,
					content: `Content`,
					seo_title: "seo titel",
					seo_description: "seo beschreibung"
				}   
] as const satisfies FaqContent[]; 