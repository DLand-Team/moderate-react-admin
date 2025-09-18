import { dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = () => {
  startAppListening({
    predicate: (action) => {
      const {
        createUserAct,
        updateUserAct,
        deleteUserAct,
        assignUserRoleAct,
        setUserPagination,
        setCurrentDeptId,
      } = getActionType("sysStore");
      if (
        [
          setCurrentDeptId,
          assignUserRoleAct.fulfilled,
          createUserAct.fulfilled,
          updateUserAct.fulfilled,
          deleteUserAct.fulfilled,
          setUserPagination,
        ].includes(action.type)
      ) {
        return true;
      }
      return false;
    },

    effect: async () => {
      dpChain("sysStore").queryUserListAct({});
    },
  });

  startAppListening({
    predicate: (action) => {
      const { deleteRoleAct, createRoleAct, updateRoleAct, setRolePagination } =
        getActionType("sysStore");
      if (
        [
          deleteRoleAct.fulfilled,
          createRoleAct.fulfilled,
          updateRoleAct.fulfilled,
          setRolePagination,
        ].includes(action.type)
      ) {
        return true;
      }
      return false;
    },
    effect: async () => {
      dpChain("sysStore").queryRoleListAct({});
    },
  });
};

export default watch;
