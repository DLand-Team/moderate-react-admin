import { EffectAudioContextPlayer } from "../abstract/effect-audio-context.player";
import { AudioEffectPlayer } from "../audio-effect.player";
import { MusicEffectOption } from "../sub/audio-context.effect-controller";

export class AudioContextPlayer extends EffectAudioContextPlayer implements AudioEffectPlayer {

	private isDestroyed: boolean = false;

	private audioPlayProcessInterval: any = null;
	private playTimeSecond: number = 0;
	private timeDivide: number = 0;
	private audioDuration: number = 0;

	private isLoadFinish: boolean = false;
	private audioIsStart: boolean = false;
	private audioIsSuspend: boolean = false;

	private readonly loadFinish: (e: number) => void;
	private readonly playCallback: (e: number) => void;
	private readonly statusToPlayCallback: () => void;
	private readonly statusToPauseCallback: () => void;
	private readonly finishCallback: () => void;

	constructor(
		option: {
			file: string, // 文件
			loadFinish: (e: number) => void, // 加载完成的回调
			playCallback: (e: number) => void, // 播放中回调
			statusToPlayCallback: () => void,
			statusToPauseCallback: () => void,
			finishCallback: () => void, // 播放完成回调
			musicEffectOption: MusicEffectOption; // 可视化显示dom
		},
	) {
		super(option.musicEffectOption);
		this.loadFinish = option.loadFinish;
		this.playCallback = option.playCallback;
		this.statusToPlayCallback = option.statusToPlayCallback;
		this.statusToPauseCallback = option.statusToPauseCallback;
		this.finishCallback = option.finishCallback;
		this.loadMusic(option.file);
	}

	private async loadMusic(musicFile: string) {
		let res;
		try {
			res = await fetch(musicFile);
		} catch (error) {
			console.error(error);
			setTimeout(() => {
				this.loadMusic(musicFile);
			}, 1000);
		}
		if (this.isDestroyed) {
			return;
		}
		if (res != null) {
			const buf = await res.arrayBuffer();
			if (this.isDestroyed) {
				return;
			}
			this.decoded = await this.acts.decodeAudioData(buf);
			if (this.isDestroyed) {
				return;
			}
			this.isLoadFinish = true;
			this.audioDuration = this.decoded.duration;
			this.suspend();
			this.timeDivide = this.playTimeSecond - this.acts.currentTime;
			this.loadFinish(this.decoded.duration);
		}
	}

	private start(time: number): void {
		if (!this.isLoadFinish) {
			throw new Error('load is not finish');
		}
		if (!this.audioIsStart) {
			this.sourceNode = this.acts.createBufferSource();
			this.createAnalyser();
			// 开始播放
			this.sourceNode.onended = () => {
			}
			this.sourceNode.start(0, time);
			this.audioIsStart = true;
		}
	}

	/** 恢复 */
	public resume(): void {
		if (this.isDestroyed) {
			return;
		}
		if (this.audioIsSuspend) {
			if (!this.audioIsStart) {
				this.start(this.playTimeSecond);
			}
			this.effectController.startLoop();
			this.acts.resume();
			this.startAudioPlayingProcessListener();
			this.audioIsPlaying = true;
			this.audioIsSuspend = false;
			this.statusToPlayCallback();
		}
	}

	/** 停止 */
	public stop(): void {
		if (this.isDestroyed) {
			return;
		}
		if (!this.audioIsStart) {
			return;
		}
		this.effectController.stopLoop();
		this.suspend();
		this.audioIsPlaying = false;
		this.audioIsStart = false;
		this.sourceNode?.stop();
		this.sourceNode?.disconnect(this.analyser);
		this.analyser?.disconnect(this.acts.destination);
		this.statusToPauseCallback();
	}

	/** 暂停 */
	public suspend(): void {
		if (this.isDestroyed) {
			return;
		}
		if (!this.audioIsSuspend) {
			this.effectController.stopLoop();
			this.acts.suspend();
			this.stopAudioPlayingProcessListener();
			this.audioIsPlaying = false;
			this.audioIsSuspend = true;
			this.statusToPauseCallback();
		}
	}

	/** 跳转 */
	public turnTo(sec: number): void {
		if (this.isDestroyed) {
			return;
		}
		let cache = this.audioIsPlaying;
		this.stopAudioPlayingProcessListener();
		this.stop();
		this.playTimeSecond = sec;
		this.timeDivide = this.playTimeSecond - this.acts.currentTime;
		setTimeout(() => {
			this.start(sec);
			if (cache) {
				this.resume();
				this.startAudioPlayingProcessListener();
			}
		});
	}

	/** 销毁 */
	public destroy(): void {
		if (this.isDestroyed) {
			return;
		}
		this.isDestroyed = true;
		this.stopAudioPlayingProcessListener();
		this.effectController.destroy();
		this.stop();
		this.acts.close();
		this.decoded = null;
		this.sourceNode = null;
		this.analyser = null;
		this.statusToPauseCallback();
	}

	private startAudioPlayingProcessListener(): void {
		this.stopAudioPlayingProcessListener();
		this.audioPlayProcessInterval = setInterval(() => {
			if (!this.audioIsPlaying) {
				return;
			}
			this.playTimeSecond = this.acts.currentTime + this.timeDivide;
			if (this.playTimeSecond >= this.audioDuration) {
				this.timeDivide = this.playTimeSecond - this.acts.currentTime;
				this.playCallback(this.audioDuration);
				this.finishCallback();
				this.stopAudioPlayingProcessListener();
				this.stop();
			} else {
				this.playCallback(this.playTimeSecond);
			}
		}, 1000 / 30);
	}

	private stopAudioPlayingProcessListener(): void {
		clearInterval(this.audioPlayProcessInterval);
	}

}
