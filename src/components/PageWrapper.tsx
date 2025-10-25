import React, { type ReactElement } from "react";
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

export function PageWrapper({ context, children }: PageWrapperProps) {
	const pageContent: PageInformation = usePageContent<"my-page">(context);
	const heroOverride = React.Children.toArray(children).find(
		(child) => (child as ReactElement).type === HeroOverrideContent,
	);
	const top = React.Children.toArray(children).find(
		(child) => (child as ReactElement).type === PageTopContent,
	);
	const middle = React.Children.toArray(children).find(
		(child) => (child as ReactElement).type === PageMiddleContent,
	);
	const bottom = React.Children.toArray(children).find(
		(child) => (child as ReactElement).type === PageBottomContent,
	);
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
			content: "Keine Ahnung",
			id: context.id,
			type: "Seite",
		},
	});
	const staticPageContent = "#808080";
	const staticTopInformation = contentTypeInformationWrapperHelper({
		color: staticPageContent,
		wrapperContent: {
			content: "Top",
			id: context.id,
			type: "Seite",
		},
	});
	const staticMiddleInformation = contentTypeInformationWrapperHelper({
		color: staticPageContent,
		wrapperContent: {
			content: "Middle",
			id: context.id,
			type: "Seite",
		},
	});
	const staticBottomInformation = contentTypeInformationWrapperHelper({
		color: staticPageContent,
		wrapperContent: {
			content: "Bottom",
			id: context.id,
			type: "Seite",
		},
	});

	return (
		<>
			{heroOverride
				? heroOverride
				: hero_image && (
						<Hero
							blockStyles={heroComponentInformation.blockStyles}
							editorHintComponent={heroComponentInformation.editorHintComponent}
							headline={hero_title || title}
							image={{ cmsImageId: hero_image }}
							wrapperColor={heroComponentInformation.color}
						>
							<p>{hero_text}</p>
						</Hero>
					)}
			{staticTopInformation.editorHintComponent ? (
				<div
					className={"editor-highlight"}
					style={staticTopInformation.blockStyles}
				>
					{top && staticTopInformation.editorHintComponent}
					{top}
				</div>
			) : (
				{ top }
			)}

			{content_title && content && (
				<Text headline={content_title}>
					<div dangerouslySetInnerHTML={{ __html: content }}></div>
				</Text>
			)}
			{staticMiddleInformation.editorHintComponent ? (
				<div
					className={"editor-highlight"}
					style={staticMiddleInformation.blockStyles}
				>
					{middle && staticMiddleInformation.editorHintComponent}
					{middle}
				</div>
			) : (
				{ middle }
			)}
			{cta_text && cta_link && (
				<CTA
					button={{ href: cta_link, title: "Mehr" }}
					content={cta_text}
					headline="MISSING"
				/>
			)}
			{staticBottomInformation.editorHintComponent ? (
				<div
					className={"editor-highlight"}
					style={staticBottomInformation.blockStyles}
				>
					{bottom && staticBottomInformation.editorHintComponent}
					{bottom}
				</div>
			) : (
				{ bottom }
			)}
			<PageWrapperInformationButton />
		</>
	);
}
