"use client";

import {
	AdjustmentsHorizontalIcon,
	Bars3BottomLeftIcon,
	BookmarkIcon,
	DocumentTextIcon,
	ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useEditorMode } from "@/hooks/useEditorMode";
import { getNodeEnv } from "@/lib/environment";

const EDITOR_MODE_KEY = "nextjs_editor_mode";

const isDevelopment = getNodeEnv() === "development";

export type ContentTypeInformationWrapperProps = {
	type: "page" | "static" | "element";
	id: number;
	content: string;

	overrideContent?: string;
};

export function ContentTypeInformationWrapper({
	type,
	id,
	content,
	overrideContent,
}: ContentTypeInformationWrapperProps) {
	const isEditorMode = useEditorMode();
	return (
		isDevelopment &&
		isEditorMode && (
			<div
				aria-label="Seiteninformationen öffnen"
				className="
        group
        border-2 border-dashed border-red-600

        bg-white text-black 
        cursor-pointer 
        
        inline-flex items-center justify-center 
        
        absolute left-1 top-1 z-40 
        p-0 h-14 w-14 
        rounded-full
        transition-all duration-300 ease-in-out
        
        focus-within:w-60 focus-within:rounded-2xl
        hover:w-60 hover:rounded-2xl
        hover:shadow-lg focus-within:shadow-lg
      "
				title="Seiteninformationen"
			>
				<a
					href={`http://localhost:8080/wp-admin/post.php?post=${id}&action=edit`}
					target="_blank"
				>
					{type === "page" && (
						<BookmarkIcon
							aria-hidden
							className="h-5 w-5 shrink-0 transition-all duration-300"
						/>
					)}
					{type === "element" && (
						<DocumentTextIcon
							aria-hidden
							className="h-5 w-5 shrink-0 transition-all duration-300"
						/>
					)}
					{type === "static" && (
						<Bars3BottomLeftIcon
							aria-hidden
							className="h-5 w-5 shrink-0 transition-all duration-300"
						/>
					)}
				</a>

				<div
					className="
          opacity-0
          max-w-0 overflow-hidden
          transition-all duration-300 ease-in-out
          group-hover:opacity-100 group-hover:max-w-xs
          group-focus-within:opacity-100 group-focus-within:max-w-xs
					pl-2
          whitespace-nowrap
      "
				>
					{type}: {id}
					<br />
					{overrideContent ? overrideContent : content}
				</div>
			</div>
		)
	);
}

