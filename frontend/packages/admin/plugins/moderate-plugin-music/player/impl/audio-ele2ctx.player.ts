import { EffectAudioContextPlayer } from "../abstract/effect-audio-context.player";
import { AudioEffectPlayer } from "../audio-effect.player";
import { AudioElementPlayer } from "../audio-element.player";
import { MusicEffectOption } from "../sub/audio-context.effect-controller";

export class AudioEle2CtxPlayer extends EffectAudioContextPlayer implements AudioEffectPlayer {

	private isDestroyed: boolean = false;

	private player: AudioElementPlayer;

	constructor(
		option: {
			file: string,
			loadFinish: (e: number) => void,
			playCallback: (e: number) => void,
			statusToPlayCallback: () => void,
			statusToPauseCallback: () => void,
			finishCallback: () => void,
			musicEffectOption: MusicEffectOption;
		},
	) {
		super(option.musicEffectOption);
		let loadFinish = (e: number) => {
			option.loadFinish(e);
			this.loadAndCreate();
		}
		let playCallback = (e: number) => {
			option.playCallback(e);
		}
		let statusToPlayCallback = () => {
			option.statusToPlayCallback();
		}
		let statusToPauseCallback = () => {
			option.statusToPauseCallback();
		}
		let finishCallback = () => {
			option.finishCallback();
		}
		this.player = new AudioElementPlayer({
			file: option.file,
			loadFinish: loadFinish,
			playCallback: playCallback,
			statusToPlayCallback: statusToPlayCallback,
			statusToPauseCallback: statusToPauseCallback,
			finishCallback: finishCallback,
		});
	}

	private loadAndCreate(): void {
		this.sourceNode = this.acts.createMediaElementSource(this.player.audioDom);
		this.createAnalyser();
	}

	/** 恢复 */
	public resume(): void {
		if (this.isDestroyed) {
			return;
		}
		this.player.resume();
		this.effectController.startLoop();
		this.audioIsPlaying = true;
	}

	/** 停止 */
	public stop(): void {
		if (this.isDestroyed) {
			return;
		}
		this.player.stop();
		this.effectController.stopLoop();
		this.audioIsPlaying = false;
	}

	/** 暂停 */
	public suspend(): void {
		if (this.isDestroyed) {
			return;
		}
		this.player.suspend();
		this.effectController.stopLoop();
		this.audioIsPlaying = false;
	}

	/** 跳转 */
	public turnTo(sec: number): void {
		if (this.isDestroyed) {
			return;
		}
		this.player.turnTo(sec);
	}

	/** 销毁 */
	public destroy(): void {
		if (this.isDestroyed) {
			return;
		}
		this.isDestroyed = true;
		this.player.stop();
		this.effectController.destroy();
		this.sourceNode?.disconnect(this.analyser);
		this.analyser?.disconnect(this.acts.destination);
		this.acts.close();
		this.decoded = null;
		this.sourceNode = null;
		this.analyser = null;
		this.player.destroy();
	}

}
