import clsx from "clsx";
import React, { type ReactElement, type ReactNode } from "react";
import { type CmsRequestContext, usePageContent } from "@/lib/fetchContent";
import type { PageInformation } from "@/types/types";
import { PageWrapperInformationButton } from "./PageWrapperInformationButton";
import { contentTypeInformationWrapperHelper } from "./PageWrapperInformationHelper";
import { CTA } from "./ui/Cta";
import { Hero, type HeroProps } from "./ui/Hero";
import { Text } from "./ui/Text";

type HeroContentProps = {
	children?: ReactElement<HeroProps>;
};
export const HeroOverrideContent = ({ children }: HeroContentProps) => (
	<>{children}</>
);
type PagePositionContentProps = {
	children?: ReactElement | ReactElement[];
};
export const PageTopContent = ({ children }: PagePositionContentProps) => (
	<>{children}</>
);
export const PageMiddleContent = ({ children }: PagePositionContentProps) => (
	<>{children}</>
);
export const PageBottomContent = ({ children }: PagePositionContentProps) => (
	<>{children}</>
);

// === Wrapper-Props ===
export type PageWrapperProps = {
	context: CmsRequestContext<"my-page">;
	children?:
		| ReactElement<PagePositionContentProps>
		| ReactElement<PagePositionContentProps>[];
};

function getChildrenByArea<P extends { children?: ReactNode }>(
	children: ReactNode,
	element: React.JSXElementConstructor<P>,
): ReactElement<P> | undefined {
	const found = React.Children.toArray(children).find(
		(child): child is ReactElement<P> =>
			React.isValidElement(child) && child.type === element,
	);

	if (!found) return undefined;

	// Jetzt weiß TypeScript: props hat garantiert children
	const hasContent = React.Children.count(found.props.children) > 0;

	return hasContent ? found : undefined;
}

export function PageWrapper({ context, children }: PageWrapperProps) {
	const pageContent: PageInformation = usePageContent<"my-page">(context);
	const allChildren = React.Children.toArray(children);
	const heroOverride = getChildrenByArea(allChildren, HeroOverrideContent);
	const top = getChildrenByArea(allChildren, PageTopContent);
	const middle = getChildrenByArea(allChildren, PageMiddleContent);
	const bottom = getChildrenByArea(allChildren, PageBottomContent);
	const {
		title,
		hero_title,
		hero_image,
		hero_text,
		content_title,
		content,
		cta_text,
		cta_link,
	} = pageContent;

	const pageColor = "#b300b3";
	const heroComponentInformation = contentTypeInformationWrapperHelper({
		color: pageColor,
		wrapperContent: {
			content: "Hero",
			id: context.id,
			type: "page",
		},
	});
	const ctaInformation = contentTypeInformationWrapperHelper({
		color: pageColor,
		wrapperContent: {
			content: "CTA",
			id: context.id,
			type: "page",
		},
	});

	const staticPageContent = "#808080";
	const staticTopInformation = contentTypeInformationWrapperHelper({
		color: staticPageContent,
		wrapperContent: {
			content: "Top",
			id: context.id,
			type: "page",
		},
	});
	const staticMiddleInformation = contentTypeInformationWrapperHelper({
		color: staticPageContent,
		wrapperContent: {
			content: "Middle",
			id: context.id,
			type: "page",
		},
	});
	const staticBottomInformation = contentTypeInformationWrapperHelper({
		color: staticPageContent,
		wrapperContent: {
			content: "Bottom",
			id: context.id,
			type: "page",
		},
	});

	return (
		<>
			{heroOverride
				? heroOverride
				: hero_image && (
						<Hero
							blockStyles={
								heroComponentInformation.development
									? heroComponentInformation.blockStyles
									: undefined
							}
							EditorHintComponent={
								heroComponentInformation.development
									? heroComponentInformation.EditorHintComponent
									: undefined
							}
							headline={hero_title || title}
							image={{ cmsImageId: hero_image }}
							wrapperColor={
								heroComponentInformation.development
									? heroComponentInformation.color
									: undefined
							}
						>
							<p>{hero_text}</p>
						</Hero>
					)}
			{staticTopInformation.EditorHintComponent ? (
				<div
					className={clsx(top === undefined ? "h-16" : "", "editor-highlight")}
					style={staticTopInformation.blockStyles}
				>
					<staticTopInformation.EditorHintComponent />
					{top}
				</div>
			) : (
				[top]
			)}

			{content_title && content && (
				<Text headline={content_title}>
					<div dangerouslySetInnerHTML={{ __html: content }}></div>
				</Text>
			)}
			{staticMiddleInformation.EditorHintComponent ? (
				<div
					className={clsx(
						middle === undefined ? "h-16" : "",
						"editor-highlight",
					)}
					style={staticMiddleInformation.blockStyles}
				>
					<staticMiddleInformation.EditorHintComponent />
					{middle}
				</div>
			) : (
				[middle]
			)}
			{cta_text && cta_link && (
				<CTA
					blockStyles={
						ctaInformation.development ? ctaInformation.blockStyles : undefined
					}
					button={{ href: cta_link, title: "Mehr" }}
					content={cta_text}
					EditorHintComponent={
						ctaInformation.development
							? ctaInformation.EditorHintComponent
							: undefined
					}
					headline="MISSING"
					wrapperColor={
						ctaInformation.development ? ctaInformation.color : undefined
					}
				/>
			)}
			{staticBottomInformation.EditorHintComponent ? (
				<div
					className={clsx(
						bottom === undefined ? "h-16" : "",
						"editor-highlight",
					)}
					style={staticBottomInformation.blockStyles}
				>
					{<staticBottomInformation.EditorHintComponent />}
					{bottom}
				</div>
			) : (
				[bottom]
			)}
			<PageWrapperInformationButton pageId={context.id} />
		</>
	);
}
