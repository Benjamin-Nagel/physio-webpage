import clsx from "clsx";
import Link from "next/link";
import type { GenericContentProps } from "@/types/types";

export type CTAProps = GenericContentProps & {
	content?: string;
	button: {
		title: string;
		href: string;
	};
	link?: {
		title: string;
		href: string;
	};
};

export function CTA({
	headline,
	style = "light",
	content,
	button,
	link,
	className,
	blockStyles,
	EditorHintComponent,
}: CTAProps) {
	return (
		<section
			className={clsx(
				className,
				blockStyles && "editor-highlight",
				style === "dark" ? "bg-gray-50" : "",
				"py-4",
			)}
			style={blockStyles}
		>
			{EditorHintComponent && <EditorHintComponent />}
			<div className="px-6 py-4 sm:px-6 sm:py-8 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						{headline}
					</h2>
					{content && (
						<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
							{content}
						</p>
					)}
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							href={button.href}
						>
							{button.title}
						</Link>
						{link && (
							<Link
								className="text-sm font-semibold leading-6 text-gray-900"
								href={link.href}
							>
								{link.title} <span aria-hidden="true">→</span>
							</Link>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
