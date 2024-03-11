// 文章相关仓库
// 主要存储：
// 文章列表相关
// 文章类型列表相关
import articleApi, {
  FetchArticleAddparams,
  FetchArticleListparams,
} from "@/services/apis/articleApi";

const actions = {
  createArticleTypeList: async () => {
    const { data = [] } = await articleApi.fetchArticleTypeList();
    return {
      articleTypeList: data,
    };
  },
  createArticleList: async (params: FetchArticleListparams) => {
    const {
      data: { list, total },
    } = await articleApi.fetchArticleList(params);
    return {
      articleList: list,
      total: total,
      pageNum: params.pageNum,
    };
  },

  addArticle: async (params: FetchArticleAddparams) => {
    await articleApi.fetchArticleAdd(params);
  },
};

export default actions;
