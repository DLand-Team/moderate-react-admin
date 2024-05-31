/// <reference types="vite/client" />
/// <reference types="vite-plugin-glob-accept/client" />
declare module "*.riv" {}
type AddEventListenerType = Parameters<typeof window.addEventListener>;

declare interface Window {
	addEventListenerPro: (
		type: "pushState" | "replaceState" | keyof WindowEventMap,
		handler: AddEventListenerType[1],
	) => void;
	removeEventListenerPro: (
		type: "pushState" | "replaceState" | keyof WindowEventMap,
		handler: AddEventListenerType[1],
	) => void;
}
