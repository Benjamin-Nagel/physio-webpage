"use client";
import {
	BuildingOffice2Icon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { getPageUrl } from "@/lib/environment";
import type { GenericContentProps } from "@/types/types";

export type ContactProps = GenericContentProps & {
	address: string;
	email: string;
	telephone: string;
};

type ContactFormData = {
	"your-name": string;
	"your-email": string;
	"your-email-validation": string;
	"your-subject": string;
	"your-message": string;
};

// Typdefinition versteckter Werte
type HiddenValues = {
	_wpcf7: number;
	_wpcf7_version: string;
	_wpcf7_locale: string;
	_wpcf7_unit_tag: string;
	_wpcf7_container_post: number;
};

interface ServerValidationError {
	field: string;
	message: string;
	idref: string | null;
	error_id: string;
}

interface ContactFormResponse {
	contact_form_id: number;
	status: "mail_sent" | "mail_failed" | "validation_failed";
	message: string;
	invalid_fields?: ServerValidationError[];
	posted_data_hash?: string;
	demo_mode?: boolean;
	into?: string;
}

export function Contact({ headline, address, email, telephone }: ContactProps) {
	const formId = 74;
	const siteUrl = `${getPageUrl()}`;
	console.log(siteUrl);

	const [formData, setFormData] = useState<ContactFormData>({
		"your-email": "",
		"your-email-validation": "",
		"your-message": "",
		"your-name": "",
		"your-subject": "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [serverMessage, setServerMessage] = useState<string | null>(null);

	// Versteckte Werte – CSRF-Token sollte serverseitig gesetzt werden
	const hiddenValues: HiddenValues = {
		_wpcf7: formId,
		_wpcf7_container_post: 0,
		_wpcf7_locale: "de_DE",
		_wpcf7_unit_tag: `wpcf7-f${formId}-p2-o1`,
		_wpcf7_version: "6.1.2",
	};

	// Optionaler Honeypot gegen Bots
	const [honeypot, setHoneypot] = useState("");

	const validateClient = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData["your-name"].trim()) {
			newErrors["your-name"] = "Bitte geben Sie Ihren Namen ein.";
		}
		if (!formData["your-email"].match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			newErrors["your-email"] =
				"Bitte geben Sie eine gültige E-Mail-Adresse ein.";
		}
		if (
			!formData["your-email-validation"].match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
		) {
			newErrors["your-email"] =
				"Bitte geben Sie eine gültige E-Mail-Adresse ein.";
		}
		if (formData["your-email-validation"] !== formData["your-email"]) {
			newErrors["your-email-validation"] =
				"Ihr E-Mail-Adresse stimmt nicht überein.";
		}
		if (formData["your-message"].trim().length < 10) {
			newErrors["your-message"] =
				"Die Nachricht muss mindestens 10 Zeichen enthalten.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setServerMessage(null);
		setErrors({});

		if (honeypot) {
			console.warn("Bot detected — submission aborted.");
			return;
		}

		if (!validateClient()) return;
		setIsSubmitting(true);
		const payload = new FormData();

		Object.entries(formData).forEach(([key, value]) => {
			payload.append(key, value);
		});
		Object.entries(hiddenValues).forEach(([key, value]) => {
			payload.append(key, value as string);
		});

		try {
			const response = await fetch(
				`${siteUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback/`,
				{
					body: payload,
					method: "POST",
				},
			);

			const result: ContactFormResponse = await response.json();

			if (!response.ok) {
				throw new Error(`HTTP Error ${response.status}`);
			}

			// Verarbeitung je nach Status
			if (result.status === "validation_failed") {
				const newErrors: Record<string, string> = {};
				result.invalid_fields?.forEach((f) => {
					newErrors[f.field] = f.message;
				});
				setErrors(newErrors);
				setServerMessage(result.message || "Validierungsfehler im Formular.");
			} else if (result.status === "mail_sent") {
				setServerMessage("Nachricht erfolgreich gesendet!");
				setFormData({
					"your-email": "",
					"your-email-validation": "",
					"your-message": "",
					"your-name": "",
					"your-subject": "",
				});
			} else if (result.status === "mail_failed") {
				setServerMessage(
					"Beim Versand der Nachricht ist ein Fehler aufgetreten.",
				);
			}

			if (result.demo_mode) {
				console.warn(
					"Achtung: Das Formular läuft im Demo-Modus und sendet keine echten Mails.",
				);
			}
		} catch (error) {
			console.error("Fehler beim Senden:", error);
			setServerMessage(
				"Unerwarteter Fehler beim Senden. Bitte versuchen Sie es erneut.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className="relative isolate bg-white">
			<div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
				<div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
					<div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
						<div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
							<svg
								aria-hidden="true"
								className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
							>
								<defs>
									<pattern
										height={200}
										id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
										patternUnits="userSpaceOnUse"
										width={200}
										x="100%"
										y={-1}
									>
										<path d="M130 200V.5M.5 .5H200" fill="none" />
									</pattern>
								</defs>
								<rect fill="white" height="100%" strokeWidth={0} width="100%" />
								<svg className="overflow-visible fill-gray-50" x="100%" y={-1}>
									<title>Background</title>
									<path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
								</svg>
								<rect
									fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
									height="100%"
									strokeWidth={0}
									width="100%"
								/>
							</svg>
						</div>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900">
							{headline}
						</h2>
						<dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Adresse</span>
									<BuildingOffice2Icon
										aria-hidden="true"
										className="h-7 w-6 text-gray-400"
									/>
								</dt>
								<dd>{address}</dd>
							</div>
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Telefon</span>
									<PhoneIcon
										aria-hidden="true"
										className="h-7 w-6 text-gray-400"
									/>
								</dt>
								<dd>
									<a className="hover:text-gray-900" href={`tel:${telephone}`}>
										{telephone}
									</a>
								</dd>
							</div>
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Email</span>
									<EnvelopeIcon
										aria-hidden="true"
										className="h-7 w-6 text-gray-400"
									/>
								</dt>
								<dd>
									<a className="hover:text-gray-900" href={`mailto:${email}`}>
										{email}
									</a>
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<form
					className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
					method="POST"
					noValidate
					onSubmit={handleSubmit}
				>
					{/* Honeypot */}
					<div style={{ display: "none" }}>
						<label>
							Bitte leer lassen:
							<input
								autoComplete="off"
								name="honeypot"
								onChange={(e) => setHoneypot(e.target.value)}
								tabIndex={-1}
								type="text"
								value={honeypot}
							/>
						</label>
					</div>
					<div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<div className="sm:col-span-2">
								<label
									className="block text-sm font-semibold leading-6 text-gray-900"
									htmlFor="name"
								>
									Name*{" "}
									{errors["your-name"] && (
										<span className="text-red-700">{errors["your-name"]}</span>
									)}
								</label>
								<div className="mt-2.5">
									<input
										autoComplete="name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										id="name"
										name="your-name"
										onChange={handleChange}
										required={true}
										type="name"
										value={formData["your-name"]}
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									className="block text-sm font-semibold leading-6 text-gray-900"
									htmlFor="email"
								>
									Email*{" "}
									{errors["your-email"] && (
										<span className="text-red-700">{errors["your-email"]}</span>
									)}
								</label>
								<div className="mt-2.5">
									<input
										autoComplete="email"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										id="email"
										name="your-email"
										onChange={handleChange}
										required={true}
										type="email"
										value={formData["your-email"]}
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									className="block text-sm font-semibold leading-6 text-gray-900"
									htmlFor="phone-number"
								>
									Email*{" "}
									{errors["your-email-validation"] && (
										<span className="text-red-700">
											{errors["your-email-validation"]}
										</span>
									)}
								</label>
								<div className="mt-2.5">
									<input
										autoComplete="email"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										id="emailCopy"
										name="your-email-validation"
										onChange={handleChange}
										required={true}
										type="email"
										value={formData["your-email-validation"]}
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									className="block text-sm font-semibold leading-6 text-gray-900"
									htmlFor="message"
								>
									Message*{" "}
									{errors["your-message"] && (
										<span className="text-red-700">
											{errors["your-message"]}
										</span>
									)}
								</label>
								<div className="mt-2.5">
									<textarea
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										id="message"
										name="your-message"
										onChange={handleChange}
										required={true}
										rows={4}
										value={formData["your-message"]}
									/>
								</div>
							</div>
						</div>
						{/* versteckte Felder im DOM */}
						{Object.entries(hiddenValues).map(([key, value]) => (
							<input key={key} name={key} type="hidden" value={value} />
						))}

						{/* Server-Rückmeldung */}
						{serverMessage && <p>{serverMessage}</p>}
						<div className="mt-8 flex justify-end text-red-700">
							<button
								className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								disabled={isSubmitting}
								type="submit"
							>
								{isSubmitting ? "Senden..." : "Senden"}
							</button>
						</div>
						<div className="mt-8 flex justify-end text-gray-500">
							Hinweis: Ihre Daten werden sicher mit SSL-Verschlüsselung
							übertragen. Bitte beachten Sie unsere Datenschutzerklärung.
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
