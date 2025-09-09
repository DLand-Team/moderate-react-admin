import { createSlice } from "src/service/setup";
import { PayloadAction } from "redux-eazy";
import { getAccessToken, setToken } from "src/common/http/auth";
import {
  DemoData,
  MenuItemData,
  MenuPermissionItem,
  ModalType,
  RefreshTokenRes,
  StoreState,
} from "./model";

const initialState = (): StoreState => {
  return {
    userName: "",
    token: getAccessToken() || "",
    permissions: [],
    routesPermissions: [],
    menuPermissions: null,
    locale: "zh", //中英文
    userId: null,
    menuTreeData: null,
    menuListData: null,
    modalType: "",
    currentEditMenuData: null,
  };
};

const slice = createSlice({
  name: "authStore",
  stateInit: initialState,
  reducers: {
    setModalType(state, { payload }: PayloadAction<ModalType>) {
      state.modalType = payload;
    },
    setUserid(state, { payload }: PayloadAction<number>) {
      state.userId = payload;
    },
    setToken(state, { payload }: PayloadAction<RefreshTokenRes>) {
      const { accessToken, refreshToken } = payload;
      state.token = payload.accessToken;
      setToken({
        accessToken,
        refreshToken,
      });
    },
    // 设置后端传过来的原始权限数据
    setPermissions(
      state,
      {
        payload,
      }: PayloadAction<{
        menuPermissions: MenuPermissionItem[];
        permissions: any[];
        routesPermissions: string[];
      }>,
    ) {
      // 菜单权限
      state.menuPermissions = payload.menuPermissions;

      // 路由权限
      // state.routesPermissions = payload.routesPermissions;
      // 按钮权限
      // state.permissions = payload.permissions;
    },
    setMenuTree(state, { payload }: PayloadAction<MenuItemData[]>) {
      state.menuTreeData = payload;
    },
    setMenuList(state, { payload }: PayloadAction<MenuItemData[]>) {
      state.menuListData = payload;
    },
    // 设置路由权限数据
    setRoutesPermissions(state, { payload }: PayloadAction<string[]>) {
      state.routesPermissions = [...state.routesPermissions, ...payload];
    },
    //设置中英文
    setLocale(state, { payload }: PayloadAction<string>) {
      state.locale = payload;
    },
  },
  // getMenuListAct set loging
  // extraReducers: (builder) => {
  // 	builder
  // 		.addCase(
  // 			getActionType("authStore").getUserPermissionsAct.pending,
  // 			() => {
  // 				emitAsync("appStore").setIsLoading(true);
  // 			}
  // 		)
  // 		.addCase(
  // 			getActionType("authStore").getUserPermissionsAct.rejected,
  // 			() => {
  // 				emitAsync("appStore").setIsLoading(false);
  // 			}
  // 		)
  // 		.addCase(
  // 			getActionType("authStore").getMenuListAct.fulfilled,
  // 			() => {
  // 				emitAsync("appStore").setIsLoading(false);
  // 			}
  // 		)
  // 		.addCase(getActionType("authStore").getMenuListAct.rejected, () => {
  // 			emitAsync("appStore").setIsLoading(false);
  // 		});
  // },
});

export default slice;
