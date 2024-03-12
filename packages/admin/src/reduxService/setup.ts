import { Action, ThunkAction, TypedStartListening } from "@reduxjs/toolkit";
import {
	appSelectorHookCreater,
	getCreateThunkWithName,
	getCreateThunks,
	listenerMiddleware,
	useReduxDispatch,
} from "redux-eazy";
import { reduxStore } from "./index";
/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
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
