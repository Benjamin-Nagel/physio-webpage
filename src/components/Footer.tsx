import Image from "next/image";
import Link from "next/link";
import { navigation, type SubNavigationEntry } from "@/data/navigation";

function getSubNavigation(url: string): SubNavigationEntry[] {
	for (const mainEntry of navigation) {
		if (mainEntry.href === url) {
			return mainEntry.children || [];
		}
	}
	return [];
}

export function Footer() {
	const treatments: SubNavigationEntry[] = getSubNavigation("/leistungen");
	const complaints: SubNavigationEntry[] = getSubNavigation("/beschwerden");
	const patientenInformationen: SubNavigationEntry[] =
		getSubNavigation("/patienteninfo");
	const aboutUs: SubNavigationEntry[] = getSubNavigation("/ueber-uns");
	return (
		<footer className="mt-8 bg-gray-900 sm:mt-16">
			<h2 className="sr-only" id="footer-heading">
				Footer
			</h2>
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="mt-10 md:mt-0">
						<Image alt="Logo" height={147} src="/logo.jpg" width={320} />
						<h3 className="text-sm font-semibold leading-6 text-white py-6 ">
							Rechtliches
						</h3>
						<ul className="mt-6 space-y-4">
							<li>
								<Link
									className="text-sm leading-6 text-gray-300 hover:text-white"
									href="/impressum"
								>
									Impressum
								</Link>
							</li>
							<li>
								<Link
									className="text-sm leading-6 text-gray-300 hover:text-white"
									href="/datenschutz"
								>
									Datenschutz
								</Link>
							</li>
						</ul>
					</div>

					<div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold leading-6 text-white">
									<Link href={"/leistungen"}>Leistungen</Link>
								</h3>
								<ul className="mt-6 space-y-4">
									{treatments.map((item) => (
										<li key={item.name}>
											<Link
												className="text-sm leading-6 text-gray-300 hover:text-white"
												href={item.href}
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-10 md:mt-0">
								<h3 className="text-sm font-semibold leading-6 text-white">
									<Link href={"/beschwerden"}>Beschwerden</Link>
								</h3>
								<ul className="mt-6 space-y-4">
									{complaints.map((item) => (
										<li key={item.name}>
											<Link
												className="text-sm leading-6 text-gray-300 hover:text-white"
												href={item.href}
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold leading-6 text-white">
									<Link href={"/patienteninfo"}>Patienteninformationen</Link>
								</h3>
								<ul className="mt-6 space-y-4">
									{patientenInformationen.map((item) => (
										<li key={item.name}>
											<Link
												className="text-sm leading-6 text-gray-300 hover:text-white"
												href={item.href}
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-10 md:mt-0">
								<h3 className="text-sm font-semibold leading-6 text-white">
									<Link href={"/ueber-uns"}>Über uns</Link>
								</h3>
								<ul className="mt-6 space-y-4">
									{aboutUs.map((item) => (
										<li key={item.name}>
											<Link
												className="text-sm leading-6 text-gray-300 hover:text-white"
												href={item.href}
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
