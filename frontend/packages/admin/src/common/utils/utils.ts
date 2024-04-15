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
