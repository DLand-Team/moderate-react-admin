export interface ArticleStoreState {
  articleTypeList: ArticleCourseType[];
  articleList: Article[];
  total: number;
  pageSize: number;
  pageNum: number;
}
export interface ArticleCourseType {
  id: number;
  name: string;
}

export interface Article {
  id: string;
  courseTypeList: ArticleCourseType[];
  title: string;
  subTitle: string;
  cover: string;
}
