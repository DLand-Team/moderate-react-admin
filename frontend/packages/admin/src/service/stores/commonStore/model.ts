export interface MarketTablePagedata {
    total: number;
    pageSize: number;
    pageNum: number;
}
export interface StoreState {
    locationList: Record<PropertyKey, any[]>;
    agencyData: any;
}
export interface MarketFilterData {
    id?: string | number;
    marketName?: string;
    marketType?: string;
    comment?: string;
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

export interface MarketCarrier {
    id: number;
    carrier: string;
    type: number;
    deleted: boolean;
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
    marketInfo: string;
    marketType: string;
    agentOrAirline: string;
    officeOwner: string;
    exclude: boolean;
    weight: number;
    marketId: number;
    uid?: string;
    locationInfo: string;
    locationType: string;
}
export interface Market {
    id?: number;
    marketName: string;
    ownerId?: string;
    comment: string;
    cpdMarketItems: MarketItem[];
    marketType?: number;
}

export interface GetMarketListApiParams {
    pageNo: string | number;
    pageSize: string | number;
    marketName?: string | number;
}
export interface GetMarketListApiRes {
    list: Market[];
    total: number;
}

export interface GetDetailActParams {
    id?: string | number | null;
}

export interface GetMarketItemListParams {
    marketId?: string | number | null;
}

export interface DeleteApiParams {
    ids: string;
}
