import clsx from "clsx";
import type { ReactElement } from "react";
import type { GenericContentProps } from "@/types/types";

export type TextProps = GenericContentProps & {
	children: ReactElement | ReactElement[];
};

export function Text({ headline, style = "light", children }: TextProps) {
	return (
		<section className={clsx("py-12", style === "dark" ? "bg-gray-50" : "")}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{headline && (
					<h2 className="text-3xl font-bold mb-8 text-center">{headline}</h2>
				)}
				<div className="">{children}</div>
			</div>
		</section>
	);
}
