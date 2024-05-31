import { PayloadAction, createSliceCustom } from "redux-eazy";
import storageHelper from "src/common/utils/storageHelper";
import names from "../names";
import { MenuPermissionItem, StoreState } from "./model";
import { ROUTE_CONFIG_MAP } from "src/router/routesConfig";
import { ROUTE_ID_KEY } from "src/router/types";
import thunks from "./thunks";
import { dp } from "src/service";

const initialState = (): StoreState => {
	const defaultPermissions = Object.values(ROUTE_CONFIG_MAP)
		.filter((item) => {
			return item.isNoAuth;
		})
		.map((item) => {
			return item.id!;
		});
	return {
		userName: "",
		token: storageHelper.getItem("ACCESS_TOKEN") || "",
		isAdmin: storageHelper.getItem("IS_ADMIN") || false,
		qiniuToken: "",
		permissions: defaultPermissions!,
		routesPermissions: defaultPermissions,
		menuPermissions: null,
		locale: "zh", //中英文
		btnCon: storageHelper.getItem("BTN_CON") || "点击获取验证码",
		btnTime: storageHelper.getItem("BTN_TIME") || 60,
		imgUrl: "", //滑块验证码==图片地址
		captcha: "", //滑块验证码===滑动完成标志
		codeImg: "",
		captchaVerification: "",
	};
};

const slice = createSliceCustom({
	name: names.authStore,
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
		// 设置后端传过来的原始权限数据
		setPermissions(
			state,
			{
				payload,
			}: PayloadAction<{
				menuPermissions: MenuPermissionItem;
				permissions: ROUTE_ID_KEY[];
				routesPermissions: string[];
			}>,
		) {
			// 菜单权限
			state.menuPermissions = payload.menuPermissions;
			// 路由权限
			state.routesPermissions = payload.routesPermissions;
			// 按钮权限
			state.permissions = payload.permissions;
		},
		// 设置路由权限数据
		setRoutesPermissions(state, { payload }: PayloadAction<string[]>) {
			state.routesPermissions = [...state.routesPermissions, ...payload];
		},
		//设置中英文
		setLocale(state, { payload }: PayloadAction<string>) {
			state.locale = payload;
		},
		//设置获取验证码按钮显示内容
		setBtnCon(state, { payload }: PayloadAction<string>) {
			state.btnCon = payload;
			storageHelper.setItem("BTN_CON", payload);
		},
		// 设置获取验证码倒计时时间
		setBtnTime(state, { payload }: PayloadAction<number>) {
			state.btnTime = payload;
			storageHelper.setItem("BTN_TIME", payload);
		},
		//设置获取验证码图片地址
		setImageUrl(state, { payload }: PayloadAction<string>) {
			state.imgUrl = payload;
		},
		//设置图片滑块拼接完成的标志Captcha
		setCaptcha(state, { payload }: PayloadAction<string>) {
			state.captcha = payload;
		},
		setCodeImg(state, { payload }: PayloadAction<string>) {
			state.codeImg = payload;
		},
		// 设置验证码
		setCaptchaVerification(state, { payload }: PayloadAction<string>) {
			state.captchaVerification = payload;
		},
	},
});

export default slice;
