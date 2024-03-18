/* Instruments */
import { dp } from "src/reduxService";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import type { AdcompanyPageParams, AddStoreParams } from "./model";

const thunks = createThunks(names.appStore, {
	fetchPageListAct: async () => {
		const { data } = await httpApi.fetchPageList();
		debugger;
		dp("devStore", "setState", {
			pageList: data.pageList,
			total: data.pageList.length,
		});
	},
	addPageListAct: async (params: AdcompanyPageParams) => {
		await httpApi.adcompanyPageList(params);
	},
	fetchStoreListAct: async () => {
		const { data } = await httpApi.fetchStoreList();
		dp("devStore", "setState", {
			storeList: data.list,
			total: data.list.length,
		});
	},
	addStoreAct: async (params: AddStoreParams) => {
		const { data } = await httpApi.addStore(params);
		dp("devStore", "setState", data);
	},
	fetchApiListAct: async () => {
		const { data } = await httpApi.fetchApiList();
		dp("devStore", "setState", {
			apiList: data.list,
			total: data.list.length,
		});
	},
	addApiAct: async (params: AddStoreParams) => {
		const { data } = await httpApi.addApi(params);
		dp("devStore", "setState", {
			apiList: data,
		});
	},
});
export default thunks;
