import path from "node:path";
import { use } from "react";
import { getWordpressApiUrl } from "./environment";

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
	"version-history": VersionHistory[];
	"predecessor-version": PredecessorVersion[];
	"wp:attachment": WpAttachment[];
	curies: Cury[];
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
	caption: {
		rendered: string;
	};
	alt_text: string;
	media_type: string;
	mime_type: string;
	media_details: MediaDetails;
	post: number;
	source_url: string;
	_links: Links;
}
export interface MediumContent {
	file: string;
	width: number;
	height: number;
	filesize: number;
}
export type MediaDetails = MediumContent & {
	sizes: Sizes;
	image_meta: ImageMeta;
	original_image: string;
};
export interface Sizes {
	medium: Medium;
	thumbnail: Medium;
	medium_large: Medium;
	full: Medium;
}
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

const wordPressUrl = getWordpressApiUrl();

export type ContextPath = {
	type: "my-page" | "treatments" | "complaints" | "team" | "faq";
	id: number;
};

export async function fetchPageContentByFile<T>({
	type,
	id,
}: ContextPath): Promise<WordPressAcfContent<T>> {
	const url = `${wordPressUrl}/${type}/${id}`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Fehler beim Laden von Content für ${type}?id=${id}`);
	}
	const data = (await res.json()) as WordPressAcfContent<T>;
	if (!data) {
		throw new Error(`Kein Content für ${type}?id=${id} gefunden`);
	}
	return data;
}
export function usePageContent<T>(context: ContextPath) {
	return use(fetchPageContentByFile<T>(context));
}

export async function getWordPressMediaById(
	id: number,
): Promise<WordPressAttachment> {
	const res = await fetch(`${wordPressUrl}/media/${id}`);
	if (!res.ok) {
		throw new Error(`Fehler beim Laden von Media für ${id}`);
	}
	const data = (await res.json()) as WordPressAttachment;
	if (!data) {
		throw new Error(`Keine Media für ${id} gefunden`);
	}
	return data;
}
