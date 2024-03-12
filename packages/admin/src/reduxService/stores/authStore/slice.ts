import { ROUTE_INFO_CONFIG } from "@/config/routerConfig";
import { PayloadAction, createSliceCustom } from "redux-eazy";
import names from "../names";
import { StoreState } from "./model";
import storageHelper from "@/common/utils/storageHelper";

const initialState = (): StoreState => {
	const defaultPermissions = Object.values(ROUTE_INFO_CONFIG)
		.filter((item) => {
			return item.isMustShow;
		})
		.map((item) => {
			return item.id;
		});
	return {
		userName: "",
		token: storageHelper.getItem("ACCESS_TOKEN") || "",
		isAdmin: storageHelper.getItem("IS_ADMIN") || false,
		qiniuToken: "",
		permissions: defaultPermissions,
	};
};

const slice = createSliceCustom({
	name: names.appStore,
	stateInit: initialState,
	reducers: {
		setUserInfo(
			state,
			{
				payload,
			}: PayloadAction<
				Pick<StoreState, "token" | "isAdmin" | "userName">
			>,
		) {
			return {
				...state,
				...payload,
			};
		},
		updatePermissions(state, { payload }: PayloadAction<any>) {
			return {
				...state,
				...payload,
			};
		},
	},
});

export default slice;
