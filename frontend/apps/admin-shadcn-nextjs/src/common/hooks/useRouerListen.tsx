"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type Listener = (params: {
  pathname: string;
  searchParams: URLSearchParams;
  url: string;
}) => void;

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
      window.location.pathname + window.location.search + window.location.hash;

    // 避免首次渲染或重复触发
    if (lastUrlRef.current !== url) {
      listener({
        pathname,
        searchParams,
        url,
      });
      lastUrlRef.current = url;
    }
  }, [pathname, searchParams, listener]);
}
