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

export interface GetAgencyDataApiParams {
  posType: string;
  posInfo: string;
  officeOwner: string;
  agentOrAirline: string;
}

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
  id: string[];
}

export interface GetListApiRes {
  list: Sort[];
  total: number;
}
export interface GetApiParams {
  id: string;
}
