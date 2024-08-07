import storageHelper from "src/common/utils/storageHelper";
import { authHelper, createThunks, dpChain } from "src/service";
import httpApi from "./api";
import { GetUserInfoParams, LoginApiParams } from "./model";

const thunks = createThunks("authStore", {
    loginAct: async (arg: LoginApiParams) => {
        // 第一步：登录获取token，并存储
        const { data } = await httpApi.loginApi(arg);
        // 第二步：根据token获取权限，并存储
        const { userId } = data;
        userId && dpChain("authStore").setUserid(userId);
        dpChain("authStore").setToken(data);
        await httpApi.createCpdSortItemDefaultApi();
    },
    async refreshTokenAct() {
        const { data } = await httpApi.refreshToken();
        storageHelper.setItem("REFRESH_TOKEN", data.refreshToken);
        dpChain("authStore").setToken(data);
        return data.refreshToken;
    },
    getUserPermissionsAct: async () => {
        const {
            data: { permissions, menus },
        } = await httpApi.fetchUserPermissions();

        const menuPermissions = menus.find((item) => {
            return item.path.toLowerCase() == "/userCenter".toLowerCase();
        });
        menuPermissions && authHelper.transformPermissionLoop(menuPermissions);
        // 需要根据后端的menu权限跟前端的权限结合，生成一个权限数据
        // 生成一个路由数据权限
        const { routesPermissions } =
            // 转换一下，因为RUYI后端穿过来的菜单对应的组件名，存在需要转换的地方
            authHelper.createRoutesPermissionsByMenu(menuPermissions!);
        menuPermissions &&
            dpChain("authStore").setPermissions({
                menuPermissions,
                permissions,
                routesPermissions,
            });
    },
    updatePermissionsAct: async () => {},
    getImageUrlAct: async () => {
        const { data } = await httpApi.getImageUrlApi();
        dpChain("authStore").setImageUrl(data.url);
    },
    getCaptchaAct: async () => {
        const { data } = await httpApi.getCaptchaApi();
        dpChain("authStore").setCaptcha(data.captcha);
    },
    getLoginCodeAct: async (arg: any) => {
        const { data } = await httpApi.getLoginCodeApi(arg);
        dpChain("authStore").setCodeImg(data);
    },
    async getUserinfoAct(arg: GetUserInfoParams) {
        const { data } = await httpApi.getUserInfoApi(arg);
        return data;
    },
    async getExtraUserinfoAct(arg: GetUserInfoParams) {
        const { data } = await httpApi.getDeptInfoApi(arg);
        const { carrier } = data;
        dpChain("authStore").setDemoData({
            officeType: carrier,
        });
    },
    async getInfraConfigAct() {
        const { data } = await httpApi.getInfraConfigApi();
        const { value } = data;
        const [url, sname, spswd] = value.split("@@");

        dpChain("authStore").setDemoData({
            url,
            sname,
            spswd,
            userType: "airline",
        });
    },
});
export default thunks;
