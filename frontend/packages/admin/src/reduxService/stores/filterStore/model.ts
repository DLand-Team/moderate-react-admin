export interface StoreState {
  id: string | number;
  isShowModal: boolean;
  currentData: Filter | null; // 添加的posData
  list: Filter[];
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

export type FilterData = Partial<Omit<Filter, "id">>;

export interface GetAgencyDataApiParams {
  posType: string;
  posInfo: string;
  officeOwner: string;
  agentOrAirline: string;
}

export interface Filter {
  id: number;
  carriers: string | string[];
  familyName: string;
  ownerId: string;
}

export type GetListApiParams = {
  pageNo: string | number;
  pageSize: string | number;
} & FilterData;

export interface DeleteApiParams {
  id: string[];
}

export interface GetListApiRes {
  list: Filter[];
  total: number;
}
export interface GetApiParams {
  id: string;
}

export interface Carrier {}
