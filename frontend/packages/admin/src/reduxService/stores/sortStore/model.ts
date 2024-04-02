export interface StoreState {
  id: string | number;
  isShowModal: boolean;
  currentData: Sort | null; // 添加的posData
  list: Sort[];
  // table的翻页数据
  tablePagedata: PageData;
  filterData: FilterData;
  loading: boolean;
  selectedRowKeys: string[];
}

export interface PageData {
  total: number;
  pageSize: number;
  pageNum: number;
}

export type FilterData = Partial<Omit<Sort, "id">>;

export interface Sort {
  id: string;
  sortString: string[] | string;
  sortItemName: string;
  ownerId: string;
  //ruleId: string;
}

export type GetListApiParams = {
  pageNo: string | number;
  pageSize: string | number;
} & FilterData;

export interface DeleteApiParams {
  ids: string;
}

export interface GetListApiRes {
  list: Sort[];
  total: number;
}
export interface GetApiParams {
  id: string;
}
