import { copyFile } from "node:fs/promises";

Promise.all(
	["sitemap.xml", "sitemap-0.xml"].map((file) =>
		copyFile(`public/${file}`, `out/${file}`),
	),
)
	.catch((err) => console.error("❌ Error post build steps", err))
	.then(() => console.log(`pre next.js build finished.`));
