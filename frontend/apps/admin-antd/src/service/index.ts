import {
	createStoreE,
	flatInjectHookCreater,
	getActionTypeCreater,
	getDp,
	getDpChain,
	resetReduxHookCreater,
} from "redux-eazy";
import {
	appHelper,
	routerHelper,
	authHelper,
	devHelper,
} from "./setup";
import { stores } from "./stores";
import { type ReduxState } from "./setup";

declare global {
	interface Window {
		reduxStore: ReturnType<typeof createStoreE<typeof stores>>;
	}
}
// 前置基本
export const getActionType = getActionTypeCreater(stores);

export const reduxStore =
	window.reduxStore ||
	createStoreE(stores, {
		middleware: {
			isLogger: false,
		},
	});
window.reduxStore = reduxStore;

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

appHelper.injectServiceManager(serviceManager);
routerHelper.injectServiceManager(serviceManager);
authHelper.injectServiceManager(serviceManager);
devHelper.injectServiceManager(serviceManager);
