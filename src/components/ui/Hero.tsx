import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import type { GenericContentProps } from "@/types/types";
import { CMSImage, type CMSImageProps } from "./CMSImage";

type HeroBase = GenericContentProps & {
	headerLink?: {
		image: { alt: string; url: string };
		text: string;
		link: string;
	};
	image: CMSImageProps;
	button?: { text: string; link: string };
	link?: { text: string; link: string };
};

type HeroWithDescription = HeroBase & {
	description: string;
	children?: never;
};

type HeroWithChildren = HeroBase & {
	children: ReactElement | ReactElement[];
	description?: never;
};

export type HeroProps = HeroWithDescription | HeroWithChildren;

export function Hero({
	headline,
	style = "light",
	headerLink,
	image,
	button,
	link,
	description,
	children,
	className,
	blockStyles,
	EditorHintComponent,
}: HeroProps) {
	return (
		<section
			className={clsx(
				className,
				blockStyles && "editor-highlight",
				style === "dark" ? "bg-gray-50" : "",
				"relative py-16",
			)}
			style={blockStyles}
		>
			{EditorHintComponent && <EditorHintComponent />}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:gap-12">
				{/* Textbereich */}
				<div className="lg:flex-1">
					{headerLink && (
						<div className="flex items-center gap-3 mb-4">
							<Image
								alt={headerLink.image.alt}
								className="h-10 w-auto rounded"
								src={headerLink.image.url}
							/>
							<Link
								className="text-sm font-semibold text-indigo-600 hover:underline"
								href={headerLink.link}
							>
								{headerLink.text}
							</Link>
						</div>
					)}

					<h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
						{headline}
					</h1>

					<div className="mt-4 text-gray-600 text-lg space-y-2">
						{description ?? children}
					</div>

					<div className="mt-6 flex flex-wrap gap-4">
						{button && (
							<a
								className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-500"
								href={button.link}
							>
								{button.text}
							</a>
						)}
						{link && (
							<a
								className="text-indigo-600 font-semibold hover:underline"
								href={link.link}
							>
								{link.text}
							</a>
						)}
					</div>
				</div>

				{/* Bildbereich */}
				<div className="mt-8 lg:mt-0 lg:flex-1 lg:flex lg:justify-center">
					<div className="relative w-full max-w-[300px] rounded-2xl overflow-hidden shadow-lg">
						<CMSImage {...image} fetchPriority="high" maxWidth={300} />
					</div>
				</div>
			</div>
		</section>
	);
}
