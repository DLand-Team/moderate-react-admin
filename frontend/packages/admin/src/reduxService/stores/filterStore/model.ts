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
  filterItemList: FilterItem[]; //创建fiiter表格数据
  filterItemTablePagedata: {
    //fiiter表格分页
    total: number;
    pageSize: number;
    pageNum: number;
  };
  allDirect: boolean;
}

export interface PageData {
  total: number;
  pageSize: number;
  pageNum: number;
}

export type FilterData = Partial<Omit<Filter, "id">>;

export interface Filter {
  id: string;
  filterItemName: string;
  allDirect: boolean;
  ownerId: string;
  travelTime: number;
  travelTimeType: number;
  travelTimeOperator: number;
  price: number;
  priceOperator: number;
  layover: number;
  layoverOperator: number;
  connections: number;
  connectionsOperator: number;
}

export interface FilterItem {
  filterBy: string;
  operator: number;
  number: string;
  pv: number;
  key: string;
}

export type GetListApiParams = {
  pageNo: string | number;
  pageSize: string | number;
} & FilterData;

export interface DeleteApiParams {
  ids: string;
}

export interface GetListApiRes {
  list: Filter[];
  total: number;
}
export interface GetApiParams {
  id: string;
}

export interface Carrier {}
