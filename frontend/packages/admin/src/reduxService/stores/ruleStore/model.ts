export interface StoreState {
  ruleList: Rule[];
  ruleItemList: RuleItem[];
  ruleTablePagedata: PageData;
  filterData: FilterData;
  ruleItemTablePagedata: {
    total: number;
    pageSize: number;
    pageNum: number;
  };
  loading: boolean;
  ruleCarrierList: RuleCarrier[];
  id: string | number;
  ruleData: Rule | null; // 添加的ruleData
  locationList: Record<PropertyKey, any[]>;
}
export type FilterData = Partial<FilterData1>;

export interface FilterData1 {
  ruleName: string;
  applyProduct: string;
  status: string;
}

export interface PageData {
  total: number;
  pageSize: number;
  pageNum: number;
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

export interface RuleCarrier {
  id: number;
  carrier: string;
  type: number;
  deleted: boolean;
}

export interface GetAgencyDataApiParams {
  ruleType: string;
  ruleInfo: string;
  officeOwner: string;
  agentOrAirline: string;
}
export interface RuleItem {
  createTime: string;
  updateTime: string;
  creator: string;
  updater: string;
  deleted: true;
  id: number;
  ruleInfo: string;
  ruleType: string;
  agentOrAirline: string;
  officeOwner: string;
  exclude: string;
  weight: number;
  ruleId: number;
  key?: string;
}
export interface Rule {
  id: number;
  ruleName: string;
  ownerId: string;
  comment: string;
  cpdRuleItems: RuleItem[];
}

export interface GetRuleListApiParams {
  pageNo: string | number;
  pageSize: string | number;
  ruleName?: string | number;
  ownerId?: string;
  sequenceNo?: string;
  fareAllowedCarriers?: string;
  oriMarketId?: string;
  desMarketId?: string;
  posId?: string;
  effectStartDate?: string;
  effectEndDate?: string;
  applyProduct?: string;
  status?: string;
  comment?: string;
  sortItemId?: string;
  filterItemId?: string;
  backupResult?: string;
}
