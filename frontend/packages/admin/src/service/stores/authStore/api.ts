import { http } from "src/common/http";
import storageHelper from "src/common/utils/storageHelper";
import { dpChain } from "src/service";
import {
    GetUserInfoParams,
    LoginApiParams,
    MenuPermissionItem,
    RefreshTokenRes,
} from "./model";

const baseUrl = "/admin-api/system";

const api = {
    refreshToken() {
        return http.request<{
            refreshToken: string;
            accessToken: string;
        }>({
            url:
                "/admin-api/system/auth/refresh-token?refreshToken=" +
                storageHelper.getItem("REFRESH_TOKEN"),
            method: "post",
        });
    },
    loginNestApi(_: any) {
        return new Promise<{
            data: { content: string };
        }>((resolve) => {
            dpChain("appStore").setIsLoading(true);
            setTimeout(() => {
                dpChain("appStore").setIsLoading(false);
                resolve({
                    data: {
                        content: "http://localhost:8681",
                    },
                });
            }, 3000);
        });
    },

    // 登录接口
    loginApi(params: LoginApiParams) {
        return http.request<RefreshTokenRes>({
            url: baseUrl + "/auth/login-uc",
            method: "POST",
            data: params,
        });
    },

    fetchUserPermissions() {
        return http.request<{ permissions: any; menus: MenuPermissionItem[] }>({
            url: baseUrl + "/auth/get-permission-info",
            method: "GET",
        });
    },

    //获取滑块图片
    getImageUrlApi() {
        return http.request({
            url: baseUrl + "/auth/imageUrl",
            method: "POST",
        });
    },

    //获取活块验证成功标志
    getCaptchaApi() {
        return http.request({
            url: baseUrl + "/auth/captcha",
            method: "POST",
        });
    },

    //获取邮箱验证码
    getLoginCodeApi(params: any = {}) {
        return http.request({
            url: baseUrl + "/captcha/getUc",
            method: "POST",
            data: params,
        });
    },
    createCpdSortItemDefaultApi() {
        return http.request({
            url: "/admin-api/usercenter/cpd-sort-item/createCpdSortItemDefault",
            method: "GET",
        });
    },
    getUserInfoApi(params: GetUserInfoParams) {
        return http.request<{ deptId: string }>({
            url: "/admin-api/system/user/get",
            params,
            method: "GET",
        });
    },
    getDeptInfoApi(params: GetUserInfoParams) {
        return http.request({
            url: "/admin-api/system/dept/get",
            params,
            method: "GET",
        });
    },
    getInfraConfigApi() {
        return http.request<{ value: string }>({
            url: "/admin-api/infra/config/get",
            params: {
                id: "1818139318429220866",
            },
            method: "GET",
        });
    },
};

export default api;
