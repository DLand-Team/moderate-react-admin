import { ROUTE_ID_KEY } from "src/router/types";

export const UUID = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			var r = (Math.random() * 16) | 0,
				v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		},
	);
};

export function enumToObject<T extends Record<keyof T, number | string>>(
	enumObj: T,
): { [K in keyof T]: ROUTE_ID_KEY } {
	const obj = {} as { [K in keyof T]: T[K] };
	for (const key in enumObj) {
		let keyStr = enumObj[key];
		if (typeof keyStr !== "number") {
			//@ts-ignore
			obj[keyStr] = enumObj[key];
		}
	}
	return obj as any;
}

// 冒泡排序
export function bubbleSort<T>(arr: T[], callF: (a: T, b: T) => boolean) {
	if (arr.length <= 1) {
		return arr;
	}
	for (var i = 0; i < arr.length; i++) {
		var flag = false;
		for (var j = 0; j < arr.length - i - 1; j++) {
			if (callF(arr[j], arr[j + 1])) {
				var temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				flag = true;
			}
		}
		if (!flag) {
			break;
		}
	}
	return arr;
}

export const normalizeNum = (value: any) => {
	let temp = Number(value) || value;
	return temp;
};

export function includeOne(targetArr: any[], fliterArr: any[]) {
	const found = fliterArr.some((item) => {
		return targetArr.includes(item);
	});
	return found;
}

export const upFirstcharacter = (str: string) => {
	return str.replace(/^\S/, (s) => s.toUpperCase());
};

export function getTextWidth(str: string, fontSize: string) {
	let result = 10;

	let ele = document.createElement("span");
	//字符串中带有换行符时，会被自动转换成<br/>标签，若需要考虑这种情况，可以替换成空格，以获取正确的宽度
	//str = str.replace(/\\n/g,' ').replace(/\\r/g,' ');
	ele.innerText = str;
	//不同的大小和不同的字体都会导致渲染出来的字符串宽度变化，可以传入尽可能完备的样式信息
	ele.style.fontSize = fontSize;

	//由于父节点的样式会影响子节点，这里可按需添加到指定节点上
	document.documentElement.append(ele);

	result = ele.offsetWidth;

	document.documentElement.removeChild(ele);
	return result;
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
