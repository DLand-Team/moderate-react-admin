// 文章相关仓库
// 主要存储：
// 文章列表相关
// 文章类型列表相关
import type { DevStoreState } from "./devStore.model";
import actions from "./devStore.action";
import watch from "./devStore.watch";

// 状态初始化函数
// 写成函数，方便初始化
const initState = (): DevStoreState => {
  return {
    apiList:[],
    pageNum: 1,
    pageSize: 100,
    pageList: [],
    routePageList: [],
    total: 0,
    storeList:[]
  };
};

const devStore = {
  // 状态
  state: initState(),
  // 计算属性
  actions: {
    ...actions,
    init: initState,
  },
  watch,
};

export default devStore;
