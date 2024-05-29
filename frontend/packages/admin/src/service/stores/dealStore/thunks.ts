/* Instruments */
import { pickBy } from "lodash-es";
import { dp } from "src/service";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import { DealEntity, QueryActParams, RankApiParams } from "./model";

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
		await httpApi.updateApi(pickBy(params));
	},
	approveAct: async (params: { id: number; title: string }) => {
		await httpApi.approveApi(params);
	},
	rejectAct: async (params: { id: number; reject_reason: string }) => {
		await httpApi.rejectApi(params);
	},
	// 请求deal列表
	queryDealListAct: async (params: QueryActParams, api) => {
		dp("dealStore", "setLoading", true);
		const res = await httpApi
			.queryApi<DealEntity>({
				page: api.getState().dealStore.pageData.pageNum || 1,
				page_size: api.getState().dealStore.pageData.pageSize,
				status: "pending",
				is_submitted: true,
				is_approved: false,
				is_draft: true,
				...params,
			})
			.finally(() => {
				dp("dealStore", "setLoading", false);
			});
		const { content: dataList, count } = res.data;
		dp("dealStore", "setDealList", {
			list: dataList,
			total: count,
		});
	},
	queryApprovalDealListAct: async (params: QueryActParams, api) => {
		dp("dealStore", "setLoading", true);
		const res = await httpApi
			.queryApi<DealEntity>({
				page: api.getState().dealStore.approvalPageData.pageNum || 1,
				page_size: api.getState().dealStore.approvalPageData.pageSize,
				status: "pending",
				is_submitted: true,
				is_approved: false,
				is_draft: true,
				...params,
			})
			.finally(() => {
				dp("dealStore", "setLoading", false);
			});
		const { content: dataList, count } = res.data;
		dp("dealStore", "setApprovalDealList", {
			list: dataList,
			total: count,
		});
	},
	queryRankDealListAct: async (params: QueryActParams, api) => {
		dp("dealStore", "setLoading", true);
		const res = await httpApi
			.queryApi<DealEntity>({
				page: api.getState().dealStore.rankPageData.pageNum || 1,
				page_size: api.getState().dealStore.rankPageData.pageSize,
				is_submitted: true,
				is_approved: false,
				is_draft: true,
				order: {
					priority: "DESC",
					rating: "DESC",
				},
				...params,
			})
			.finally(() => {
				dp("dealStore", "setLoading", false);
			});
		const { content: dataList, count } = res.data;
		dp("dealStore", "setRankList", {
			list: dataList,
			total: count,
		});
	},
	rankListAct: async (params: RankApiParams) => {
		httpApi.rankApi(params);
	},
	querySearchListAct: async () => {
		dp("dealStore", "setLoading", true);
		const res = await httpApi
			.queryApi<DealEntity>({
				is_approved: true,
				is_draft: false,
				status: "active",
			})
			.finally(() => {
				dp("dealStore", "setLoading", false);
			});
		dp("dealStore", "setSearchList", res.data.content);
	},
});
export default thunks;
