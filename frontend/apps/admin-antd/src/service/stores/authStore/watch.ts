import { dpChain, getActionType, startAppListening } from "src/service";

const watch = () => {
  startAppListening({
    type: getActionType("authStore").setPermissions,
    effect: () => {
      dpChain("authStore").getMenuListAct(null);
    },
  });
  startAppListening({
    predicate: (action) => {
      const { updateMenuAct, createMenuAct, deleteMenuAct } =
        getActionType("authStore");
      if (
        [
          updateMenuAct.fulfilled,
          createMenuAct.fulfilled,
          deleteMenuAct.fulfilled,
        ].includes(action.type)
      ) {
        return true;
      }
      return false;
    },
    effect: () => {
      dpChain("authStore").getMenuListAct(null);
      dpChain("authStore").getUserPermissionsAct(null);
    },
  });

  startAppListening({
    type: getActionType("sysStore").setFilterType,
    effect: () => {
      dpChain("authStore").getMenuListAct(null);
    },
  });
};

export default watch;
