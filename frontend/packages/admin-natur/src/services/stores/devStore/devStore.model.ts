export interface DevStoreState {
  routePageList: string[];
  pageList: PageType[];
  total: number;
  pageSize: number;
  pageNum: number;
  storeList: StoreType[];
  apiList:StoreType[];
}
export interface PageType {
  id: string;
  name: string;
  path: string;
  active: boolean;
}

export interface StoreType {
  name: string;
  id: string;
}
