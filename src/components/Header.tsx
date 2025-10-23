"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { webpageData } from "@/data/general-page-data";
import { navigation } from "@/data/navigation";

const getFlyoutLayoutClasses = (count: number): string => {
	if (count < 6) return "flex flex-col divide-y divide-gray-100";

	const cols = Math.min(Math.ceil(count / 6), 6);
	const gridCols = {
		1: "grid-cols-1",
		2: "grid-cols-2",
		3: "grid-cols-3",
		4: "grid-cols-4",
		5: "grid-cols-5",
		6: "grid-cols-6",
	}[cols];

	return `grid ${gridCols} gap-2 px-3 py-2`;
};

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	// Map von Dropdown-Refs
	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

	// Outside Click für alle Dropdowns
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node | null;
			if (!target) return;

			const clickedInsideAny = Object.values(dropdownRefs.current).some((el) =>
				el?.contains(target),
			);

			if (!clickedInsideAny) setOpenDropdown(null);
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
			<nav
				aria-label="Hauptnavigation"
				className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
			>
				<Link
					className="flex items-center gap-2 font-semibold text-lg"
					href="/"
				>
					<Image
						alt={`${webpageData.name} Logo`}
						className="h-8 w-auto"
						height={32}
						src="/logo.jpg"
						width={70}
					/>
				</Link>

				<button
					aria-controls="mobile-menu"
					aria-expanded={mobileOpen}
					className="sm:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					onClick={() => setMobileOpen(!mobileOpen)}
					type="button"
				>
					<span className="sr-only">Menü öffnen</span>
					{mobileOpen ? (
						<XMarkIcon aria-hidden="true" className="h-6 w-6" />
					) : (
						<Bars3Icon aria-hidden="true" className="h-6 w-6" />
					)}
				</button>

				<ul className="hidden sm:flex sm:items-center sm:gap-8">
					{navigation.map((item) => (
						<li className="relative" key={item.name}>
							{item.children ? (
								<div
									ref={(el) => {
										dropdownRefs.current[item.name] = el;
									}}
								>
									<button
										aria-expanded={openDropdown === item.name}
										aria-haspopup="true"
										className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
										onClick={() =>
											setOpenDropdown(
												openDropdown === item.name ? null : item.name,
											)
										}
										type="button"
									>
										{item.name}
										<ChevronDownIcon
											aria-hidden="true"
											className={`h-4 w-4 transition-transform ${
												openDropdown === item.name ? "rotate-180" : ""
											}`}
										/>
									</button>

									{openDropdown === item.name && (
										<div
											aria-label={`${item.name} Untermenü`}
											className="
    absolute mt-2 
    max-w-[calc(100vw-1rem)] 
    left-0 right-0 sm:left-auto sm:right-0
    rounded-lg bg-white shadow-lg ring-1 ring-gray-200 
    focus:outline-none z-50
	w-2xl
  "
											role="menu"
										>
											<div>
												<a
													className="block px-6 py-4 text-m font-semibold text-gray-800 hover:bg-gray-50"
													href={item.href}
												>
													{item.name} – Übersicht
												</a>
											</div>
											<div>
												<hr className="border-gray-100 my-1" />
											</div>
											<div
												className={getFlyoutLayoutClasses(item.children.length)}
											>
												{item.children.map((sub) => (
													<a
														className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded"
														href={sub.href}
														key={sub.name}
													>
														{sub.icon && (
															<span className="flex-shrink-0">{sub.icon}</span>
														)}
														{sub.name}
													</a>
												))}
											</div>
										</div>
									)}
								</div>
							) : (
								<a
									className="rounded-md px-2 py-1 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
									href={item.href}
								>
									{item.name}
								</a>
							)}
						</li>
					))}
				</ul>
			</nav>

			{/* Mobile Menu */}
			{mobileOpen && (
				<div
					aria-label="Mobiles Menü"
					className="sm:hidden border-t border-gray-200 bg-white"
					id="mobile-menu"
					role="menu"
				>
					<ul className="px-4 py-3 space-y-2">
						{navigation.map((item) => (
							<li key={item.name}>
								<a
									className="block px-2 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
									href={item.href}
									onClick={() => setMobileOpen(false)}
								>
									{item.name}
								</a>
								{item.children && (
									<ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-3">
										{item.children.map((sub) => (
											<li key={sub.name}>
												<a
													className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:text-indigo-600"
													href={sub.href}
													onClick={() => setMobileOpen(false)}
												>
													{sub.icon && (
														<span className="flex-shrink-0">{sub.icon}</span>
													)}
													<span className="truncate text-wrap">{sub.name}</span>
												</a>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</header>
	);
}
