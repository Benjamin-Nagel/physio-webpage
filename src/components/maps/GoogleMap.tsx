"use client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import { getGoogleMapsApiKey } from "@/lib/environment";
import { klaroConfig } from "../Klaro";

interface GoogleMapOfficialProps {
	lat: number;
	lng: number;
	zoom?: number;
	fallbackImage?: string;
}

function GoogleMap({ lat, lng, zoom = 14 }: GoogleMapOfficialProps) {
	const mapRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!mapRef.current) return;

		const map = new google.maps.Map(mapRef.current, {
			center: { lat, lng },
			disableDefaultUI: false,
			zoom,
		});

		new google.maps.Marker({
			map,
			position: { lat, lng },
			title: "Standort",
		});
	}, [lat, lng, zoom]);

	return (
		<div
			ref={mapRef}
			style={{ borderRadius: 8, height: "400px", width: "100%" }}
		/>
	);
}

export default function GoogleMapOfficial({
	lat,
	lng,
	zoom,
	fallbackImage,
}: GoogleMapOfficialProps) {
	// Zustand für die Zustimmung
	const [isAccepted, setIsAccepted] = useState(false);

	// Prüfen, ob die Zustimmung vorliegt (z.B. durch Klaro gesetzt)
	useEffect(() => {
		async function checkMapLoading() {
			// Klaro-Funktion/Variable prüfen
			// Hier nutzen wir die in der Klaro-Konfig (Schritt 1) gesetzte globale Variable.
			// Alternativ: document.addEventListener('klaro-google-maps-accepted', () => setIsAccepted(true));
			const klaro = await import("klaro/dist/klaro-no-css");

			if (klaro.getManager(klaroConfig).getConsent("google-maps")) {
				setIsAccepted(true);
			}

			const updateConsent: EventListener = (event: Event) => {
				console.log("event google [updateConsent]: " + event);
				const customEvent = event as CustomEvent<{ accepted: boolean }>;
				setIsAccepted(customEvent.detail.accepted);
			};

			// 2. Event-Listener registrieren, um auf Änderungen zu reagieren
			document.addEventListener("klaro-google-maps-consent", updateConsent);

			// 3. Cleanup-Funktion entfernt den Listener beim Unmounten der Komponente
			return () => {
				document.removeEventListener(
					"klaro-google-maps-consent",
					updateConsent,
				);
			};
		}
		checkMapLoading();
	}, []);

	if (!isAccepted) {
		// Anzeige eines datenschutzkonformen Platzhalters vor der Zustimmung
		return (
			<div
				style={{
					alignItems: "center",
					border: "1px solid #ccc",
					borderRadius: 8,
					display: "flex",
					flexDirection: "column",
					height: "400px",
					justifyContent: "center",
					padding: "20px",
					width: "100%",
				}}
			>
				{fallbackImage && (
					<img
						alt="Karten-Platzhalter"
						src={fallbackImage}
						style={{ height: "auto", maxWidth: "100%" }}
					/>
				)}
				<p style={{ marginTop: "10px", textAlign: "center" }}>
					Um die Google-Karte anzuzeigen, müssen Sie der Verwendung von Google
					Maps im Rahmen unserer Datenschutzeinstellungen zustimmen.
				</p>
				{/* Optional: Link/Button, der das Klaro-Fenster öffnet */}
			</div>
		);
	}

	const renderStatus = (status: "LOADING" | "FAILURE" | "SUCCESS") => {
		switch (status) {
			case "LOADING":
				return <div>Karte wird geladen …</div>;
			case "FAILURE":
				return <div>Fehler beim Laden von Google Maps.</div>;
			case "SUCCESS":
				return <GoogleMap lat={lat} lng={lng} zoom={zoom} />;
		}
	};

	return <Wrapper apiKey={getGoogleMapsApiKey() || ""} render={renderStatus} />;
}
