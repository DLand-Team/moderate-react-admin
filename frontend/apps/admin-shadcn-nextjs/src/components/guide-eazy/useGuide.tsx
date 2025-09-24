import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect, useState } from "react";
import driverPro from "./driver";
import { GuideApi } from "./guideCoreProvider";

export type GuideProps<T extends string = any> = Parameters<
	typeof driverPro<T>
>[0];
export type GuideIns = ReturnType<typeof driver>;
export function useGuide<T extends string = any>(
	props: GuideProps<T>,
	api: GuideApi
) {
	const [ins, setIns] = useState<GuideIns>();

	useEffect(() => {
		const _ins = driverPro(props, api);
		setIns(_ins);
	}, []);

	return ins;
}
