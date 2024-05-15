import { MusicEffect } from "../music.effect";
import { ResizeObserverWrap } from "../../ext/resize-observer.wrap";

let DPR: number = window.devicePixelRatio;
let nozokuRate: number = 3.5;

export class Music3Effect implements MusicEffect {
	public isDestroyed = false;
	private containerWidth = 0;
	private containerHeight = 0;
	private resizeObserver!: ResizeObserverWrap;
	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;

	private rt_width = 12;
	private rt_height = 5;
	private rt_length = 0;
	private rt_add_length = 1;
	private rt_array: Array<RetAngle> = [];
	private voiceHigh?: Uint8Array;

	private sliderType: 1 | 2 | 3 = 1; // 1无滑块，2半高滑块，3全高滑块

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
		}
	}

	private onResize() {
		DPR = window.devicePixelRatio;
		this.containerWidth = this.dom.clientWidth;
		this.containerHeight = this.dom.clientHeight;
		this.canvas.style.width = this.containerWidth + "px";
		this.canvas.style.height = this.containerHeight + "px";
		this.canvas.width = this.containerWidth * DPR;
		this.canvas.height = this.containerHeight * DPR;
		if (this.containerHeight >= 200) {
			nozokuRate = 3.5;
		} else if (this.containerHeight >= 170 && this.containerHeight < 200) {
			nozokuRate = 4;
		} else {
			nozokuRate = 5;
		}
		this.ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
		this.rtResizeOrGenerate();
	}

	private rtResizeOrGenerate(): void {
		let aw = (this.rt_width + 3) * DPR;
		let len = Math.floor(this.canvas.width / 2 / aw) + this.rt_add_length;
		if (len == this.rt_length) {
			for (let i = 0; i < this.rt_array.length; i++) {
				this.rt_array[i].resize();
			}
		} else {
			this.rt_array = [];
			this.rt_length = len;
			for (let i = 0; i < this.rt_length; i++) {
				this.rt_array.push(
					new RetAngle(
						this.canvas,
						this.sliderType,
						i,
						this.rt_width * DPR, // width
						this.rt_height * DPR, // height
						i * aw, // x
						this.canvas.height / 2, // y
					),
				);
			}
		}
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
		let step = Math.round(this.voiceHigh.length / this.rt_length);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let i = 0; i < this.rt_length; i++) {
			this.rt_array[i].update(this.voiceHigh[step * i]);
		}
	}

	public destroy(): void {
		this.isDestroyed = true;
		this.removeResizeListener();
		this.canvas?.remove();
	}
}

class RetAngle {
	private ctx: CanvasRenderingContext2D;
	jh: number = 2 * DPR;
	jd: number = 1 * DPR;
	power: number = 0;
	num: number = 0;
	dy: number = this.y;
	// lastDPR: number = CommonUtil.cloneDeep<number>(DPR);
	// lastNozokuRate: number = CommonUtil.cloneDeep<number>(nozokuRate);
	lastDPR: number = DPR;
	lastNozokuRate: number = nozokuRate;

	constructor(
		private canvas: HTMLCanvasElement,
		private sliderType: 1 | 2 | 3,
		public index: number,
		public w: number,
		public h: number,
		public x: number,
		public y: number,
	) {
		this.ctx = this.canvas.getContext("2d")!;
	}

	resize(): void {
		this.jh = 2 * DPR;
		this.jd = 1 * DPR;
		this.w = DPR * (this.w / this.lastDPR);
		this.h = DPR * (this.h / this.lastDPR);
		this.x = DPR * (this.x / this.lastDPR);
		this.y = this.canvas.height / 2;
		this.power = DPR * ((this.power * this.lastNozokuRate) / this.lastDPR);
		// this.lastDPR = CommonUtil.cloneDeep<number>(DPR);
		this.lastDPR = DPR;
	}

	update(power: number): void {
		this.power = (power * DPR) / nozokuRate;
		this.num = ~~(this.power / this.h + 0.5 * DPR);
		// 更新小红块的位置，如果音频条长度高于红块位置，则红块位置则为音频条高度，否则让小红块下降
		if (this.sliderType == 2 || this.sliderType == 3) {
			let nh = this.dy + this.h; // 小红块当前位置
			if (this.power >= this.y - nh) {
				this.dy =
					this.y - this.power - this.h - (this.power == 0 ? 0 : 1);
			} else if (nh > this.y) {
				this.dy = this.y - this.h;
			} else {
				this.dy += 1 * DPR;
			}
		}
		this.draw();
	}

	draw(): void {
		let h = ~~(this.power / (this.h + this.jh)) * (this.h + this.jh);
		let rightX = this.canvas.width / 2 + this.x - this.w / 2;
		let leftX = this.canvas.width / 2 - this.x - this.w / 2;
		// 右上
		this.ctx.fillRect(~~rightX, ~~(this.y - h), ~~this.w, ~~h);
		for (let i = 0; i < this.num; i++) {
			let y = this.y - i * (this.h + this.jh);
			this.ctx.clearRect(
				~~(rightX - this.jd),
				~~(y - this.jd),
				~~(this.w + 2 * this.jd),
				~~this.jh,
			);
		}
		// 左上
		this.ctx.fillRect(~~leftX, ~~(this.y - h), ~~this.w, ~~h);
		for (let i = 0; i < this.num; i++) {
			let y = this.y - i * (this.h + this.jh);
			this.ctx.clearRect(
				~~(leftX - this.jd),
				~~(y - this.jd),
				~~(this.w + 2 * this.jd),
				~~this.jh,
			);
		}
		// 右下
		this.ctx.fillRect(
			~~rightX,
			~~(this.canvas.height - this.y),
			~~this.w,
			~~h,
		);
		for (let i = 0; i < this.num; i++) {
			let y = this.y - i * (this.h + this.jh);
			this.ctx.clearRect(
				~~(rightX - this.jd),
				~~(this.canvas.height - (y + this.jd)),
				~~(this.w + 2 * this.jd),
				~~this.jh,
			);
		}
		// 左下
		this.ctx.fillRect(
			~~leftX,
			~~(this.canvas.height - this.y),
			~~this.w,
			~~h,
		);
		for (let i = 0; i < this.num; i++) {
			let y = this.y - i * (this.h + this.jh);
			this.ctx.clearRect(
				~~(leftX - this.jd),
				~~(this.canvas.height - (y + this.jd)),
				~~(this.w + 2 * this.jd),
				~~this.jh,
			);
		}
		// ----------------------------
		if (this.sliderType == 2 || this.sliderType == 3) {
			let sh = 0;
			switch (this.sliderType) {
				case 2:
					sh = this.h / 2;
					break;
				case 3:
					sh = this.h;
					break;
				default:
					break;
			}
			// 右上
			if (this.index != 0) {
				this.ctx.fillRect(
					~~rightX,
					~~(this.dy + this.h - sh - this.jh / 2),
					~~this.w,
					~~sh,
				);
			}
			// 左上
			this.ctx.fillRect(
				~~leftX,
				~~(this.dy + this.h - sh - this.jh / 2),
				~~this.w,
				~~sh,
			);
			// 右下
			if (this.index != 0) {
				this.ctx.fillRect(
					~~rightX,
					~~(this.canvas.height - this.dy - this.h + this.jh / 2),
					~~this.w,
					~~sh,
				);
			}
			// 左下
			this.ctx.fillRect(
				~~leftX,
				~~(this.canvas.height - this.dy - this.h + this.jh / 2),
				~~this.w,
				~~sh,
			);
		}
	}
}
