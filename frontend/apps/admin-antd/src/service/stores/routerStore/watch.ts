import { dpChain, getActionType, startAppListening } from "src/service";

const watch = () => {
  startAppListening({
    type: getActionType("authStore").getMenuListAct.fulfilled,
    effect: async () => {
      await dpChain("routerStore")
        .createRoutesDataAct(null)
        .finally(() => {
          // dpChain("appStore").setIsLoading(false);
        });
    },
  });
};

export default watch;
