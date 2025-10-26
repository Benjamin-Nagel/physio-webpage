import dynamic from "next/dynamic";
import React from "react";
import type { ContentTypeInformationWrapperProps } from "@/components/PageWrapperInformationButton";
import { getNodeEnv } from "@/lib/environment";

const isDevelopment = getNodeEnv() === "development";

type PreFilledContentTypeInformationProps = Omit<
	ContentTypeInformationWrapperProps,
	"type" | "id" | "content"
>;
export type ContentTypeInformationParts = {
	color: string;
	EditorHintComponent:
		| React.ComponentType<PreFilledContentTypeInformationProps>
		| undefined;
	blockStyles: React.CSSProperties;
	development: boolean;
};

export function contentTypeInformationWrapperHelper({
	color,
	wrapperContent,
}: {
	color: string;
	wrapperContent: ContentTypeInformationWrapperProps;
}): ContentTypeInformationParts {
	const editorOverlayColor = color;

	let EditorHint:
		| React.ComponentType<PreFilledContentTypeInformationProps>
		| undefined;
	if (isDevelopment) {
		const ContentTypeInformationWrapper = dynamic(() =>
			import("@/components/PageWrapperInformationButton").then(
				(component) => component.ContentTypeInformationWrapper,
			),
		);

		EditorHint = React.memo(function Wrapper(
			overrideProps: PreFilledContentTypeInformationProps,
		) {
			return (
				<ContentTypeInformationWrapper {...overrideProps} {...wrapperContent} />
			);
		});
	}
	const blockStyles = {
		"--editor-border-color": editorOverlayColor,
	} as React.CSSProperties;
	return {
		blockStyles,
		color,
		development: isDevelopment,
		EditorHintComponent: EditorHint,
	};
}
