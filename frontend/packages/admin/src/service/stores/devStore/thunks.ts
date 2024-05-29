/* Instruments */
import { dp } from "src/service";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import type {
	AdcompanyPageParams,
	AddPluginApiParams,
	AddStoreParams,
	RemovePluginApiParams,
} from "./model";
import { Setting } from "../appStore/modal";

const thunks = createThunks(names.appStore, {
	fetchPageListAct: async () => {
		const { data } = await httpApi.fetchPageList();
		dp("devStore", "setPageList", {
			pageList: data.pageList,
			total: data.pageList.length,
		});
	},
	addPageListAct: async (params: AdcompanyPageParams) => {
		await httpApi.addPageApi(params);
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
	loadPluginDetailAct: async (params: { url: string }) => {
		const { data } = await httpApi.getPluginApi(params);
		dp("appStore", "setMdContent", data.content);
	},
	saveSettingAct: async (params: Setting) => {
		await httpApi.saveSettingApi(params);
	},
	removePluginAct: async (params: RemovePluginApiParams) => {
		await httpApi.removePluginApi(params);
	},
});
export default thunks;
