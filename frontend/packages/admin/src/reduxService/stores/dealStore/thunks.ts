/* Instruments */
import { pickBy } from "lodash-es";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import { PageType, QueryActParams } from "./model";
import { dp } from "src/reduxService";

const thunks = createThunks(names.dealStore, {
  setIsDetailAct: (isDetail: boolean) => {
    return {
      isDetail,
    };
  },
  setPageNum: (pageNum: number) => {
    return {
      pageNum,
    };
  },

  addAct: async (params) => {
    await httpApi.addApi(pickBy(params));
  },
  deleteAct: async (params) => {
    await httpApi.deleteApi(params);
  },
  updateAct: async (params) => {
    await httpApi.upadteApi(pickBy(params));
  },
  approveAct: async (params: { id: number; title: string }) => {
    await httpApi.approveApi(params);
  },
  rejectAct: async (params: { id: number; reject_reason: string }) => {
    await httpApi.rejectApi(params);
  },
  queryAct: async (params: QueryActParams) => {
    dp("dealStore", "setLoading", true);
    const res = await httpApi.queryApi<PageType>(params).finally(() => {
      dp("dealStore", "setLoading", false);
    });
    const { content: dataList, count } = res.data;
    dp("dealStore", "setState", {
      pageNum: params.page,
      dataList,
      total: count,
    });
  },
});
export default thunks;
