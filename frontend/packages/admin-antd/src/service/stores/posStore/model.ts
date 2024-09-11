import { PageBaseData } from "src/types/common";

export interface StoreState {
    posList: Pos[];
    allPosList: Pos[];
    posItemList: PosItem[];
    posTablePagedata: PageBaseData;
    posItemTablePagedata: PageBaseData;
    loading: boolean;
    posCarrierList: PosCarrier[];
    id: string | number;
    currentData: Pos | null; // 添加的posData
    locationList: Record<PropertyKey, any[]>;
    posFilterData: PosFilterData;
    selectedRowKeys: string[];
    isEditing: boolean;
    posItemsTablePageNum: number;
}

export interface PosFilterData {
    posName?: string;
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

export interface PosCarrier {
    id: number;
    carrier: string;
    type: number;
    deleted: boolean;
}

export interface GetAgencyDataApiParams {
    posType: string;
    posInfo: string;
    officeOwner: string;
    agentOrAirline: string;
}
export interface PosItem {
    createTime: string;
    updateTime: string;
    creator: string;
    updater: string;
    deleted: boolean;
    id: string | number;
    posInfo: string;
    posType: string;
    agentOrAirline: string;
    officeOwner: string;
    exclude: boolean;
    weight: number;
    posId: number;
    // 往往key和id都被后端管理，前端想额外区分唯一key，最好还是创建一个新的，所以设立uid.
    // 添加条目时候，还没提交的时候，可以自行加该字段
    uid?: string;
    key?: string;
}
export interface Pos {
    id?: number;
    uid?: string;
    posName: string;
    ownerId: string;
    comment: string;
    cpdPosItems: PosItem[];
}

export interface GetPosListApiParams {
    pageNo: string | number;
    pageSize: string | number;
    posName?: string | number;
}

export interface GetDetailActParams {
    id?: string | number | null;
}

export interface GetPosItemListParams {
    posId?: string | number | null;
}
export interface DeleteApiParams {
    ids: string;
}
