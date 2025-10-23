import type { ReactElement } from "react";
import type { GenericContentProps } from "@/types/types";

type TeamMemberProps = {
	name: string;
	image: {
		url: string;
	};
	role: string;
	bio: string;
};

export type TeamListProps = GenericContentProps & {
	description: string;
	children: ReactElement<TeamMemberProps> | ReactElement<TeamMemberProps>[];
};

export function TeamMember({ name, image, role, bio }: TeamMemberProps) {
	return (
		<li className="flex flex-col gap-10 pt-12 sm:flex-row">
			<img
				alt={name}
				className="aspect-4/5 w-52 flex-none rounded-2xl object-cover"
				src={image.url}
			/>
			<div className="max-w-xl flex-auto">
				<h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
					{name}
				</h3>
				<p className="text-base leading-7 text-gray-600">{role}</p>
				<p className="mt-6 text-base leading-7 text-gray-600">{bio}</p>
			</div>
		</li>
	);
}

export function TeamList({ headline, description, children }: TeamListProps) {
	return (
		<div className="bg-white py-24 md:py-32">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-5">
				<div className="max-w-2xl xl:col-span-2">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						{headline}
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
				</div>
				<ul className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3">
					{children}
				</ul>
			</div>
		</div>
	);
}
