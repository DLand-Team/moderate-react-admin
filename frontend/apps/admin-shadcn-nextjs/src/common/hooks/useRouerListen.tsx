"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type Listener = (url: string) => void;

/**
 * 监听 Next.js App Router 的路由变化
 * @param listener 回调，参数为新的完整 url（pathname + search）
 */
export function useAppRouterListener(listener: Listener) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const lastUrlRef = useRef("");

	useEffect(() => {
		const url =
			searchParams && searchParams.toString()
				? `${pathname}?${searchParams.toString()}`
				: pathname;

		// 避免首次渲染或重复触发
		if (lastUrlRef.current !== url) {
			listener(url);
			lastUrlRef.current = url;
		}
	}, [pathname, searchParams, listener]);
}
