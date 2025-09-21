import { storageHelper } from "@/src/common/utils";
import { PayloadAction } from "redux-eazy";
import { RouteItem } from "src/router";
import { getActionType } from "src/service";
import { appHelper, createSlice } from "src/service/setup";
import { StoreState } from "./model";

const initialState = (): StoreState => {
  const historyRoutes = storageHelper.getItem("TABS_HISTORY");

  return {
    isLoading: false,
    routeList: [],
    keepAliveRouteIds: [],
    routeTree: null,
    historyRoutes: historyRoutes || [],
    currentRouteUrl: "",
    jumpingSignal: "",
    modalData: {},
  };
};

const slice = createSlice({
  name: "appStore",
  stateInit: initialState,
  reducers: {
    setIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
    setRouteList(state, { payload }: PayloadAction<RouteItem[]>) {
      state.routeList = payload;
    },
    setKeepAliveList(state, { payload }: PayloadAction<any[]>) {
      state.keepAliveRouteIds = payload;
    },
    setRouteTree(state, { payload }: PayloadAction<RouteItem | null>) {
      state.routeTree = payload;
    },
    setHistoryRoutes(state, { payload }: PayloadAction<RouteItem[]>) {
      state.historyRoutes = payload;
      storageHelper.setItem("TABS_HISTORY", payload);
    },
    setCurrentRouteUrl(state, { payload }: PayloadAction<string>) {
      state.currentRouteUrl = payload;
    },
    setJumping(state, _: PayloadAction<any>) {
      state.jumpingSignal = new Date().getTime().toString();
    },
    updateModalStatus(
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        isShow: boolean;
      }>,
    ) {
      if (!payload.isShow) {
        appHelper.removeModal(payload.id);
        delete state.modalData[payload.id];
      } else {
        state.modalData[payload.id] = payload;
      }
    },
  },
  extraReducers: (builder) => {
    const { getUserPermissionsAct } = getActionType("authStore");
    const loadingActionList = [getUserPermissionsAct];
    loadingActionList.filter(Boolean).forEach((actionItem) => {
      builder
        .addCase(actionItem.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(actionItem.rejected, (state) => {
          state.isLoading = false;
        })
        .addCase(actionItem.fulfilled, (state) => {
          state.isLoading = false;
        });
    });
  },
});

export default slice;
