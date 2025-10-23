import { PageMiddleContent, PageWrapper } from "@/components/PageWrapper";

export default function ErstTermin() {
	return (
		<PageWrapper context={{ id: 219, type: "my-page" }}>
			<PageMiddleContent>
				<section className="py-12 bg-gray-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold mb-8 text-center">
							Unsere Leistungen
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							<div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
								<h3 className="text-xl font-semibold mb-2">
									Terminvereinbarung
								</h3>
								<p className="text-gray-600"></p>
							</div>
						</div>
					</div>
				</section>
			</PageMiddleContent>
		</PageWrapper>
	);
}
