import { PayloadAction } from "redux-eazy";
import { createSlice } from "src/service/setup";
import { Pos, PosCarrier, PosFilterData, StoreState } from "./model";
import { PageBaseData } from "src/types/common";
import { ROUTE_ID } from "src/router";

const initialState = (): StoreState => {
    return {
        allPosList: [],
        posList: [], // pos列表，
        posItemList: [],
        id: "", // 编辑页面查看的当前pos的id
        currentData: null, // 当前pos的数据
        posTablePagedata: {
            total: 0,
            pageNum: 1,
            pageSize: 10,
        },
        posItemTablePagedata: {
            total: 0,
            pageNum: 1,
            pageSize: 10,
        },
        loading: false,
        posCarrierList: [],
        locationList: {}, // 添加posItem的posInfo属性枚举值
        posFilterData: {},
        selectedRowKeys: [], //要删除的id集合
        isEditing: false,
    };
};

const slice = createSlice({
    name: "posStore",
    stateInit: initialState,
    branch: [ROUTE_ID.PosDetailPage, ROUTE_ID.PosEditPage, ROUTE_ID.PosAddPage],
    reducers: {
        setAllPosList(state, { payload }: PayloadAction<Pos[]>) {
            state.allPosList = payload;
        },
        // 设置当前的data
        setCurrentDetail(state, { payload }: PayloadAction<Pos | null>) {
            state.currentData = payload;
        },
        setPostList(state, data: PayloadAction<Pos[]>) {
            state.posList = data.payload;
        },
        setAllPostList(state, data: PayloadAction<Pos[]>) {
            state.posList = data.payload;
        },
        setPosCarrier(state, data: PayloadAction<PosCarrier[]>) {
            state.posCarrierList = data.payload;
        },
        setPosFilterData(state, data: PayloadAction<PosFilterData>) {
            state.posFilterData = data.payload;
        },
        setPosTablePageData(state, data: PayloadAction<Partial<PageBaseData>>) {
            state.posTablePagedata = {
                ...state.posTablePagedata,
                ...data.payload,
            };
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
