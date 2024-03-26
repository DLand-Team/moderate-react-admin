import { AdcompanyPageParams, AddStoreParams } from "@/services/apis/devApi";
import { devApi } from "@/services";

const actions = {
	createPageList: async () => {
		const { data } = await devApi.fetchPageList();
		return {
			pageList: data.pageList,
			routePageList: data.exportList,
		};
	},
	adcompanyPageList: async (params: AdcompanyPageParams) => {
		await devApi.adcompanyPageList(params);
	},
	createStoreList: async () => {
		const { data } = await devApi.fetchStoreList();
		return {
			storeList: data.list,
		};
	},
	addStore: async (params: AddStoreParams) => {
		const { data } = await devApi.addStore(params);
		return data;
	},
	createApiList: async () => {
		const { data } = await devApi.fetchApiList();
		return {
			apiList: data.list,
		};
	},
	addApi: async (params: AddStoreParams) => {
		const { data } = await devApi.addApi(params);
		return data;
	},
};

export default actions;
