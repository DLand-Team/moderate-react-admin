"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
const useLocationListen = (
    listener: (location: Location) => void,
    depArr: any[] = []
) => {
    const pathname = usePathname();
    useEffect(() => {
        const handler = () => {
            listener({
                pathname: window.location.pathname,
                search: window.location.search,
                hash: window.location.hash,
            } as any);
        };
        window.addEventListener("popstate", handler);
        window.addEventListener("pushState", handler);
        window.addEventListener("replaceState", handler);
        handler();
        return () => {
            window.removeEventListener("popstate", handler);
            window.removeEventListener("pushState", handler);
            window.removeEventListener("replaceState", handler);
        };
    }, [pathname]);
};

export default useLocationListen;
