export interface AudioEffectPlayer {

	resume(): void;

	stop(): void;

	suspend(): void;

	turnTo(sec: number): void;

	destroy(): void;

}
