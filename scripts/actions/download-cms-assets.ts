import fs from "node:fs";
import path from "node:path";

const CMS_URL =
	process.env.WORDPRESS_API_URL || "http://localhost:8080/wp-json/wp/v2";
const OUTPUT_DIR = path.join(process.cwd(), "public", "cms-images");
const DATA_DIR = path.join(process.cwd(), "src", "data");

interface WPMediaSize {
	file: string;
	width: number;
	height: number;
	mime_type: string;
	source_url: string;
}

interface WPMediaItem {
	id: number;
	slug: string;
	media_type: string;
	source_url: string;
	alt_text: string;
	title: {
		rendered: string;
	};

	description: {
		rendered: string;
	};
	media_details: {
		file: string;

		sizes?: Record<string, WPMediaSize>;
	};
}

type WPFComplaint = {
	id: number;
	slug: string;
	acf: {
		name: string;
		slug: string;
		short_description: string;
		description: string;
		image: number;
		faqs: {
			question: string;
			answer: string;
		}[];
		icon: string;
		treatments: {
			treatment: number[] | "";
		};
		cta_text: string;
		cta_link: string;
		seo_title: string;
		seo_description: string;
	};
};

type WPFTreatment = {
	id: number;
	slug: string;
	acf: {
		name: string;
		slug: string;
		short_description: string;
		description: string;
		image: number;
		icon: string;
		complaints: {
			complaint: number[] | "";
		};
		cta_text: string;
		cta_link: string;
		seo_title: string;
		seo_description: string;
	};
};

type WPFPage = {
	id: number;
	slug: string;
	acf: {
		title: string;
		hero_title: string;
		hero_text: string;
		hero_image?: number;
		content: string;
		cta_text: string;
		cta_link: string;
		seo_title: string;
		seo_description: string;
	};
};

type WPFFaq = {
	id: number;
	slug: string;
	acf: {
		question: string;
		answer: string;
		content: string;
		seo_title: string;
		seo_description: string;
	};
};

type WPFTeam = {
	id: number;
	slug: string;
	acf: {
		name: string;
		position: string;
		image: number;
		qualifikationen: string;
		bio: string;
	};
};

function parseIcon(icon: string) {
	return icon.replace(/([a-zA-Z-]+)=/g, (match, p1) => {
		if (p1.startsWith("aria-") || p1.startsWith("data-")) return match;

		const camelCased = p1.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
		return `${camelCased}=`;
	});
}

async function ensureDir(dir: string) {
	await fs.promises.mkdir(dir, { recursive: true });
}

/** Lädt eine Datei herunter und speichert sie lokal */
async function downloadFile(url: string, outputPath: string) {
	const res = await fetch(url);
	if (!res.ok) {
		console.warn(`⚠️  Fehler beim Laden: ${url}`);
		return;
	}

	const buffer = Buffer.from(await res.arrayBuffer());
	await fs.promises.writeFile(outputPath, buffer);
	console.log(`✅ ${path.basename(outputPath)}`);
}

/** Lädt alle Medien aus WordPress */
async function fetchAllContent<T>(
	type: "media" | "treatments" | "complaints" | "my-page" | "faq" | "team",
): Promise<T[]> {
	let page = 1;
	const perPage = 100;
	const all: T[] = [];

	console.log("📡 Lade Medien aus WordPress ...");

	let remoteTotalPages = 1;

	while (page <= remoteTotalPages) {
		const res = await fetch(
			`${CMS_URL}/${type}?per_page=${perPage}&page=${page}`,
		);
		if (!res.ok)
			throw new Error(`Fehler beim Abrufen der Medien (Seite ${page})`);

		remoteTotalPages = parseInt(res.headers.get("x-wp-totalpages") || "1", 10);

		const items: T[] = await res.json();
		if (items.length === 0) break;

		all.push(...items);
		console.log(`📄 Seite ${page}: ${items.length} Medien geladen`);
		page++;
	}

	console.log(`📦 Insgesamt ${all.length} Medien gefunden`);
	return all;
}

const fetchAllMedia = () => fetchAllContent<WPMediaItem>("media");
const fetchAllComplaints = () => fetchAllContent<WPFComplaint>("complaints");
const fetchAllTreatments = () => fetchAllContent<WPFTreatment>("treatments");
const fetchAllPages = () => fetchAllContent<WPFPage>("my-page");
const fetchAllFaq = () => fetchAllContent<WPFFaq>("faq");
const fetchAllTeam = () => fetchAllContent<WPFTeam>("team");

async function downloadImages() {
	await ensureDir(OUTPUT_DIR);

	const mediaItems = await fetchAllMedia();

	for (const item of mediaItems) {
		if (item.media_type !== "image") continue;

		const baseDir = path.join(OUTPUT_DIR, String(item.slug));
		await ensureDir(baseDir);

		// Originalbild
		const originalFile = path.join(
			baseDir,
			path.basename(item.media_details.file),
		);
		await downloadFile(item.source_url, originalFile);

		// Zusätzliche Größen
		const sizes = item.media_details.sizes ?? {};
		for (const [, size] of Object.entries(sizes)) {
			const localFile = path.join(baseDir, `${size.file}`);
			await downloadFile(size.source_url, localFile);
		}
	}
	const mediaMetadataText = `
import type { WordPressAttachment } from "@/lib/fetchContent";

export const mediaMetadata = [
    ${mediaItems.map((mediaItem) => JSON.stringify(mediaItem)).join(",")}   
] as const satisfies WordPressAttachment[]; `;
	writeDataFile(mediaMetadataText, "mediaMetadata.tsx");

	console.log("🎉 Alle WordPress-Bilder wurden erfolgreich heruntergeladen!");
}

