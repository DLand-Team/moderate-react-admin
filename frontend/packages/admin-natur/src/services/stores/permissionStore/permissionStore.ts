import type { ArticleStoreState } from "./permissionStore.model";
import actions from "./permissionStore.action";
import watch from "./permissionStore.watch";

// 状态初始化函数
// 写成函数，方便初始化
const initState = (): ArticleStoreState => {
  return {
    permissionTreeData: [],
  };
};

const roleStore = {
  // 状态
  state: initState(),
  // 计算属性
  actions: {
    ...actions,
    init: initState,
  },
  watch,
};

export default roleStore;
