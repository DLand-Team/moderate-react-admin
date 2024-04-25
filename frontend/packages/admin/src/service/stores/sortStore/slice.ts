/* Core */
import { createSliceCustom, PayloadAction } from "redux-eazy";
import names from "src/service/stores/names";
import { FilterData, GetListApiRes, PageData, StoreState, Sort } from "./model";

const initialState = (): StoreState => {
  return {
    isShowModal: false,
    list: [], // pos列表，
    id: "", // 编辑页面查看的当前pos的id
    currentData: null, // 当前pos的数据
    filterData: {}, //查询数据的对象
    tablePagedata: {
      total: 0,
      pageNum: 1,
      pageSize: 10,
    },
    loading: false,
    selectedRowKeys: [], //要删除的id集合
  };
};

const slice = createSliceCustom({
  name: names.sortStore,
  stateInit: initialState,
  reducers: {
    setList(state, data: PayloadAction<GetListApiRes>) {
      // 设置列表
      state.list = data.payload.list;
      state.tablePagedata = {
        ...state.tablePagedata,
        total: data.payload.total,
      };
    },
    // 设置查询数据
    setFilterData(state, data: PayloadAction<Partial<FilterData>>) {
      state.filterData = {
        ...state.filterData,
        ...data.payload,
      };
    },
    setPageData(state, data: PayloadAction<Partial<PageData>>) {
      state.tablePagedata = {
        ...state.tablePagedata,
        ...data.payload,
      };
    },
    // 设置显示弹窗
    setIsShowModal(state, data: PayloadAction<boolean>) {
      state.isShowModal = data.payload;
    },

    //设置编辑详情信息
    setCurrentData(state, data: PayloadAction<Sort | null>) {
      state.currentData = data?.payload
        ? {
            ...data.payload,
            sortString:
              typeof data?.payload?.sortString === "string"
                ? data?.payload?.sortString?.split(",")
                : data?.payload?.sortString,
          }
        : null;
    },
    //设置要删除的航司
    setSelectedRowKeys(state, data: PayloadAction<string[]>) {
      state.selectedRowKeys = data.payload;
    },
  },
});

export default slice;
