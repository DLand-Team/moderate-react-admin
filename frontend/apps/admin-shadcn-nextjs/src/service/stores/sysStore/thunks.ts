import { toast } from "sonner";
import { convertArrToTreeData, handleTree } from "src/common/utils";
import { createThunks, dpChain } from "src/service";
import api from "./api";
import {
  AssignUserRoleApiReq,
  MenuItem,
  QueryRoleApiReq,
  QueryRoleListApiReq,
  QueryRoleMenuPermissionsApiReq,
  QueryUserListApiReq,
  Role,
  User,
} from "./model";

// 校验权限
const checkPermission = () => {
  // 开发模式可以
  //   if (import.meta.env.DEV) return true;
  toast.error("当前是演示环境, 无权限操作");
  return false;
};

const thunks = createThunks("sysStore", {
  async queryUserListAct(req: Partial<QueryUserListApiReq>, store) {
    const { userPagination, currentDeptId } = store.getState().sysStore;
    const { data: { list = [], total = 0 } = {} } = await api.queryUserListApi({
      ...userPagination,
      deptId: currentDeptId!,
      ...req,
    });

    dpChain("sysStore").setUserList({
      list: list,
      total,
    });
  },
  async queryRoleListAct(payload: Partial<QueryRoleListApiReq>) {
    const { data: { list = [], total = 0 } = {} } =
      await api.queryRoleListApi(payload);
    dpChain("sysStore").setRoleList({
      list: list,
      total,
    });
  },
  async queryRoleAct(payload: QueryRoleApiReq) {
    const { data } = await api.queryRoleApi(payload);
    dpChain("sysStore").setCurrentRole(data);
  },
  async updateRoleAct(data: Partial<Role>) {
    if (!checkPermission()) return;
    await api.updateRoleApi(data);
  },
  async createRoleAct(data: Partial<Role>) {
    await api.createRoleApi(data);
  },
  async queryDeptListAct() {
    const { data } = await api.queryDeptListApi();
    dpChain("sysStore").setDeptList(data);
  },
  async queryUserAct(data: { id: number }) {
    const { data: userData } = await api.queryUserApi(data);
    dpChain("sysStore").setCurrentUser(userData);
  },
  async updateUserAct(data: Partial<User>) {
    if (!checkPermission()) return;
    await api.updateUserApi(data);
  },
  async createUserAct(data: Partial<User>) {
    await api.createUserApi(data);
  },
  async queryPostListAct() {
    const { data } = await api.queryPostListApi();
    dpChain("sysStore").setPostList(data);
  },
  async deleteUserAct(data: { id: number }) {
    if (!checkPermission()) return;
    await api.deleteUserApi(data);
  },
  async updateUserPasswordAct(data: { id: number; password: string }) {
    await api.updateUserPasswordApi(data);
  },
  async deleteRoleAct(data: { id: number }) {
    if (!checkPermission()) return;
    await api.deleteRoleApi(data);
  },
  async queryMenuListAct() {
    const { data } = await api.querySimpleMenuListApi();
    dpChain("sysStore").setActivedMenuList(data);
    const tree = convertArrToTreeData<MenuItem>(data);
    dpChain("sysStore").setActivedMenuTree(tree);
  },
  async queryRoleMenuPermissionsAct(params: QueryRoleMenuPermissionsApiReq) {
    const { data } = await api.queryRoleMenuPermissionsApi(params);
    dpChain("sysStore").setRoleMenuPermissions(data);
  },
  async assignRoleMenuAct(data: { roleId: number; menuIds: number[] }) {
    if (!checkPermission()) return;
    await api.assignRoleMenuApi(data);
  },
  async listUserRoleAct(data: { userId: number }) {
    const { data: roleData } = await api.listUserRoleApi(data);
    dpChain("sysStore").setCurrentUserRole(roleData);
  },
  async listRoleAct() {
    const { data } = await api.listRoleApi();
    dpChain("sysStore").setUserRoleList(data);
  },
  async assignUserRoleAct(data: AssignUserRoleApiReq) {
    if (!checkPermission()) return;
    await api.assignUserRoleApi(data);
  },
  async listUserRolesAct(data: { userId: number }) {
    const { data: roleData } = await api.listUserRolesApi(data);
    dpChain("sysStore").setCurrentUserRoles(roleData);
  },
  async getMenuListAct() {
    const { data } = await api.getMenuListApi();
    const treeData = handleTree(data);
    dpChain("sysStore").setMenuList(data);
    dpChain("sysStore").setMenuTree(treeData);
  },
});
export default thunks;
