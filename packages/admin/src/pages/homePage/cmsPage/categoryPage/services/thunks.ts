/* Instruments */
import { createThunks } from "@/reduxService/setup";
import names from "@/reduxService/stores/names";
import { pickBy } from "lodash-es";
import httpApi from "./api";
import type { PageType, QueryActParams } from "./model";
import { UUID } from "@/common/utils";

const thunks = createThunks(names.categoryStore, {
	refreshFormVersionAct: () => {
		return {
			formVersion: UUID(),
		};
	},
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
	setAddModalShowAct: ({
		isShowAddModal,
		recordData,
	}: {
		isShowAddModal: boolean;
		recordData?;
	}) => {
		let extra = !isShowAddModal
			? {
					isDetail: false,
				}
			: {};
		return {
			recordData,
			isShowAddModal,
			...extra,
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
	queryAct:
		(params: QueryActParams = {}) =>
		async (naturApi) => {
			naturApi.setState({
				loading: true,
			});
			const res = await httpApi.queryApi<PageType>(params).finally(() => {
				naturApi.setState({
					loading: false,
				});
			});
			const { content: dataList, count } = res.data || {};
			return {
				pageNum: params.page,
				dataList,
				total: count,
			};
		},
});
export default thunks;
