import type { ReactElement } from "react";
import type { GenericContentProps, GenericIcon } from "@/types/types";
import Link from "next/link";

type FeatureProps = GenericContentProps & {
	icon?: GenericIcon;
	linkText?: string;
	href?: string;
	children?: ReactElement;
};

export type FeatureListProps = {
	headline: string;
	description?: string;
	children?: ReactElement<FeatureProps> | ReactElement<FeatureProps>[];
};

export function Feature({
	headline,
	icon: FeatureIcon,
	linkText,
	href,
	children,
}: FeatureProps) {
	return (
		<div className="flex flex-col">
			<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
				{FeatureIcon && (
					<FeatureIcon
						aria-hidden="true"
						className="h-5 w-5 flex-none text-indigo-600"
					/>
				)}
				{headline}
			</dt>
			<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
				<div className="flex-auto">{children}</div>
				{href && (
					<p className="mt-6">
						<Link
							className="text-sm font-semibold leading-6 text-indigo-600"
							href={href}
						>
							{linkText} <span aria-hidden="true">→</span>
						</Link>
					</p>
				)}
			</dd>
		</div>
	);
}

export function FeatureList({
	headline,
	description,
	children,
}: FeatureListProps) {
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:text-center">
					<h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						{headline}
					</h2>
					{description && (
						<p className="mt-6 text-lg leading-8 text-gray-600">
							{description}
						</p>
					)}
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
						{children}
					</dl>
				</div>
			</div>
		</div>
	);
}
