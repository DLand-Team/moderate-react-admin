import { http } from "@/common/http";
import { Article, ArticleCourseType } from "../stores/articleStore/articleStore.model";

export interface FetchArticleAddparams {
  content: string;
  courseTypeList: number[];
  id: null;
  subTitle: string;
  title: string;
  userId: number;
}

export type FetchArticleTypeListRes  = ArticleCourseType[];

export interface FetchArticleAddRes {
  code: number;
  message: string;
  success: boolean;
}

export interface FetchArticleListparams {
  pageNum: number;
  pageSize: number;
}

interface FetchArticleListRes {
  list: Article;
  total: number;
}

// 查询文章类别
function fetchArticleTypeList() {
  return http.request<FetchArticleTypeListRes>({
    url: "/javaApi/article/info/getAllCourseTypeList",
    method: "GET",
  });
}

// 添加文章
function fetchArticleAdd(params: FetchArticleAddparams) {
  return http.request<FetchArticleAddRes>({
    url: "/javaApi/article/info/submitArticle",
    method: "POST",
    data: params,
  });
}

// 查询文章列表，post
function fetchArticleList(params: FetchArticleListparams) {
  return http.request<FetchArticleListRes>({
    url: "/javaApi/article/info/getArticleList",
    method: "GET",
    params,
  });
}

const articleApi = {
  fetchArticleTypeList,
  fetchArticleAdd,
  fetchArticleList,
};

export default articleApi;
