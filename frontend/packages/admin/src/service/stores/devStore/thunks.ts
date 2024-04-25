/* Instruments */
import { dp } from "src/service";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import type {
	AdcompanyPageParams,
	AddPluginApiParams,
	AddStoreParams,
} from "./model";

const thunks = createThunks(names.appStore, {
	fetchPageListAct: async () => {
		const { data } = await httpApi.fetchPageList();
		dp("devStore", "setPageList", {
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
	getPluginListAct: async () => {
		const { data } = await httpApi.getPluginListApi();
		dp("devStore", "setState", {
			pluginList: data.list,
		});
	},
	addPluginAct: async (params: AddPluginApiParams) => {
		await httpApi.addPluginApi(params);
	},
	getPluginAct: async (params: { url: string }) => {
		const { data } = await httpApi.getPluginApi(params);
		dp("appStore", "setMdContent", data.content);
	},
});
export default thunks;
