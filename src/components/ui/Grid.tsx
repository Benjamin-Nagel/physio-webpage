import clsx from "clsx";
import type { GenericContentProps, GenericIcon } from "@/types/types";
import { CMSImage, type CMSImageProps } from "./CMSImage";

export type GridElement = {
	title: string;
	icon?: GenericIcon;
	image?: CMSImageProps;
	description: string;
	link?: {
		title: string;
		href: string;
	};
};

export type GridProps = GenericContentProps & {
	elements: GridElement[];
};

export function Grid({ headline, style = "light", elements }: GridProps) {
	return (
		<section className={clsx("py-12", style === "dark" ? "bg-gray-50" : "")}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold mb-8 text-center">{headline}</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{elements.map((element) => (
						<div
							className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition text-center"
							key={element.title}
						>
							{element.image && <CMSImage {...element.image} />}
							{element.icon && (
								<element.icon className="w-10 h-10 text-indigo-600 mb-4" />
							)}
							<h3 className="text-xl font-semibold mb-2">{element.title}</h3>
							<p className="text-gray-600">{element.description}</p>
							{element.link && (
								<div className="mt-2">
									<a
										className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										href={element.link.href}
									>
										{element.link.title}
									</a>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
