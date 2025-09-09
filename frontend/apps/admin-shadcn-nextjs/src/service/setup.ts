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
import { dpChain, getActionType, reduxStore } from "./index";
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
      get(target, prop: any) {
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
    },
  );
  return proxiedObj;
}) as any;

export const emitAsync: typeof dpChain = ((name: any) => {
  const proxiedObj = new Proxy(
    {},
    {
      get(target, prop: any) {
        return (data: any) => {
          return import("./index").then((m) => {
            dpChainIns = m.dpChain;
            // 调用 dpChain 的对应方法，并传入参数
            return m.dpChain(name)[prop](data);
          });
        };
      },
    },
  );
  return proxiedObj;
}) as any;

//@ts-ignore
let getActionTypeProIns = undefined;
export const getActionTypePro: typeof getActionType = ((name: any) => {
  const proxiedObj = new Proxy(
    {},
    {
      get(target, prop: any) {
        //@ts-ignore
        if (getActionTypeProIns) {
          return getActionTypeProIns(name);
        }
        return import("./index").then((m) => {
          getActionTypeProIns = m.getActionType;
          // 调用 dpChain 的对应方法，并传入参数
          return m.getActionType(name);
        });
      },
    },
  );
  return proxiedObj;
}) as any;

export const getTypesAsync = new Proxy(getActionTypePro, {
  apply: async function (target, thisArg, argumentsList) {
    const [moduleName] = argumentsList;
    let test = await target(moduleName).a;
    return test;
  },
});
