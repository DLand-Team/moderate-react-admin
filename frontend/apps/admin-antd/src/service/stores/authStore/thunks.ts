import { authHelper, createThunks, dpChain } from "src/service";
import httpApi from "./api";
import {
  GetIdByNameApiReq,
  GetMenuDataApiReq,
  GetUserInfoParams,
  LoginApiReq,
  MenuPermissionItem,
  UpdateMenuApiReq,
} from "./model";

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
  async getMenuListAct() {
    const { data } = await httpApi.getMenuListApi();
    const treeData = authHelper.handleTree(data);
    dpChain("authStore").setMenuList(data);
    dpChain("authStore").setMenuTree(treeData);
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
    const menuTreePermissions = {
      id: -1,
      parentId: -1,
      name: "root",
      children: menus,
    } as MenuPermissionItem;

    // 需要根据后端的menu权限跟前端的权限结合，生成一个权限数据
    // 生成一个路由数据权限
    const { routesPermissions } =
      // 转换一下，因为RUYI后端穿过来的菜单对应的组件名，存在需要转换的地方
      authHelper.createRoutesPermissionsByMenu(menuTreePermissions!);

    menuTreePermissions &&
      (await dpChain("authStore").setPermissions({
        menuPermissions: menuTreePermissions,
        permissions,
        routesPermissions,
      }));
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
  async updateMenuAct(arg: Partial<UpdateMenuApiReq>) {
    await httpApi.updateMenuApi(arg);
  },
  async createMenuAct(arg: Partial<UpdateMenuApiReq>) {
    await httpApi.createMenuApi(arg);
  },
  async getMenuDataAct(arg: GetMenuDataApiReq) {
    const { data } = await httpApi.getMenuDataApi(arg);
    dpChain("authStore").setCurrentEditMenuData(data);
  },
  async deleteMenuAct(arg: GetMenuDataApiReq) {
    await httpApi.deleteMenuApi(arg);
  },
});
export default thunks;
