"use client";

import type { DayOfWeek, MedicalClinic, WithContext } from "schema-dts";
import { webpageData } from "@/data/general-page-data";
import type { OpeningHour } from "@/types/types";

type WeekDayNamingType = {
	germanText: string;
	germanShortText: string;
	englishText: DayOfWeek;
	englishShortText: string;
};

const weekDayNamings: WeekDayNamingType[] = [
	{
		englishShortText: "Mo",
		englishText: "Monday",
		germanShortText: "Mo",
		germanText: "Montag",
	},
	{
		englishShortText: "Tu",
		englishText: "Tuesday",
		germanShortText: "Di",
		germanText: "Dienstag",
	},
	{
		englishShortText: "We",
		englishText: "Wednesday",
		germanShortText: "Mi",
		germanText: "Mittwoch",
	},
	{
		englishShortText: "Th",
		englishText: "Thursday",
		germanShortText: "Do",
		germanText: "Donnerstag",
	},
	{
		englishShortText: "Fr",
		englishText: "Friday",
		germanShortText: "Fr",
		germanText: "Freitag",
	},
	{
		englishShortText: "Sa",
		englishText: "Saturday",
		germanShortText: "Sa",
		germanText: "Samstag",
	},
	{
		englishShortText: "Su",
		englishText: "Sunday",
		germanShortText: "So",
		germanText: "Sonntag",
	},
];
function mapSchemaOpeningHours(openingHours: OpeningHour[]): string {
	return openingHours
		.map((openingHour) => {
			return weekDayNamings.filter(
				(namingMapping) => namingMapping.germanText === openingHour.day,
			)[0].englishShortText;
		})
		.join(",");
}
function mapSchemaAddressDayOfWeek(dayOfWeek: string): DayOfWeek {
	return weekDayNamings.filter(
		(namingMapping) => namingMapping.germanText === dayOfWeek,
	)[0].englishText;
}

export function SeoStructuredData() {
	const data: WithContext<MedicalClinic> = {
		"@context": "https://schema.org",
		"@type": "MedicalClinic",
		address: {
			"@type": "PostalAddress",
			addressCountry: "DE",
			addressLocality: webpageData.address.city,
			hoursAvailable: webpageData.openHours.map((openHour) => ({
				"@type": "OpeningHoursSpecification",
				closes: `${openHour.end}:00`,
				dayOfWeek: mapSchemaAddressDayOfWeek(openHour.day),
				opens: `${openHour.start}:00`,
			})),
			postalCode: webpageData.address.zipCode,
			streetAddress: `${webpageData.address.street} ${webpageData.address.number}`,
		},
		description: webpageData.description,
		geo: {
			"@type": "GeoCoordinates",
			latitude: webpageData.address.lat,
			longitude: webpageData.address.lng,
		},
		image: `${webpageData.baseUrl}/logo.jpg`,
		medicalSpecialty: ["Physiotherapy"],
		name: webpageData.name,
		openingHours: mapSchemaOpeningHours(webpageData.openHours),
		priceRange: "€€",
		telephone: webpageData.telephone,
		url: webpageData.baseUrl,
	};

	return (
		<script
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
			type="application/ld+json"
		/>
	);
}
