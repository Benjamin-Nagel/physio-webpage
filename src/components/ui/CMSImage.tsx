import clsx from "clsx";
import type { ReactElement } from "react";
import { getWordPressMediaById } from "@/lib/fetchContent";
import { getCmsMode, getNodeEnv } from "@/lib/environment";
import Image from "next/image";

const isProd = process.env.NODE_ENV === "production";
const isWorkflowBuild = process.env.WORKFLOW_BUILD || false

let repoName = ""
if (isProd && isWorkflowBuild) {
	const pageUrlParts = process.env.PAGE_URL?.split("/")
	repoName = pageUrlParts[pageUrlParts.length - 1]
}

const isStatic =
	getNodeEnv() === "production" &&
	getCmsMode() === "static";

export type CMSImageProps = {
	/** Die WordPress-Media-ID */
	cmsImageId: number;

	/** Tailwind Klassen oder eigene Styles */
	className?: string;

	/** Optional: alternative Bildbeschreibung */
	alt?: string;

	/** CSS-Kontrolle: Rundungen */
	rounded?: boolean;

	/** CSS-Kontrolle: Schatten */
	shadow?: boolean;

	/** Optional: Lazy Loading deaktivieren */
	eager?: boolean;

	/** Optional: Fetch Priority */
	fetchPriority?: "high" | "low" | "auto";

	maxWidth?: number;

	/** Optional: explizite Größe für sizes-Attribut */
	sizes?: string;
};

/**
 * CMSImage – rendert ein WordPress-Bild responsiv mit Tailwind-Styling.
 * Unterstützt srcset und optionales Picture für verschiedene Formate.
 */
export async function CMSImage({
	cmsImageId,
	className,
	alt,
	rounded = false,
	shadow = false,
	eager = false,
	fetchPriority,
	maxWidth,
	sizes = `(max-width: 1024px) 100vw, 1024px`,
}: CMSImageProps): Promise<ReactElement | null> {
	const cmsAttachment = await getWordPressMediaById(cmsImageId);

	if (!cmsAttachment?.media_details?.sizes) {
		return null;
	}

	const sizesData = cmsAttachment.media_details.sizes;

	// Sammle verfügbare Varianten
	const allSizes = Object.values(sizesData);

	const upperLimit = maxWidth ?? 1024;

	// Filtere nur die Größen, die <= MAX_WIDTH sind, sortiert absteigend
	const images = allSizes
		.filter((img) => img.width <= upperLimit)
		.sort((a, b) => b.width - a.width);

	if (!images.length) {
		images.push(allSizes[allSizes.length - 1]);
	}

	const sizesAttr =
		sizes ?? `(max-width: ${upperLimit}px) 100vw, ${upperLimit}px`;

	// Generiere srcset
	const srcSet = images
		.map((img) => {
			let myUrl = img.source_url;
			if (isStatic) {
				myUrl = `/cms-images/${cmsAttachment.slug}/${img.file}`;
			}
			return `${myUrl} ${img.width}w`;
		})
		.join(", ");

	// Wähle das größte Bild als Fallback
	const fallbackImage = images[0];

	let fallbackImageUrl = fallbackImage.source_url;
	if (isStatic) {
		fallbackImageUrl = ((isProd && isWorkflowBuild)?`/${repoName}` : '') + `/cms-images/${cmsAttachment.slug}/${fallbackImage.file}`;
	}

	const altText = alt || cmsAttachment.alt_text || cmsAttachment.title.rendered;

	const imgClass = clsx(className, "object-cover transition duration-300", {
		"rounded-lg": rounded,
		"shadow-md": shadow,
	});

	if (fetchPriority === "high") {
		eager = true;
	}

	return (
		<picture>
			<img
				alt={altText || ""}
				className={imgClass}
				height={fallbackImage.height}
				loading={eager ? "eager" : "lazy"}
				sizes={sizesAttr}
				src={fallbackImageUrl}
				srcSet={srcSet}
				width={fallbackImage.width}
				{...(fetchPriority ? { fetchPriority } : {})}
			/>
		</picture>
	);
}
