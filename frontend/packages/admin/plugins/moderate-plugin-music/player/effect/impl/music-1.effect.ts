import { MusicEffect } from "../music.effect";
import { ResizeObserverWrap } from "../../ext/resize-observer.wrap";

export class Music1Effect implements MusicEffect {

	private containerWidth = 0;
	private containerHeight = 0;
	private DPR = window.devicePixelRatio;
	private resizeObserver!: ResizeObserverWrap;
	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;
	private color!: CanvasGradient;

	private WIDTH_RATE = 0.425 * this.DPR;
	private HEIGHT_RATE = 0.515 * this.DPR;
	private dotDropSpeedBase60: number = 0.375 * this.DPR; // 60 fps 基准
	private RATE: number = 1.9;
	private num = (window.innerWidth / 10) * this.RATE;
	private dots: Array<{ cap: number, bottom: number, height: number }> = [];
	private voiceHigh?: Uint8Array;

	private currentColor: string = 'gradient';

	private frameTime: number = 0;
	private realtimeFps: number = 60;
	private isDestroyed = false;

	constructor(
		private dom: HTMLDivElement,
	) {
		this.containerWidth = dom.clientWidth;
		this.containerHeight = dom.clientHeight;
		this.init();
	}

	private init(): void {
		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'relative';
		this.canvas.style.pointerEvents = 'none';
		this.canvas.style.width = this.containerWidth + 'px';
		this.canvas.style.height = this.containerHeight + 'px';
		this.canvas.style.bottom = '0';
		this.canvas.style.left = '0';
		this.dom.appendChild(this.canvas);
		this.addResizeListener();
		this.ctx = this.canvas.getContext('2d')!;
		if (this.canvas != null && this.ctx != null) {
			this.onResize();
		}
		this.loop(0);
	}

	private loop(e: number) {
		if (e - this.frameTime >= 16) {
			this.realtimeFps = ~~(1000 / (e - this.frameTime));
			this.frameTime = e;
			this.render();
		}
		requestAnimationFrame((e1: number) => {
			if (!this.isDestroyed) {
				this.loop(e1);
			}
		});
	}

	private onResize() {
		this.DPR = window.devicePixelRatio;
		this.WIDTH_RATE = 0.425 * this.DPR;
		this.HEIGHT_RATE = 0.515 * this.DPR;
		this.dotDropSpeedBase60 = 0.375 * this.DPR;
		this.num = (this.dom.clientWidth / 10) * this.RATE;
		this.containerWidth = this.dom.clientWidth;
		this.containerHeight = this.dom.clientHeight;
		this.canvas.style.width = this.containerWidth + 'px';
		this.canvas.style.height = this.containerHeight + 'px';
		this.canvas.width = this.containerWidth * this.DPR;
		this.canvas.height = this.containerHeight * this.DPR;
		this.setColor();
		this.setDots();
	}

	private setColor(): void {
		this.color = this.ctx.createLinearGradient(
			this.canvas.width * 0.5,
			this.canvas.height - 160 * this.HEIGHT_RATE,
			this.canvas.width * 0.5,
			this.canvas.height
		);
		switch (this.currentColor) {
			case 'gradient':
				this.color.addColorStop(0, '#00ff00');
				this.color.addColorStop(0.4, '#ff0000');
				this.color.addColorStop(0.6, '#ff0000');
				this.color.addColorStop(1, '#ff00ff');
				break;
			case 'cyan':
				this.color.addColorStop(0, '#00ffff');
				this.color.addColorStop(1, '#00ffff');
				break;
			default:
				break;
		}
		this.ctx.fillStyle = this.color;
	}

	private addResizeListener(): void {
		this.resizeObserver = new ResizeObserverWrap(this.dom, () => {
			setTimeout(() => {
				this.onResize();
			});
		});
	}

	private removeResizeListener(): void {
		this.resizeObserver.unmount();
	}

	private setDots(): void {
		this.dots = [];
		for (let i = 0; i < this.num; i++) {
			this.dots.push({
				cap: 0, // 柱状上面小方块高度参数
				bottom: 10 * this.DPR,
				height: 2 * this.DPR,
			});
		}
	}

	private render(): void {
		if (this.voiceHigh == null || this.canvas == null || this.ctx == null) {
			return;
		}
		let step = Math.round(this.voiceHigh.length / this.num);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.beginPath();
		let rectWidth = 7 * this.WIDTH_RATE;
		for (let i = 1; i < this.num; i++) {
			let value = this.voiceHigh[step * i];
			// if (this.isEffectEnhance) {
			//     value = Math.pow(value, 1.25);
			//     value = value / 3.75;
			// }
			// 绘制矩形条（x, y, width, height）
			let leftX = this.canvas.width * 0.5 - i * 10 * this.WIDTH_RATE;
			let rightX = (i - 1) * 10 * this.WIDTH_RATE + this.canvas.width * 0.5;
			let rectHeight = (-value + 1) * this.HEIGHT_RATE;
			this.ctx.fillRect(
				leftX, this.canvas.height,
				rectWidth, rectHeight
			);
			this.ctx.fillRect(
				rightX, this.canvas.height,
				rectWidth, rectHeight
			);
			// 绘制柱状上面小方块
			if (value == 0 && this.dots[i].cap == 0) {
				continue;
			}
			let dotY = this.canvas.height - this.dots[i].cap;
			this.ctx.fillRect(
				leftX, dotY,
				rectWidth, this.dots[i].height
			);
			this.ctx.fillRect(
				rightX, dotY,
				rectWidth, this.dots[i].height
			);
			let dotDropSpeed = this.dotDropSpeedBase60 * (60 / this.realtimeFps);
			this.dots[i].cap = this.dots[i].cap - dotDropSpeed;
			if (value != 0 && this.dots[i].cap <= -rectHeight + this.dots[i].bottom) {
				this.dots[i].cap = -rectHeight + this.dots[i].bottom;
			}
			// this.ctx.fill();
		}
		// this.ctx.stroke();
	}

	public update(voiceHigh: Uint8Array): void {
		this.voiceHigh = voiceHigh;
	}

	public destroy(): void {
		this.isDestroyed = true;
		this.removeResizeListener();
		this.canvas?.remove();
	}

}
