import clsx from "clsx";
import Link from "next/link";
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
        <div className="
						grid gap-6 grid-rows-[auto_auto_(600px,1fr)_auto] 
						sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
					">
          {elements.map((element) => (
            <div 
              className={clsx(style === "dark" ? "bg-white" : "bg-gray-50",
								"grid grid-cols-[auto] grid-rows-subgrid row-[span_4] ",
								"p-6  rounded-2xl shadow hover:shadow-lg transition"
							)}
              key={element.title}
            >
              {element.image && (
                <CMSImage
                  containerClassName="col-span-2 col-start-1 row-start-1"
                  rounded={true}
                  {...element.image}
                />
              )}
							<div className="flex items-center justify-center gap-x-1">
								{element.icon && (
									<element.icon className="w-10 h-10 col-start-1 row-start-2 text-indigo-600 mb-4" />
								)}
								<h3
									className={clsx(
										"row-start-2",
										"text-l text-left wrap-break-all font-semibold my-2"
									)}
								>
									{element.title}
								</h3>
							</div>
              <p className="text-gray-600 col-span-2 col-start-1 row-start-3">
                {element.description}
              </p>
              {element.link && (
                <div className="mt-2 col-span-2 col-start-1 row-start-4">
                  <Link
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    href={element.link.href}
                  >
                    {element.link.title}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
