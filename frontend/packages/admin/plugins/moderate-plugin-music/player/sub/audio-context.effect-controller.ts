import { Music1Effect } from "../effect/impl/music-1.effect";
import { Music2Effect } from "../effect/impl/music-2.effect";
import { Music3Effect } from "../effect/impl/music-3.effect";
import { EffectAudioContextPlayer } from "../abstract/effect-audio-context.player";

export type MusicEffectOption = {
	e1?: {
		show: boolean,
		dom: HTMLDivElement;
	},
	e2?: {
		show: boolean,
		dom: HTMLDivElement;
	},
	e3?: {
		show: boolean,
		dom: HTMLDivElement;
	},
}

export enum MusicEffectNameEnum {
	E1, E2, E3
}

export class AudioContextEffectController {

	private isLooping: boolean = false;
	private frameTime: number = 0;
	private maxFps: number = 62.5;
	private ftm: number = 1000 / this.maxFps;
	private isDestroyed: boolean = false;

	private music1Effect?: Music1Effect;
	private music2Effect?: Music2Effect;
	private music3Effect?: Music3Effect;

	constructor(
		private readonly musicEffectOption: MusicEffectOption,
		private father: EffectAudioContextPlayer,
	) {
		if (this.musicEffectOption != null) {
			if (this.musicEffectOption.e1?.show) {
				this.music1Effect = new Music1Effect(this.musicEffectOption.e1.dom);
			}
			if (this.musicEffectOption.e2?.show) {
				this.music2Effect = new Music2Effect(this.musicEffectOption.e2.dom);
			}
			if (this.musicEffectOption.e3?.show) {
				this.music3Effect = new Music3Effect(this.musicEffectOption.e3.dom);
			}
		}
	}

	public startLoop(): void {
		if (!this.isLooping &&
			(this.music1Effect != null || this.music2Effect != null || this.music3Effect != null)
		) {
			this.isLooping = true;
			this.frameTime = 0;
			this.loop(0);
		}
	}

	public stopLoop(): void {
		this.isLooping = false;
	}

	private loop(e: number): void {
		if (e - this.frameTime >= this.ftm) {
			this.frameTime = e;
			if (this.father.audioIsPlaying && this.father.analyser != null &&
				(this.music1Effect != null || this.music2Effect != null || this.music3Effect != null)) {
				let bufferLength = this.father.analyser.frequencyBinCount; // = fftSize * 0.5
				let voiceHigh = new Uint8Array(bufferLength);
				this.father.analyser.getByteFrequencyData(voiceHigh);
				this.music1Effect?.update(voiceHigh); // 波纹
				this.music2Effect?.update(voiceHigh); // 圈
				this.music3Effect?.update(voiceHigh); // THREE
			}
		}
		requestAnimationFrame((e1: number) => {
			if (this.isLooping && !this.isDestroyed) {
				this.loop(e1);
			}
		});
	}

	public showMusicEffect(name: MusicEffectNameEnum, dom: HTMLDivElement): void {
		if (this.musicEffectOption == null) {
			return;
		}
		switch (name) {
			case MusicEffectNameEnum.E1:
				this.music1Effect?.destroy();
				if (this.musicEffectOption.e1 != null) { // 不作用在初始化开始时未进行实例化的特效
					this.removeMusicEffect(MusicEffectNameEnum.E1);
					this.musicEffectOption.e1.dom = dom;
					this.music1Effect = new Music1Effect(this.musicEffectOption.e1.dom);
				}
				break;
			case MusicEffectNameEnum.E2:
				this.music2Effect?.destroy();
				if (this.musicEffectOption.e2 != null) { // 不作用在初始化开始时未进行实例化的特效
					this.removeMusicEffect(MusicEffectNameEnum.E2);
					this.musicEffectOption.e2.dom = dom;
					this.music2Effect = new Music2Effect(this.musicEffectOption.e2.dom);
				}
				break;
			case MusicEffectNameEnum.E3:
				this.music3Effect?.destroy();
				if (this.musicEffectOption.e3 != null) { // 不作用在初始化开始时未进行实例化的特效
					this.removeMusicEffect(MusicEffectNameEnum.E3);
					this.musicEffectOption.e3.dom = dom;
					this.music3Effect = new Music3Effect(this.musicEffectOption.e3.dom);
				}
				break;
			default:
				break;
		}
		if (!this.isLooping) {
			this.startLoop();
		}
	}

	public removeMusicEffect(name: MusicEffectNameEnum): void {
		switch (name) {
			case MusicEffectNameEnum.E1:
				this.music1Effect?.destroy();
				this.music1Effect = undefined;
				break;
			case MusicEffectNameEnum.E2:
				this.music2Effect?.destroy();
				this.music2Effect = undefined;
				break;
			case MusicEffectNameEnum.E3:
				this.music3Effect?.destroy();
				this.music3Effect = undefined;
				break;
			default:
				break;
		}
		if (this.music1Effect == null && this.music2Effect == null && this.music3Effect == null) {
			this.stopLoop();
		}
	}

	public destroy(): void {
		this.isDestroyed = true;
		this.stopLoop();
		this.music1Effect?.destroy();
		this.music2Effect?.destroy();
		this.music3Effect?.destroy();
	}

}