export function PageWrapperInformationButton({
	pageId,
	contentId,
}: {
	pageId: number;
	contentId?: number;
}) {
	const [, setIsEditorMode] = useState<boolean>(false);

	useEffect(() => {
		if (isDevelopment) {
			const savedMode = localStorage.getItem(EDITOR_MODE_KEY);
			const initialMode = savedMode === "true";
			setIsEditorMode(initialMode);
			// Setze die CSS-Variable direkt auf dem Body/HTML-Tag
			document.body.setAttribute(
				"data-editor-mode",
				initialMode ? "true" : "false",
			);
		}
	}, []);

	function toggleEditorMode() {
		if (isDevelopment) {
			setIsEditorMode((prev) => {
				const newMode = !prev;
				localStorage.setItem(EDITOR_MODE_KEY, String(newMode));
				// Aktualisiere die CSS-Variable sofort
				document.body.setAttribute(
					"data-editor-mode",
					newMode ? "true" : "false",
				);
				return newMode;
			});
		}
	}

	return (
		isDevelopment && (
			<div className="fixed bottom-20 right-[18px] z-50 group">
				<div className="relative flex flex-col items-center">
					<button
						className="h-14 w-14 bg-[#111827] text-white rounded-full flex justify-center items-center cursor-pointer shadow-lg 
													 transition-all duration-300 ease-out group-hover:rotate-90 group-hover:shadow-[0_0_15px_3px_rgba(39,68,129,0.6)]"
						onClick={toggleEditorMode}
						onKeyDown={(e) => {
							e.preventDefault();
							toggleEditorMode();
						}}
						type="button"
					>
						<AdjustmentsHorizontalIcon
							aria-hidden
							className="h-5 w-5 shrink-0"
						/>
					</button>

					<div className="absolute -top-40 h-40 w-full pointer-events-none"></div>

					<div
						className="absolute bottom-16 flex flex-col items-center gap-4
													 opacity-0 translate-y-4 scale-90
													 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
													 transition-all duration-300 ease-out"
					>
						<a
							className="h-12 w-12 bg-[#274481] text-white rounded-full flex justify-center items-center cursor-pointer shadow-md hover:bg-[#3155a6] 
														 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_12px_3px_rgba(39,68,129,0.4)]"
							href={`http://localhost:8080/wp-admin/post.php?post=${pageId}&action=edit`}
							target="_blank"
						>
							<BookmarkIcon aria-hidden className="h-5 w-5" />
						</a>

						<a
							className={clsx(
								contentId
									? "bg-[#274481] hover:bg-[#3155a6] cursor-pointer "
									: "bg-gray-600 hover:bg-gray-400 cursor-not-allowed",
								"h-12 w-12 text-white rounded-full flex justify-center items-center shadow-md",
								"transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_12px_3px_rgba(39,68,129,0.4)]",
							)}
							href={
								contentId
									? `http://localhost:8080/wp-admin/post.php?post=${contentId}&action=edit`
									: undefined
							}
							target="_blank"
						>
							<DocumentTextIcon aria-hidden className="h-5 w-5" />
						</a>
					</div>
				</div>
			</div>

			// <button
			// 	aria-label="Cookie Einstellungen öffnen"
			// 	onBlur={() => setVisibleTooltip(false)}
			// 	onClick={toggleEditorMode}
			// 	onFocus={() => setVisibleTooltip(true)}
			// 	onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
			// 		if (e.key === "Enter" || e.key === " ") {
			// 			e.preventDefault();
			// 			toggleEditorMode();
			// 		}
			// 	}}
			// 	onMouseEnter={() => setVisibleTooltip(true)}
			// 	onMouseLeave={() => setVisibleTooltip(false)}
			// 	style={{
			// 		alignItems: "center",
			// 		background: "#0f172a", // neutral dunkel (du kannst Farben ersetzen)
			// 		border: "none",
			// 		borderRadius: "50%",
			// 		bottom: "80px",
			// 		boxShadow: "0 6px 18px rgba(44,63,110, 0.8)",
			// 		color: "#ffffff",
			// 		cursor: "pointer",
			// 		display: "inline-flex",
			// 		height: "56px",
			// 		justifyContent: "center",
			// 		position: "fixed",
			// 		right: "18px",
			// 		transition: "transform 150ms ease, background 150ms ease",
			// 		width: "56px",
			// 		zIndex: 99999,
			// 	}}
			// 	title="Cookie Einstellungen"
			// 	type="button"
			// >
			// 	{/* Icon — Heroicons */}
			// 	<AdjustmentsHorizontalIcon
			// 		aria-hidden
			// 		style={{ height: "24px", width: "24px" }}
			// 	/>

			// 	{/* Tooltip / Datenschutz-Text */}
			// 	<span
			// 		aria-hidden={!visibleTooltip}
			// 		role="tooltip"
			// 		style={{
			// 			background: "#111827",
			// 			borderRadius: "8px",
			// 			bottom: "calc(18px + 14px)", // neben dem Button, leicht nach oben versetzt
			// 			boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
			// 			color: "#fff",
			// 			fontSize: "13px",
			// 			opacity: visibleTooltip ? 1 : 0,
			// 			padding: "8px 10px",
			// 			pointerEvents: visibleTooltip ? "auto" : "none",
			// 			position: "absolute",
			// 			right: "76px",
			// 			transform: visibleTooltip
			// 				? "translateX(0) scale(1)"
			// 				: "translateX(6px) scale(0.95)",
			// 			transformOrigin: "right center",
			// 			transition: "opacity 140ms ease, transform 140ms ease",
			// 			whiteSpace: "nowrap",
			// 			zIndex: 100000,
			// 		}}
			// 	>
			// 		Seiten-Informationen
			// 	</span>
			// </button>
		)
	);
}
