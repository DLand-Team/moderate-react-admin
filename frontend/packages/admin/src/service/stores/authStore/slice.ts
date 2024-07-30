import { PayloadAction } from "redux-eazy";
import storageHelper from "src/common/utils/storageHelper";
import { ROUTE_CONFIG_MAP, ROUTE_ID_KEY } from "src/router";
import { createSlice } from "src/service";
import {
    DemoData,
    MenuPermissionItem,
    RefreshTokenRes,
    StoreState,
} from "./model";

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
        demoData: null,
        userId: "",
    };
};

const slice = createSlice({
    name: "authStore",
    stateInit: initialState,
    reducers: {
        setUserid(state, { payload }: PayloadAction<string>) {
            state.userId = payload;
        },
        setToken(state, { payload }: PayloadAction<RefreshTokenRes>) {
            const { accessToken, refreshToken } = payload;
            state.token = payload.accessToken;
            storageHelper.setItem("REFRESH_TOKEN", refreshToken);
            storageHelper.setItem("ACCESS_TOKEN", accessToken);
            storageHelper.setItem("IS_ADMIN", accessToken);
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
            }>
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
        setDemoData(state, { payload }: PayloadAction<Partial<DemoData>>) {
            state.demoData = { ...state.demoData, ...payload } as DemoData;
        },
    },
});

export default slice;
