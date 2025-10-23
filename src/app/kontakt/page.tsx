import {
	BuildingStorefrontIcon,
	ClockIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";
import GoogleMapOfficial from "@/components/maps/GoogleMap";
import {
	PageBottomContent,
	PageMiddleContent,
	PageTopContent,
	PageWrapper,
} from "@/components/PageWrapper";
import { Contact } from "@/components/ui/Contact";
import { Feature, FeatureList } from "@/components/ui/Features";
import { webpageData } from "@/data/general-page-data";
import type { OpeningHour } from "@/types/types";

type OpenHourGroup = {
	startDay: string;
	endDay: string;
	startTime: string;
	endTime: string;
};

function groupOpenHours(hours: OpeningHour[]): OpenHourGroup[] {
	if (hours.length === 0) return [];

	const groups: OpenHourGroup[] = [];

	let currentGroup: OpenHourGroup = {
		endDay: hours[0].day,
		endTime: hours[0].end,
		startDay: hours[0].day,
		startTime: hours[0].start,
	};

	for (let i = 1; i < hours.length; i++) {
		const curr = hours[i];
		if (
			curr.start === currentGroup.startTime &&
			curr.end === currentGroup.endTime
		) {
			// gleicher Zeitraum -> erweitern
			currentGroup.endDay = curr.day;
		} else {
			// neuer Zeitraum -> alten abschließen
			groups.push(currentGroup);
			currentGroup = {
				endDay: curr.day,
				endTime: curr.end,
				startDay: curr.day,
				startTime: curr.start,
			};
		}
	}
	// letztes Element hinzufügen
	groups.push(currentGroup);

	return groups;
}

export default function Kontakt() {
	return (
		<PageWrapper context={{ id: 221, type: "my-page" }}>
			<PageTopContent>
				<Contact
					address={`${webpageData.address.street} ${webpageData.address.number}, ${webpageData.address.zipCode} ${webpageData.address.city}`}
					email={webpageData.email}
					headline="Termin Anfrage"
					telephone={webpageData.telephone}
				/>
			</PageTopContent>
			<PageMiddleContent>
				<FeatureList headline="Kontaktinformationen">
					<Feature headline="Telefon" icon={PhoneIcon}>
						<dl className="divide-y divide-gray-100">
							<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt className="text-sm/6 font-medium text-gray-900">Mobile</dt>
								<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
									<a href={`tel:${webpageData.mobile}`}>{webpageData.mobile}</a>
								</dd>

								<dt className="text-sm/6 font-medium text-gray-900">Telefon</dt>
								<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
									<a href={`tel:${webpageData.telephone}`}>
										{webpageData.telephone}
									</a>
								</dd>

								<dt className="text-sm/6 font-medium text-gray-900">Fax</dt>
								<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
									<a href={`tel:${webpageData.fax}`}>s{webpageData.fax}</a>
								</dd>
							</div>
						</dl>
					</Feature>
					<Feature headline="Adresse" icon={BuildingStorefrontIcon}>
						<p>
							{webpageData.address.street} {webpageData.address.number} <br />
							{webpageData.address.zipCode} {webpageData.address.city}
						</p>
					</Feature>
					<Feature headline="Öffnungszeiten" icon={ClockIcon}>
						<dl className="divide-y divide-gray-100">
							{groupOpenHours(webpageData.openHours).map((openHourGroup) => {
								const day =
									openHourGroup.startDay === openHourGroup.endDay
										? openHourGroup.startDay
										: `${openHourGroup.startDay} - ${openHourGroup.endDay}`;
								return (
									<div
										className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
										key={day}
									>
										<dt className="text-sm/6 font-medium text-gray-900">
											{day}
										</dt>
										<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
											{openHourGroup.startTime} - {openHourGroup.endTime}
										</dd>
									</div>
								);
							})}
						</dl>
					</Feature>
				</FeatureList>
			</PageMiddleContent>
			<PageBottomContent>
				<div className="bg-white py-24 sm:py-32">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<GoogleMapOfficial
							lat={webpageData.address.lat}
							lng={webpageData.address.lng}
						/>
					</div>
				</div>
			</PageBottomContent>
		</PageWrapper>
	);
}
