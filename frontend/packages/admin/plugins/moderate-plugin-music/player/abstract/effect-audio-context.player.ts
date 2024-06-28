import { AudioContextEffectController, MusicEffectNameEnum, MusicEffectOption } from "../sub/audio-context.effect-controller";

declare const webkitAudioContext: any;

export abstract class EffectAudioContextPlayer {

	actx = new (AudioContext || webkitAudioContext)();
	analyser: any;
	decoded: any;
	sourceNode: any;
	bufferLength = 0;

	audioIsPlaying: boolean = false;

	effectController: AudioContextEffectController;

	protected constructor(
		private musicEffectOption: MusicEffectOption,
	) {
		this.effectController = new AudioContextEffectController(this.musicEffectOption, this);
	}

	protected createAnalyser(): void {
		// 创建分析节点
		this.analyser = this.actx.createAnalyser();
		this.analyser.connect(this.actx.destination);
		// 创建Buffer节点
		this.sourceNode.buffer = this.decoded;
		this.sourceNode.loop = false;
		this.sourceNode.connect(this.analyser);
		// 快速傅里叶变换, 必须为2的N次方
		this.analyser.fftSize = 2048;
	}

	public showMusicEffect(name: MusicEffectNameEnum, dom: HTMLDivElement): void {
		this.effectController.showMusicEffect(name, dom);
	}

	public removeMusicEffect(name: MusicEffectNameEnum): void {
		this.effectController.removeMusicEffect(name);
	}

}
