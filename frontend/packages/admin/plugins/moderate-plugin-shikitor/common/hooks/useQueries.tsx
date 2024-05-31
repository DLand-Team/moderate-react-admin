import type { MutableRefObject } from "react";
import { useContext, useEffect } from "react";
import React from "react";
import { createContext, useCallback, useRef, useState } from "react";

const QueriesContext = createContext<{
	searchRef: MutableRefObject<URLSearchParams>;
	value: Record<string, string>;
	set: (key: string, value: string) => void;
	del: (key: string) => void;
} | null>(null);

export function QueriesProvider({ children }: { children: React.ReactNode }) {
	const searchRef = useRef(new URLSearchParams(location.search));
	const [value, setValue] = useState(() => {
		const entries = searchRef.current.entries();
		const result: Record<string, string> = {};
		for (const [key, value] of entries) {
			result[key] = value;
		}
		return result as Record<string, string>;
	});
	const set = useCallback((key: string, value: string) => {
		searchRef.current.set(key as string, value);
		history.pushState(null, "", `?${searchRef.current}${location.hash}`);
		setValue((queries) => ({ ...queries, [key]: value }));
	}, []);
	const del = useCallback((key: string) => {
		searchRef.current.delete(key as string);
		history.pushState(null, "", `?${searchRef.current}${location.hash}`);
		setValue((queries) => {
			const { [key]: _, ...rest } = queries;
			return rest;
		});
	}, []);
	useEffect(() => {
		function listener() {
			const search = new URLSearchParams(location.search);
			const entries = search.entries();
			const result: Record<string, string> = {};
			for (const [key, value] of entries) {
				result[key] = value;
			}
			searchRef.current = search;
			setValue(result as Record<string, string>);
		}
		window.addEventListener("popstate", listener);
		return () => {
			window.removeEventListener("popstate", listener);
		};
	});
	return (
		<QueriesContext.Provider value={{ searchRef, value, set, del }}>
			{children}
		</QueriesContext.Provider>
	);
}

export const useQueries = <T extends Record<string, string>>() =>
	useContext(QueriesContext) as {
		searchRef: MutableRefObject<URLSearchParams>;
		value: T;
		set: (key: keyof T, value: string) => void;
		del: (key: keyof T) => void;
	};
