import React, { type ReactElement } from "react";
import { CmsRequestContext, usePageContent } from "@/lib/fetchContent";
import type { PageInformation } from "@/types/types";
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
		content,
		cta_text,
		cta_link,
	} = pageContent;
	return (
		<>
			{(heroOverride) ? (
				heroOverride
			) : (
				(hero_image) && (
				<Hero headline={hero_title || title} image={{ cmsImageId: hero_image }}>
					<p>{hero_text}</p>
				</Hero>)
			)}
			{top}
			{content && (
				<Text headline="as">
					<div dangerouslySetInnerHTML={{ __html: content }}></div>
				</Text>
			)}
			{middle}
			{cta_text && cta_link && (
				<CTA
					button={{ href: cta_link, title: "b" }}
					content={cta_text}
					headline="a"
				/>
			)}
			{bottom}
		</>
	);
}
