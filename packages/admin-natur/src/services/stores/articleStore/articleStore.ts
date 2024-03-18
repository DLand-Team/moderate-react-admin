// 文章相关仓库
// 主要存储：
// 文章列表相关
// 文章类型列表相关
import type { ArticleStoreState } from "./articleStore.model";
import actions from "./articleStore.action";
import watch from "./articleStore.watch";

// 状态初始化函数
// 写成函数，方便初始化
const initState = (): ArticleStoreState => {
  return {
    pageNum:1,
    pageSize: 10,
    articleTypeList: [],
    articleList: [],
    total: 0,
  };
};

const articleStore = {
  // 状态
  state: initState(),
  // 计算属性
  actions: {
    ...actions,
    init: initState,
  },
  watch,
};

export default articleStore;
