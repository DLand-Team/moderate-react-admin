export interface StoreState {
  marketList: Market[];
  marketItemList: MarketItem[];
  marketTablePagedata: {
    total: number;
    pageSize: number;
    pageNum: number;
  };
  marketItemTablePagedata: {
    total: number;
    pageSize: number;
    pageNum: number;
  };
  loading: boolean;
  id: string | number;
  marketData: Market | null; // 添加的marketData
  locationList: Record<PropertyKey, any[]>;
}

export interface PageType {
  created_at: Date;
  deleted_at: Date;
  description: string;
  id: number;
  name: string;
  parent_id: number;
  prime_id: number;
  updated_at: Date;
}

export interface QueryActParams {
  created_at?: string[];
  deleted_at?: string[];
  ids?: number[];
  names?: string[];
  order?: { [key: string]: any };
  page?: number;
  page_size?: number;
  parrent_id?: number;
  prime_id?: number;
  updated_at?: string[];
}

export interface GetAgencyDataApiParams {
  marketType: string;
  marketInfo: string;
  officeOwner: string;
  agentOrAirline: string;
}
export interface MarketItem {
  createTime: string;
  updateTime: string;
  creator: string;
  updater: string;
  deleted: true;
  id: number;
  locationInfo: string;
  locationType: string;
  exclude: string;
  weight: number;
  marketId: number;
  key?: string;
}
export interface Market {
  id: number;
  marketName: string;
  marketType: number;
  comment: string;
  ownerId: string;
  cpdMarketItems: MarketItem[];
}

export interface GetMarketListApiParams {
  pageNo: string | number;
  pageSize: string | number;
  marketName?: string;
  marketType?: string;
  ownerId?: string;
  comment?: string;
}
export interface DeleteApiParams {
  ids: string[];
}
export interface DetailApiParams {
  marketId: number;
}
