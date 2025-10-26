import { useCallback, useEffect, useState } from "react";
import { editorModeStore } from "../lib/EditorModeStore"; // Pfad anpassen

/**
 * Hook zum Abonnieren des globalen Editormodus-Status, der über das
 * 'data-editor-mode'-Attribut am <body> gesteuert wird.
 *
 * Verwendet ein Singleton-Store, um sicherzustellen, dass nur EIN MutationObserver
 * im gesamten Frontend registriert wird.
 *
 * @returns {boolean} Der aktuelle Status des Editormodus.
 */
export const useEditorMode = (): boolean => {
	// Initialer State über den Store abrufen
	const [isEditorMode, setIsEditorMode] = useState<boolean>(
		editorModeStore.getSnapshot(),
	);

	// Die Callback-Funktion, die bei einer Änderung im Store aufgerufen wird
	const handleStoreChange = useCallback((newMode: boolean) => {
		setIsEditorMode(newMode);
	}, []);

	useEffect(() => {
		// Beim Mounten abonnieren (fügt den State-Setter zur Listener-Liste hinzu)
		const unsubscribe = editorModeStore.subscribe(handleStoreChange);

		// Wichtig: Snapshot erneut abrufen, um Race Conditions zu vermeiden,
		// falls sich der Wert zwischen dem initialen useState und dem subscribe geändert hat.
		const currentMode = editorModeStore.getSnapshot();
		if (isEditorMode !== currentMode) {
			setIsEditorMode(currentMode);
		}

		// Bereinigung: Abmeldung beim Unmounten der Komponente
		return () => {
			unsubscribe();
		};
	}, [handleStoreChange, isEditorMode]);

	return isEditorMode;
};
