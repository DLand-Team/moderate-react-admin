import { dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service";

const watch = () => {
    // 监听权限数据，动态生成菜单
    startAppListening({
        type: getActionType("routerStore").setRoutesConfigMap,
        effect: async () => {
            dpChain("appStore").createMenuDataAct(null);
        },
    });
};

export default watch;
