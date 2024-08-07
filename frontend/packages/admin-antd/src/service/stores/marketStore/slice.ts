import { PayloadAction } from "redux-eazy";
import { createSlice } from "src/service/setup";
import {
    GetMarketListApiRes,
    Market,
    MarketCarrier,
    MarketFilterData,
    MarketTablePagedata,
    StoreState,
} from "./model";
import { ROUTE_ID } from "src/router";

const initialState = (): StoreState => {
    return {
        allMarketList: [],
        marketList: [], // market列表，s
        marketItemList: [],
        id: "", // 编辑页面查看的当前market的id
        currentData: null, // 当前market的数据
        marketFilterData: {},
        marketTablePagedata: {
            total: 0,
            pageNum: 1,
            pageSize: 10,
        },
        marketItemTablePagedata: {
            total: 0,
            pageNum: 1,
            pageSize: 10,
        },
        loading: false,
        marketCarrierList: [],
        locationList: {}, // 添加marketItem的marketInfo属性枚举值
        isDisabledMarketType: false,
        selectedRowKeys: [], //要删除的id集合
        isEditing: false,
    };
};

const slice = createSlice({
    name: "marketStore",
    branch: [ROUTE_ID.MarketDetailPage, ROUTE_ID.MarketAddPage, ROUTE_ID.MarketEditPage],
    stateInit: initialState,
    reducers: {
        setAllMarketList(state, { payload }: PayloadAction<Market[]>) {
            state.allMarketList = payload;
        },
        // 设置当前的data
        setCurrentMarketData(state, { payload }: PayloadAction<Market | null>) {
            state.currentData = payload;
        },
        setMarketList(state, { payload }: PayloadAction<GetMarketListApiRes>) {
            state.marketList = payload.list;
            state.marketTablePagedata.total = payload.total;
        },
        setMarketCarrier(state, data: PayloadAction<MarketCarrier[]>) {
            state.marketCarrierList = data.payload;
        },
        setLocaionList(state, data: PayloadAction<any>) {
            state.locationList = data.payload;
        },
        setMarketFilterData(state, data: PayloadAction<MarketFilterData>) {
            state.marketFilterData = data.payload;
        },
        // 设置market table的翻页数据
        setMarketTablePageData(
            state,
            data: PayloadAction<Partial<MarketTablePagedata>>
        ) {
            state.marketTablePagedata = {
                ...state.marketTablePagedata,
                ...data.payload,
            };
        },
        setIsDisabledMarketType(state, data: PayloadAction<boolean>) {
            state.isDisabledMarketType = data.payload;
        },
        setSelectedRowKeys(state, data: PayloadAction<string[]>) {
            state.selectedRowKeys = data.payload;
        },
        setIsEditing(state, data: PayloadAction<boolean>) {
            state.isEditing = data.payload;
        },
    },
});

export default slice;
