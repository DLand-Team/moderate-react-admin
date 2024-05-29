/* Instruments */
import names from "src/service/stores/names";
import { pickBy } from "lodash-es";
import httpApi from "./api";
import type { PageType, QueryActParams } from "./model";
import { UUID } from "src/common/utils";
import { createThunks } from "src/service/setup";

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
		recordData?: any;
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
	addAct: async (params: any) => {
		await httpApi.addApi(pickBy(params));
	},
	deleteAct: async (params: any) => {
		await httpApi.deleteApi(params);
	},
	updateAct: async (params: any) => {
		await httpApi.updateApi(pickBy(params));
	},
	queryAct:
		(params: QueryActParams = {}) =>
		async (naturApi: {
			setState: (arg0: { loading: boolean }) => void;
		}) => {
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
