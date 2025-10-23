import { copyFile } from "node:fs/promises";

Promise.all([copyFile("serve.json", "out/serve.json")])
	.catch((err) => console.error("❌ Error post build steps", err))
	.then(() => console.log(`pre next.js build finished.`));
