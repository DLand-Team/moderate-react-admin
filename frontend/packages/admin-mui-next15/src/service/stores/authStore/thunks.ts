import storageHelper from "@/common/utils/storageHelper";
import { createThunks, dpChain } from "@/service";
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
