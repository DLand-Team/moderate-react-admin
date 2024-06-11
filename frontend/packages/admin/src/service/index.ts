import {
	createStoreE,
	flatInjectHookCreater,
	getActionTypeCreater,
	getDp,
	getDpChain,
	resetReduxHookCreater,
} from "redux-eazy";
import { stores } from "./stores";
declare global {
	interface Window {
		reduxStore: ReturnType<typeof createStoreE<typeof stores>>;
	}
}
// 前置基本
export const getActionType = getActionTypeCreater(stores);

export const reduxStore = window.reduxStore || createStoreE(stores);
window.reduxStore = reduxStore;
// 后置
/* Hooks */
export const useResetRedux = resetReduxHookCreater(stores);
export const useFlat = flatInjectHookCreater(stores, reduxStore);
/* utils */
export const dp = getDp(reduxStore, stores);
export const dpChain = getDpChain(reduxStore, stores);
export * from "./helper";
