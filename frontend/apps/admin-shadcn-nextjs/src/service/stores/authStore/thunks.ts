import { createThunks, dpChain } from "src/service";
import httpApi from "./api";
import { GetIdByNameApiReq, GetUserInfoParams, LoginApiReq } from "./model";
import { handleTree } from "@/src/common/utils";

const thunks = createThunks("authStore", {
  getIdByNameAct: async (arg: GetIdByNameApiReq) => {
    await httpApi.getIdByNameApi(arg);
  },
  captchaAct: async () => {
    await httpApi.captchaApi();
  },
  loginAct: async (arg: LoginApiReq) => {
    const { data } = await httpApi.loginApi(arg);
    const { userId, accessToken, refreshToken } = data;
    userId && dpChain("authStore").setUserid(userId);
    dpChain("authStore").setToken({
      accessToken,
      refreshToken,
    });
  },
  
  async refreshTokenAct() {
    const { data } = await httpApi.refreshToken();
    dpChain("authStore").setToken(data);
    return data;
  },
  async getUserPermissionsAct() {
    const {
      data: { permissions, menus },
    } = await httpApi.fetchUserPermissions();

    await dpChain("authStore").setPermissions({
      menuPermissions: menus,
      permissions,
      routesPermissions: [],
    });
  },

  async getUserinfoAct(arg: GetUserInfoParams) {
    const { data } = await httpApi.getUserInfoApi(arg);
    return data;
  },
});
export default thunks;
