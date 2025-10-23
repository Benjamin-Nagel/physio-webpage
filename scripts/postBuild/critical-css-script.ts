import fs from "node:fs/promises";
import path from "node:path";

// https://github.com/vercel/next.js/discussions/59989

const OUTPUT_DIR = "out";
const LINK_REGEX =
	/<link\s+rel="stylesheet".*?href="(\/_next\/static\/chunks\/([a-f0-9]+)\.css)".*?>/s;

export async function inlineFullCSS() {
	console.log("Starte die Full CSS Inlining-Optimierung...");

	const findHtmlFiles = async (dir: string): Promise<string[]> => {
		let files: string[] = [];
		const items = await fs.readdir(dir, { withFileTypes: true });
		for (const item of items) {
			const fullPath = path.join(dir, item.name);
			if (item.isDirectory()) {
				files = files.concat(await findHtmlFiles(fullPath));
			} else if (item.isFile() && item.name.endsWith(".html")) {
				files.push(fullPath);
			}
		}
		return files;
	};

	const htmlFiles = await findHtmlFiles(OUTPUT_DIR);

	for (const filePath of htmlFiles) {
		const html = await fs.readFile(filePath, "utf-8");

		const match = html.match(LINK_REGEX);
		if (!match) continue;

		const cssChunkHref = match[1]; // z.B. /_next/static/chunks/a047ff38efb694b8.css
		const cssFilePath = path.join(OUTPUT_DIR, cssChunkHref);

		try {
			// 1. Gesamten CSS-Inhalt lesen
			const cssContent = await fs.readFile(cssFilePath, "utf-8");
			const inlineStyleTag = `<style data-inline-full-css>${cssContent}</style>`;

			// 2. Den inline-Style-Tag am Anfang des <head> einfügen
			let finalHtml = html.replace("<head>", `<head>${inlineStyleTag}`);

			// 3. Originalen, Render-Blocking Link entfernen
			const renderBlockingLinkRegex = new RegExp(
				`<link\\s+rel="stylesheet".*?href="${cssChunkHref}".*?>`,
				"s",
			);
			finalHtml = finalHtml.replace(renderBlockingLinkRegex, "");

			// 4. RSC Stream-Anweisung entfernen
			const streamRegex = new RegExp(
				`:HL\\["${cssChunkHref}","style"\\]\\\\n`,
				"g",
			);
			finalHtml = finalHtml.replace(streamRegex, "");

			// 5. Speichern
			await fs.writeFile(filePath, finalHtml);
			console.log(`✅ ${filePath} (Full CSS Inline) optimiert.`);
		} catch (e) {
			let message = "";
			if (e instanceof Error) {
				message = e.message;
			} else if (typeof e === "string") {
				message = e;
			} else {
				try {
					message = JSON.stringify(e);
				} catch {
					message = String(e);
				}
			}
			console.error(`Fehler bei CSS-Datei ${cssFilePath}:`, message);
		}
	}
	console.log("Optimierung abgeschlossen.");
}
