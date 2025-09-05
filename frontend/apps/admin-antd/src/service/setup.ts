export * from "./helpers";
import {
	Action,
	ThunkAction,
	TypedStartListening,
	appSelectorHookCreater,
	createSliceCreater,
	getCreateThunkWithName,
	getCreateThunks,
	listenerMiddleware,
	useReduxDispatch,
} from "redux-eazy";
import type { dpChain, reduxStore } from "./index";
export type ReduxState = ReturnType<typeof reduxStore.getState>;
/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
	ReturnType,
	ReduxState,
	unknown,
	Action
>;
export const createThunkWithName = getCreateThunkWithName<
	ReduxState,
	ReduxDispatch
>;
export const useDispatch = useReduxDispatch<ReduxDispatch>;
export const useAppSelecter = appSelectorHookCreater<ReduxState>;
export type AppStartListening = TypedStartListening<ReduxState, ReduxDispatch>;
export const startAppListening =
	listenerMiddleware.startListening as AppStartListening;
export const createThunks = getCreateThunks<ReduxState, ReduxDispatch>();
export const createSlice = createSliceCreater<keyof ReduxState>();
//@ts-ignore
let dpChainIns = undefined;
export const emit: typeof dpChain = ((name: any) => {
	const proxiedObj = new Proxy(
		{},
		{
			get(_, prop: any) {
				return (data: any) => {
					//@ts-ignore
					if (dpChainIns) {
						return dpChainIns(name)[prop](data);
					}
					return import("./index").then((m) => {
						dpChainIns = m.dpChain;
						// 调用 dpChain 的对应方法，并传入参数
						return m.dpChain(name)[prop](data);
					});
				};
			},
		}
	);
	return proxiedObj;
}) as any;

// 每次都异步，目前场景仅仅是在extraReducers中调用另一个store的thunk用到，其余场景一律用emit或者dpChain
// emit 是针对nextjs的改良版本
// dpChain 是针对传统react的改良版本
export const emitAsync: typeof dpChain = ((name: any) => {
	const proxiedObj = new Proxy(
		{},
		{
			get(_, prop: any) {
				return (data: any) => {
					return import("./index").then((m) => {
						dpChainIns = m.dpChain;
						// 调用 dpChain 的对应方法，并传入参数
						return m.dpChain(name)[prop](data);
					});
				};
			},
		}
	);
	return proxiedObj;
}) as any;
