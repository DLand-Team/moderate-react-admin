export class AudioElementPlayer {

	private isDestroyed: boolean = false;

	public audioDom: HTMLAudioElement;
	private canPlay: boolean = false;

	private audioPlayProcessInterval: any = null;
	private playTimeSecond: number = 0;
	private timeDivide: number = 0;
	private audioDuration: number = 0;

	private audioIsPlaying: boolean = false;

	private readonly loadFinish: (e: number) => void;
	private readonly playCallback: (e: number) => void;
	private readonly statusToPlayCallback: () => void;
	private readonly statusToPauseCallback: () => void;
	private readonly finishCallback: () => void;

	constructor(option: {
		file: string,
		loadFinish: (e: number) => void,
		playCallback: (e: number) => void,
		statusToPlayCallback: () => void,
		statusToPauseCallback: () => void,
		finishCallback: () => void,
	}) {
		this.loadFinish = option.loadFinish;
		this.playCallback = option.playCallback;
		this.statusToPlayCallback = option.statusToPlayCallback;
		this.statusToPauseCallback = option.statusToPauseCallback;
		this.finishCallback = option.finishCallback;
		this.audioDom = document.createElement('audio');
		this.loadMusic(option.file);
	}

	private loadMusic(musicFile: string): void {
		this.audioDom.style.display = 'none';
		this.audioDom.src = musicFile;
		this.audioDom.load();
		// this.audioDom.setAttribute('autoplay', 'autoplay'); // IOS不支持直接canplay，需要通过自动播放来触发
		this.audioDom.addEventListener('canplay', () => {
			if (!this.canPlay) {
				this.canPlay = true;
				this.audioDom.pause();
				this.audioDuration = this.audioDom.duration;
				this.timeDivide = this.playTimeSecond - this.audioDom.currentTime;
				setTimeout(() => {
					this.loadFinish(this.audioDom.duration);
				});
			}
		});
		// this.audioDom.addEventListener('timeupdate', () => {
		//     this.playCallback(this.audioDom.currentTime);
		// });
		this.audioDom.addEventListener('play', () => {
			this.statusToPlayCallback();
		});
		this.audioDom.addEventListener('pause', () => {
			this.statusToPauseCallback();
		});
		this.audioDom.addEventListener('ended', () => {
			this.playCallback(this.audioDom.duration);
			this.finishCallback();
		});
	}

	/** 恢复 */
	public resume(): void {
		if (this.isDestroyed) {
			return;
		}
		this.audioDom.play().then(_ => {
			this.audioIsPlaying = true;
			this.startAudioPlayingProcessListener();
		});
	}

	/** 停止 */
	public stop(): void {
		if (this.isDestroyed) {
			return;
		}
		this.suspend();
		this.audioIsPlaying = false;
		this.playTimeSecond = this.audioDuration;
		this.audioDom.currentTime = this.audioDuration;
	}

	/** 暂停 */
	public suspend(): void {
		if (this.isDestroyed) {
			return;
		}
		this.audioDom.pause();
		this.audioIsPlaying = false;
		this.stopAudioPlayingProcessListener();
	}

	/** 跳转 */
	public turnTo(sec: number): void {
		if (this.isDestroyed) {
			return;
		}
		this.stopAudioPlayingProcessListener();
		this.audioDom.currentTime = sec;
		if (this.audioIsPlaying) {
			this.startAudioPlayingProcessListener();
		}
	}

	/** 销毁 */
	public destroy(): void {
		if (this.isDestroyed) {
			return;
		}
		this.isDestroyed = true;
		this.stopAudioPlayingProcessListener();
		this.audioDom.pause();
		this.audioDom.src = '';
		this.audioDom.remove();
	}

	private startAudioPlayingProcessListener(): void {
		this.stopAudioPlayingProcessListener();
		this.audioPlayProcessInterval = setInterval(() => {
			if (!this.audioIsPlaying) {
				return;
			}
			this.playTimeSecond = this.audioDom.currentTime + this.timeDivide;
			if (this.playTimeSecond >= this.audioDuration) {
				this.timeDivide = this.playTimeSecond - this.audioDom.currentTime;
				this.playCallback(this.audioDuration);
				this.finishCallback();
				this.stopAudioPlayingProcessListener();
				this.suspend();
			} else {
				this.playCallback(this.playTimeSecond);
			}
		}, 1000 / 30);
	}

	private stopAudioPlayingProcessListener(): void {
		clearInterval(this.audioPlayProcessInterval);
	}

}
