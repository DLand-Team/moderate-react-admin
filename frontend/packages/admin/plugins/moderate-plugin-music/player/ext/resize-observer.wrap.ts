export class ResizeObserverWrap {

	private readonly observer: ResizeObserver;
	private readonly dom: Element;

	constructor(dom: Element, callback: (e: Element) => void) {
		this.dom = dom;
		this.observer = new ResizeObserver((entries) => {
			if (!Array.isArray(entries) || !entries.length) {
				return;
			}
			for (let entry of entries) {
				callback(entry.target);
			}
		});
		this.observer.observe(this.dom);
	}

	public unmount(): void {
		this.observer.unobserve(this.dom);
	}

}
