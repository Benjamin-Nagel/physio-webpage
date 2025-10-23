import Image from "next/image";
import type { GenericContentProps } from "@/types/types";

type GalleryImage = {
	src: string;
	alt: string;
};

export type GalleryProps = GenericContentProps & {
	images: GalleryImage[];
};

export function ImageGallery({ images }: GalleryProps) {
	return (
		<section className="py-12 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold mb-8 text-center">Unsere Galerie</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{images.map((image) => (
						<div
							className="overflow-hidden rounded-2xl shadow hover:shadow-lg transition"
							key={image.src}
						>
							<Image
								alt={image.alt}
								className="w-full h-48 object-cover transform hover:scale-105 transition"
								src={image.src}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
