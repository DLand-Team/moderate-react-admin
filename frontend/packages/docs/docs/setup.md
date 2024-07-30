---
sidebar_position: 1
---

# 快速开始

## 1. 创建setup文件

启动Redux-eazy的类型支持。

```ts title="setup.ts"
import { Action, ThunkAction, TypedStartListening } from "redux-eazy";
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
```

_（直接拷贝，创建文件即可）_

## 2. 创建一个仓库

核心概念

-   切片-slice：主要负责创建state和提供设置state接口。
-   异步-thunks：负责实现异步操作和或者负责的逻辑处理。
-   监听-watch：仓库间的主要通信手段，无需主动触发，自主监听即可。
-   请求-api：接口请求，该模块与异步-thunks强关联，因为调用api是thunk。
-   模型-model：该仓库所涉及的所有类型数据，统一管理，该策略可以把项目的类型文件数据管理的规规矩矩。

```ts
/* name */
import slice from "./slice";
import thunks from "./thunks";
import watch from "./watch";

const store: {
	slice: typeof slice;
	thunks: typeof thunks;
	watch: typeof watch;
} = {
	slice,
	thunks,
	watch,
};

export default store;
```

-   ### 切片 slice

    规范是先注册一个store的名称，统一管理在names.ts文件中，具体可以看demo

```ts
import { createSliceE, PayloadAction } from "redux-eazy";
import names from "../names";
import { Pagination, QueryApiRes, SliceState } from "./model";

const initialState = (): SliceState => {
	return {
		title: "test",
		dataList: [],
		pagination: {
			pageNum: 1,
			pageSize: 1,
			total: 0,
		},
	};
};

const slice = createSliceE({
	name: names.appStore,
	stateInit: initialState,
	reducers: {
		setTitle(state, { payload }: PayloadAction<Partial<string>>) {
			state.title = payload;
		},
		setPagination(state, { payload }: PayloadAction<Partial<Pagination>>) {
			state.pagination = {
				...state.pagination,
				...payload,
			};
		},
		setDataList(state, action: PayloadAction<QueryApiRes["data"]>) {
			const { list = [], total = 0 } = action.payload ?? {};
			state.dataList = list;
			state.pagination = {
				...state.pagination,
				total,
			};
		},
	},
});

export default slice;
```

-   ### 异步 thunks

```ts
import { dp } from "../..";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import { QueryApiParams } from "./model";

const thunks = createThunks(names.appStore, {
	queryAct: async (arg: QueryApiParams, api) => {
		const { pagination } = api.getState().appStore;
		const { data } = await httpApi.geoQueryApi({ ...arg });
		dp("appStore", "setDataList", data);
	},
});
export default thunks;
```

-   ### 监听 watch

```ts
import { dp, getActionType } from "../..";
import { startAppListening } from "../../setup";

const watch = () => {
	startAppListening({
		type: getActionType("appStore").setPagination,
		effect: async () => {
			dp("appStore", "queryAct");
		},
	});
};

export default watch;
```

-   ### 请求 api

```ts
import { QueryApiParams, QueryApiRes } from "./model";

const api = {
	geoQueryApi(params: QueryApiParams) {
		return Promise.resolve<QueryApiRes>({
			data: {
				list: [{ id: 1, title: "item1" }],
				total: 100,
			},
		});
	},
};

export default api;
```

-   ### 模型 model

```ts
/**
 * 仓库的状态集合
 */
export interface SliceState {
	dataList: DataItem[];
	pagination: Pagination;
}

/**
 * 翻页信息
 */
export interface Pagination {
	pageNum: number;
	pageSize: number;
	total: number;
}

/**
 * 个体类型
 */
export interface DataItem {
	id: number;
	title: string;
}

/**
 * QueryApi-请求参数
 */
export type QueryApiParams = Partial<Pagination>;

/**
 * QueryApi-返回参数
 */
export interface QueryApiRes {
	data: DataItem[];
}
```

## 3. 装载仓库Provider

通过Provider，将仓库注入到整个项目中，供全局使用。

```ts
import "./setup";
import { reduxStore } from ".";
import { Provider } from "redux-eazy";

const ServiceProvider = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};

export default ServiceProvider;
```

## 4. 实现核心hook和工具函数

基于启动类型支持和装载仓库之后，装载具有完备ts提示的核心功能。

```ts
import {
	createStoreE,
	flatInjectHookCreater,
	getActionTypeCreater,
	getDp,
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
// type Ov = Parameters<
// 	ReturnType<typeof flatInjectHookCreater<typeof stores, typeof reduxStore>>
// >;
export const useFlat = flatInjectHookCreater(stores, reduxStore);
/* utils */
export const dp = getDp(reduxStore, stores);
```

## 5. 使用状态

-   ### 组件内使用

```ts
import { useFlat } from "./service";

function App() {
	const { title, setTitle } = useFlat("appStore");
	return (
		<div>
			<div
				onClick={() => {
					setTitle(Date.now().toString());
				}}
			></div>
			{title}
		</div>
	);
}

export default App;
```

-   ### 非组件使用

```ts
// 取
reduxStore.getState().appStore.title;
// 设置
dp("appStore", "setTitle", Date.now().toString());
```

_以上写法同样适用于组件内，唯一区别就是，通过reduxStore获取到的state是不具备变化时刷新组件的功能的。_
