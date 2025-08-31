"use client";
import {
	createStoreE,
	flatInjectHookCreater,
	getActionTypeCreater,
	getDp,
	getDpChain,
	resetReduxHookCreater,
} from "redux-eazy";
import { helperManager, type ReduxState } from "./setup";
import { stores } from "./stores";

// nextjs动态加载dys，no ssr

declare global {
	interface Window {
		reduxStore: ReturnType<typeof createStoreE<typeof stores>>;
	}
}

// 前置基本
export const getActionType = getActionTypeCreater(stores);

// 这么写主要目的就是防止热更新重复创建store，导致开发过程中状态库反复重置
// 线上生产不会有这个问题，本质是nextjs的热更新导致的
export const reduxStore =
	typeof window !== "undefined"
		? window.reduxStore ||
		  createStoreE(stores, {
				middleware: {
					isLogger: false,
				},
		  })
		: createStoreE(stores, {
				middleware: {
					isLogger: false,
				},
		  });

if (typeof window !== "undefined") {
	window.reduxStore = reduxStore;
}

// 后置
/* Hooks */
export const useResetRedux = resetReduxHookCreater(stores);
export const useFlat = flatInjectHookCreater(stores, reduxStore);
/* utils */
export const dp = getDp(reduxStore, stores);
export const dpChain = getDpChain(reduxStore, stores);

export const getStore = <
	T extends keyof typeof stores | [keyof typeof stores, string | undefined]
>(
	storeName: T
): ReduxState[T extends keyof typeof stores ? T : T[0]] => {
	if (Array.isArray(storeName)) {
		if (
			storeName[1] &&
			stores[storeName[0]].slice.branch?.includes(storeName[1])
		) {
			return reduxStore.getState()[
				`${storeName[0]}.${storeName[1]}` as T extends keyof typeof stores
					? T
					: T[0]
			];
		} else {
			const c = reduxStore.getState()[storeName[0]];
			return c as ReduxState[T extends keyof typeof stores ? T : T[0]];
		}
	} else {
		return reduxStore.getState()[
			storeName as T extends keyof typeof stores ? T : T[0]
		];
	}
};
export * from "./setup";

export const serviceManager = {
	dpChain,
	reduxStore,
	dp,
	getStore,
};

export type ServiceManagerType = typeof serviceManager;

// 依赖注入serviceManager
Object.values(helperManager).forEach((helperItem: any) => {
	helperItem.injectServiceManager(serviceManager);
});
