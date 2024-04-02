export interface StoreState {
  id: string | number;
  isShowModal: boolean;
  currentData: Carrier | null; // 添加的posData
  list: Carrier[];
  // table的翻页数据
  tablePagedata: PageData;
  filterData: FilterData;
  loading: boolean;
  carrierList: CarrierList[];
  selectedRowKeys: string[];
}

export interface PageData {
  total: number;
  pageSize: number;
  pageNum: number;
}

export type FilterData = Partial<Omit<Carrier, "id">>;

export interface Carrier {
  id: string;
  carriers: string[] | string;
  familyName: string;
  ownerId: string;
}

export type GetListApiParams = {
  pageNo: string | number;
  pageSize: string | number;
} & FilterData;

export interface DeleteApiParams {
  ids: string;
}

export interface GetListApiRes {
  list: Carrier[];
  total: number;
}
export interface GetApiParams {
  id: string;
}
export interface CarrierList {
  id: number;
  carrier: string;
  type: number;
}
