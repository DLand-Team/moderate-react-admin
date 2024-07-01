import { MusicEffect } from "../music.effect";
import { ResizeObserverWrap } from "../../ext/resize-observer.wrap";

export class Music2Effect implements MusicEffect {
	private containerWidth = 0;
	private containerHeight = 0;
	private DPR = window.devicePixelRatio;
	private resizeObserver!: ResizeObserverWrap;
	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;
	private color!: CanvasGradient;

	private rate: number = 5;
	private all: number = 180;
	private du: number = 2; // 角度
	private r: number = 0; // 半径
	private r_base: number = 175; // 半径基准
	private w: number = 2; // 宽（线条的粗细）
	private voiceHigh?: Uint8Array;

	//@ts-ignore
	private isDestroyed = false;

	constructor(private dom: HTMLDivElement) {
		this.containerWidth = dom.clientWidth;
		this.containerHeight = dom.clientHeight;
		this.init();
	}

	private init(): void {
		this.canvas = document.createElement("canvas");
		this.canvas.style.position = "relative";
		this.canvas.style.pointerEvents = "none";
		this.canvas.style.width = this.containerWidth + "px";
		this.canvas.style.height = this.containerHeight + "px";
		this.canvas.style.bottom = "0";
		this.canvas.style.left = "0";
		this.dom.appendChild(this.canvas);
		this.addResizeListener();
		this.ctx = this.canvas.getContext("2d")!;
		if (this.canvas != null && this.ctx != null) {
			this.onResize();
			this.setColor();
		}
	}

	private onResize() {
		this.DPR = window.devicePixelRatio;
		this.containerWidth = this.dom.clientWidth;
		this.containerHeight = this.dom.clientHeight;
		this.canvas.style.width = this.containerWidth + "px";
		this.canvas.style.height = this.containerHeight + "px";
		this.canvas.width = this.containerWidth * this.DPR;
		this.canvas.height = this.containerHeight * this.DPR;
		if (this.canvas.width < this.canvas.height) {
			this.r = (this.canvas.width / 2) * 0.725;
		} else {
			this.r = (this.canvas.height / 2) * 0.725;
		}
		this.w = 2 * this.DPR;
		this.setColor();
		if (this.voiceHigh != null) {
			this.update(this.voiceHigh);
		}
	}

	private setColor(): void {
		let oW = this.canvas.width;
		let oH = this.canvas.height;
		this.color = this.ctx.createLinearGradient(
			oW / 2,
			oH / 2 - 10,
			oW / 2,
			oH / 2 - 150,
		);
		this.color.addColorStop(0, "#1E90FF");
		this.color.addColorStop(0.25, "#FF7F50");
		this.color.addColorStop(0.5, "#8A2BE2");
		this.color.addColorStop(0.75, "#4169E1");
		this.color.addColorStop(1, "#00FFFF");
		this.ctx.strokeStyle = this.color;
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

	public update(voiceHigh: Uint8Array): void {
		this.voiceHigh = voiceHigh;
		if (this.voiceHigh == null || this.canvas == null || this.ctx == null) {
			return;
		}
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.beginPath();
		this.ctx.lineWidth = this.w;
		for (let i = 0; i < this.all; i++) {
			let v = voiceHigh[i];
			let r = this.rate;
			v = Math.pow(v, 1.8);
			r = r * 55;
			let value = v / r;
			value = (value * (this.r / this.DPR)) / this.r_base;
			value = value * this.DPR;
			let rv1 = this.r - value;
			let rv2 = this.r + value;
			this.ctx.moveTo(
				Math.sin(((i * this.du) / 180) * Math.PI) * rv1 +
					this.canvas.width / 2,
				-Math.cos(((i * this.du) / 180) * Math.PI) * rv1 +
					this.canvas.height / 2,
			);
			this.ctx.lineTo(
				Math.sin(((i * this.du) / 180) * Math.PI) * rv2 +
					this.canvas.width / 2,
				-Math.cos(((i * this.du) / 180) * Math.PI) * rv2 +
					this.canvas.height / 2,
			);
		}
		this.ctx.stroke();
	}

	public destroy(): void {
		this.isDestroyed = true;
		this.removeResizeListener();
		this.canvas?.remove();
	}
}
