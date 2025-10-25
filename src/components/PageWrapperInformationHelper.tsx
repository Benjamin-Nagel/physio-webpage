import dynamic from "next/dynamic";
import type { JSX } from "react";
import type { ContentTypeInformationWrapperProps } from "@/components/PageWrapperInformationButton";
import { getNodeEnv } from "@/lib/environment";

const isDevelopment = getNodeEnv() === "development";

export type ContentInformationType = {
	wrapperColor?: string;
	blockStyles?: React.CSSProperties;
	editorHintComponent?: JSX.Element | undefined;
};

export type ContentTypeInformationParts = {
	color: string;
	editorHintComponent: JSX.Element | undefined;
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

	let EditorHint: JSX.Element | undefined;
	if (isDevelopment) {
		const ContentTypeInformationWrapper = dynamic(() =>
			import("@/components/PageWrapperInformationButton").then(
				(component) => component.ContentTypeInformationWrapper,
			),
		);

		EditorHint = <ContentTypeInformationWrapper {...wrapperContent} />;
	}
	const blockStyles = {
		"--editor-border-color": editorOverlayColor,
	} as React.CSSProperties;
	return {
		blockStyles,
		color,
		development: isDevelopment,
		editorHintComponent: EditorHint,
	};
}
