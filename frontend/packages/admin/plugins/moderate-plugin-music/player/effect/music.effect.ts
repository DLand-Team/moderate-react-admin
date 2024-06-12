export interface MusicEffect {

	update(voiceHigh: Uint8Array): void;

	destroy(): void;

}