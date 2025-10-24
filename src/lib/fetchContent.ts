import path from "node:path";
import { use } from "react";
import { complaints } from "@/data/complaints";
import { faqs } from "@/data/faqs";
import { mediaMetadata } from "@/data/mediaMetadata";
import { pageContents } from "@/data/pages";
import { teamMembers } from "@/data/teamMembers";
import { treatments } from "@/data/treatments";
import type {
	Complaint,
	FaqContent,
	PageInformation,
	TeamMember,
	Treatment,
} from "@/types/types";
import { getGitHubWorkflowBuild, getWordpressApiUrl } from "./environment";

export type WordPressAcfContent<T> = {
	id: number;
	date: string;
	date_gmt: string;
	modified: string;
	modified_gmt: string;
	slug: string;
	status: string;
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	author: number;
	featured_media: number;
	parent: number;
	menu_order: number;
	comment_status: string;
	ping_status: string;
	template: string;
	format: string;
	acf: T;
	_links: Links;
};

export interface Links {
	self: Self[];
	collection: Collection[];
	about: About[];
	author: Author[];
	replies: Reply[];
	"version-history"?: VersionHistory[];
	"predecessor-version"?: PredecessorVersion[];
	"wp:attachment"?: WpAttachment[];
	curies?: Cury[];
}

export interface Self {
	href: string;
	targetHints: TargetHints;
}

export interface TargetHints {
	allow: string[];
}

export interface Collection {
	href: string;
}

export interface About {
	href: string;
}

export interface Author {
	embeddable: boolean;
	href: string;
}

export interface Reply {
	embeddable: boolean;
	href: string;
}

export interface VersionHistory {
	count: number;
	href: string;
}

export interface PredecessorVersion {
	id: number;
	href: string;
}

export interface WpAttachment {
	href: string;
}

export interface Cury {
	name: string;
	href: string;
	templated: boolean;
}

export interface WordPressAttachment {
	id: number;
	date: string;
	date_gmt: string;
	modified: string;
	modified_gmt: string;
	slug: string;
	status: string;
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	author: number;
	featured_media: number;
	comment_status: string;
	ping_status: string;
	template: string;
	class_list: string[];
	description: {
		rendered: string;
	};
	guid: {
		rendered: string;
	};
	meta: { _acf_changed: boolean };
	acf: [];
	post?: number | null;
	caption: {
		rendered: string;
	};
	alt_text: string;
	media_type: string;
	mime_type: string;
	media_details: MediaDetails;
	source_url: string;
	_links: Links;
}
export interface MediumContent {
	file: string;
	width: number;
	height: number;
	filesize?: number;
}
export type MediaDetails = MediumContent & {
	sizes: Record<string, Medium>;
	image_meta: ImageMeta;
};
export type Medium = MediumContent & {
	mime_type: string;
	source_url: string;
};
export interface ImageMeta {
	aperture: string;
	credit: string;
	camera: string;
	caption: string;
	created_timestamp: string;
	copyright: string;
	focal_length: string;
	iso: string;
	shutter_speed: string;
	title: string;
	orientation: string;
	keywords: string[];
}

export function getPagePathFromFile(filePath: string) {
	const relative = path.relative(path.join(process.cwd(), "app"), filePath);
	const parts = relative.split(path.sep).slice(0, -1); // ["test"]
	const cleaned = parts.join("/");
	const subPath = cleaned.split("/src/app/")[1];
	const mySlug = subPath.replaceAll("/", "-");
	return mySlug;
}

export type CmsContentType =
	| "my-page"
	| "treatments"
	| "complaints"
	| "team"
	| "faq";

type CmsContentKeyTypeMap = {
	[K in CmsContentType]: K extends "my-page"
		? PageInformation
		: K extends "complaints"
			? Complaint
			: K extends "faq"
				? FaqContent
				: K extends "team"
					? TeamMember
					: K extends "treatments"
						? Treatment
						: never;
};

const cmsContentTypeMapper: {
	[K in CmsContentType]: CmsContentKeyTypeMap[K][];
} = {
	complaints: complaints,
	faq: faqs,
	"my-page": pageContents,
	team: teamMembers,
	treatments: treatments,
};

export type ContentTypeList = CmsContentKeyTypeMap[keyof CmsContentKeyTypeMap];

const wordPressUrl = getWordpressApiUrl();

// async function getFallbackData<T extends ContentTypeList>({
// 	type,
// 	id,
// }: ContextPath): Promise<T> {
// 	const data = cmsContentTypeMapper[type]
// 	return data.filter(entry => entry.id === id)[0]
// }

export type CmsRequestContext<K extends CmsContentType> = {
	type: K;
	id: number;
};

export async function getFallbackData<K extends CmsContentType>({
	type,
	id,
}: CmsRequestContext<K>): Promise<CmsContentKeyTypeMap[K] | undefined> {
	const data = cmsContentTypeMapper[type] as CmsContentKeyTypeMap[K][]; // safe: mapping ist typsicher definiert
	return data.find((entry) => entry.id === id);
}

export async function fetchPageContentByFile<K extends CmsContentType>({
	type,
	id,
}: CmsRequestContext<K>): Promise<CmsContentKeyTypeMap[K]> {
	let data = await getFallbackData<K>({
		id,
		type,
	});
	if (!getGitHubWorkflowBuild()) {
		const url = `${wordPressUrl}/${type}/${id}`;
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Fehler beim Laden von Content für ${type}?id=${id}`);
		}
		const apiData = (await res.json()) as WordPressAcfContent<
			CmsContentKeyTypeMap[K]
		>;
		if (!apiData) {
			throw new Error(`Kein Content für ${type}?id=${id} gefunden`);
		}
		data = apiData.acf;
	}
	if (!data) {
		throw new Error(`Kein Fallback Content für ${type}?id=${id} gefunden`);
	}
	return data;
}
export function usePageContent<K extends CmsContentType>(
	context: CmsRequestContext<K>,
) {
	return use(fetchPageContentByFile<K>(context));
}

export async function getWordPressMediaById(
	id: number,
): Promise<WordPressAttachment> {
	let data: WordPressAttachment = mediaMetadata.filter(
		(metadata) => metadata.id === id,
	)[0];
	if (!getGitHubWorkflowBuild()) {
		const res = await fetch(`${wordPressUrl}/media/${id}`);
		if (!res.ok) {
			throw new Error(`Fehler beim Laden von Media für ${id}`);
		}
		data = (await res.json()) as WordPressAttachment;
	}
	if (!data) {
		throw new Error(`Keine Media für ${id} gefunden`);
	}
	return data;
}
