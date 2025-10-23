import { rm } from "node:fs/promises";

async function cleanNextCache() {
	try {
		[".next/cache", "out"].forEach(async (pathToDelete) => {
			await rm(pathToDelete, { force: true, recursive: true });
			console.log(`${pathToDelete} erfolgreich gelöscht.`);
		});
	} catch (err) {
		console.error("Fehler beim Löschen von .next/cache:", err);
		process.exit(1);
	}
}

cleanNextCache().catch((err) => {
	console.error("❌ Error by cleaning the cache:", err);
	process.exit(1);
});
