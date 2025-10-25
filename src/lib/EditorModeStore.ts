const EDITOR_ATTRIBUTE_NAME = "data-editor-mode";

// Typdefinition für den Listener-Callback (muss keine React-State-Setter sein)
type EditorModeCallback = (isEditorMode: boolean) => void;

class EditorModeStore {
	private isEditorMode: boolean = false;
	private listeners: Set<EditorModeCallback> = new Set();
	private observer: MutationObserver | null = null;

	constructor() {
		// Initialisierung des Zustands basierend auf dem DOM (Client-Side)
		if (typeof window !== "undefined" && document.body) {
			this.isEditorMode =
				document.body.getAttribute(EDITOR_ATTRIBUTE_NAME) === "true";
			this.setupObserver();
		}
	}

	/**
	 * Initialisiert den MutationObserver auf dem <body>-Element.
	 * Wird nur einmal aufgerufen.
	 */
	private setupObserver() {
		if (this.observer) return; // Verhindert doppelte Initialisierung

		const body = document.body;
		if (!body) return;

		this.observer = new MutationObserver((mutationsList: MutationRecord[]) => {
			for (const mutation of mutationsList) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === EDITOR_ATTRIBUTE_NAME
				) {
					const newValue = body.getAttribute(EDITOR_ATTRIBUTE_NAME);
					this.updateStateAndNotify(newValue);
					break; // Wir brauchen nur die erste relevante Mutation
				}
			}
		});

		const config: MutationObserverInit = {
			attributeFilter: [EDITOR_ATTRIBUTE_NAME],
			attributes: true,
		};

		this.observer.observe(body, config);
	}

	/**
	 * Aktualisiert den internen Zustand und benachrichtigt alle Abonnenten.
	 */
	private updateStateAndNotify(newValue: string | null) {
		const newMode = newValue === "true";

		if (this.isEditorMode !== newMode) {
			this.isEditorMode = newMode;
			// Benachrichtigung aller Abonnenten
			this.listeners.forEach((callback) => {callback(this.isEditorMode)});
		}
	}

	// --- Öffentliche Methoden für den React Hook ---

	/**
	 * Gibt den aktuellen Status zurück.
	 */
	public getSnapshot(): boolean {
		return this.isEditorMode;
	}

	/**
	 * Registriert einen Callback (den State-Setter des Hooks) zur Benachrichtigung.
	 */
	public subscribe(callback: EditorModeCallback): () => void {
		this.listeners.add(callback);

		// Gibt eine Funktion zur Abmeldung zurück
		return () => {
			this.listeners.delete(callback);
		};
	}

	// Optional: Aufräumen des Observers, falls jemals benötigt
	public disconnectObserver() {
		this.observer?.disconnect();
		this.observer = null;
		this.listeners.clear();
	}
}

// Exportieren der Singleton-Instanz
export const editorModeStore = new EditorModeStore();