async function writeDataFile(content: string, file: string) {
	await ensureDir(DATA_DIR);
	fs.writeFile(path.join(DATA_DIR, file), content, (err) => {
		if (err) {
			console.error(err);
		} else {
			// file written successfully
		}
	});
}

function loadComplaints(
	complaints: WPFComplaint[],
	treatments: WPFTreatment[],
) {
	const complaintsText = `
import type { Complaint } from "@/types/types";

export const complaints = [
    ${complaints
			.map((complaint) => {
				const acf = complaint.acf;
				return `{
          id: ${complaint.id},
          slug: "${acf.slug}",
          image: ${acf.image},
          name: "${acf.name}",
          short_description: "${acf.short_description}",
          description: \`
            ${acf.description}
          \`,
          icon: (${parseIcon(acf.icon)}),
          treatments: [
            ${
							acf.treatments !== undefined &&
							acf.treatments.treatment !== undefined &&
							acf.treatments.treatment !== ""
								? acf.treatments.treatment
										.map((entry) => {
											return treatments
												.filter((treatment) => treatment.id === entry)
												.map((entry) => {
													return `"${entry.acf.slug}"`;
												});
										})
										.join(", ")
								: ""
						}
          ]

      }`;
			})
			.join(",")}   
] as const satisfies Complaint[]; `;
	writeDataFile(complaintsText, "complaints.tsx");
}

function loadTreatments(
	treatments: WPFTreatment[],
	complaints: WPFComplaint[],
) {
	const treatmentsText = `
import type { Treatment } from "@/types/types";

export const treatments = [
    ${treatments
			.map((treatment) => {
				const acf = treatment.acf;
				return `{
          id: ${treatment.id},
          slug: "${acf.slug}",
          image: ${acf.image},
          name: "${acf.name}",
          short_description: "${acf.short_description}",
          description: \`
            ${acf.description}
          \`,
          icon: (${parseIcon(acf.icon)}),
          complaints: [
            ${
							acf.complaints !== undefined &&
							acf.complaints.complaint !== undefined &&
							acf.complaints.complaint !== ""
								? acf.complaints.complaint
										.map((entry) => {
											return complaints
												.filter((complaint) => complaint.id === entry)
												.map((entry) => {
													return `"${entry.acf.slug}"`;
												});
										})
										.join(", ")
								: ""
						}
          ]

      }`;
			})
			.join(",")}   
] as const satisfies Treatment[]; `;
	writeDataFile(treatmentsText, "treatments.tsx");
}

async function downloadFaqContent() {
	const faqs = await fetchAllFaq();

	const faqsText = `
import type { FaqContent } from "@/types/types";

export const faqs = [
    ${faqs
			.map((faq) => {
				const acf = faq.acf;
				return `{
					id: ${faq.id},
					question: "${acf.question}",
					answer: \`${acf.answer}\`,
					content: \`${acf.content}\`,
					seo_title: "${acf.seo_title}",
					seo_description: "${acf.seo_description}"
				}`;
			})
			.join(",")}   
] as const satisfies FaqContent[]; `;
	writeDataFile(faqsText, "faqs.tsx");
}

async function downloadTeamContent() {
	const teamMembers = await fetchAllTeam();

	const teamText = `
import type { TeamMember } from "@/types/types";

export const teamMembers = [
    ${teamMembers
			.map((teamMember) => {
				const acf = teamMember.acf;
				return `{
					id: ${teamMember.id},
					name: "${acf.name}",
					image: ${acf.image},
					position: "${acf.position}",
					qualifikationen: "${acf.qualifikationen}",
					bio: "${acf.bio}"
				}`;
			})
			.join(",")}   
] as const satisfies TeamMember[]; `;
	writeDataFile(teamText, "teamMembers.tsx");
}

async function downloadPageContent() {
	const pageContents = await fetchAllPages();

	const pageContentsText = `
import type { PageInformation } from "@/types/types";

export const pageContents = [
    ${pageContents
			.map((pageContent) => {
				const acf = pageContent.acf;
				return `{
					id: ${pageContent.id},
					name: "",
					slug: "",
					title: "${acf.title}",
					hero_title: "${acf.hero_title}",
					hero_text: \`${acf.hero_text}\`,
          ${acf.hero_image ? `hero_image: ${acf.hero_image},` : ""}
					content: \`${acf.content}\`,
					cta_text: "${acf.cta_text}",
					cta_link: "${acf.cta_link}",
					seo_title: "${acf.seo_title}",
					seo_description: "${acf.seo_description}"
				}`;
			})
			.join(",")}   
] as const satisfies PageInformation[]; `;
	writeDataFile(pageContentsText, "pages.tsx");
}

/** Hauptlogik */
async function downloadCmsContent() {
	async function loadBasicData() {
		await downloadImages();
		const [treatments, complaints] = await Promise.all([
			fetchAllTreatments(),
			fetchAllComplaints(),
		]);
		loadComplaints(complaints, treatments);
		loadTreatments(treatments, complaints);
	}

	// const githubWorkflowBuild: boolean = getGitHubWorkflowBuild()
	const githubWorkflowBuild: boolean = true;

	await Promise.all(
		[loadBasicData()].concat(
			githubWorkflowBuild
				? [downloadPageContent(), downloadFaqContent(), downloadTeamContent()]
				: [],
		),
	);
}

downloadCmsContent().catch((err) => {
	console.error("❌ error by pulling the cms data:", err);
	process.exit(1);
});
