/* Instruments */
import { pickBy } from "lodash-es";
import { UUID } from "src/common/utils";
import { dp } from "src/reduxService";
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";

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
		dp("posStore", "setState", {
			recordData,
			isShowAddModal,
			...extra,
		});
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
	queryAct: async () => {},
});
export default thunks;
