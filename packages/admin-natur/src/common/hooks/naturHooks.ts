import { store } from "@/services/stores/index";
import { ModuleType, NaturBaseFactory, StoreModule, createUseInject } from "natur";

export const useInject = createUseInject(() => store);
export const useFlatInject = createUseInject(() => store, { flat: true });

// 初始化所有仓库
export const initAllStores = ({
	excludes = [],
}: { excludes?: string[] } = {}) => {
	sessionStorage.clear();
	store.globalResetStates();
};

export const addStoreDync = <T extends StoreModule>(
	storeName,
	newStore,
): ModuleType<T> => {
	let storeTemp = store;
	if (!storeTemp.getModule(storeName)) {
		store.setModule(storeName, newStore);
	}
	return storeTemp.getModule(storeName);
};
export const createActions = NaturBaseFactory.actionsCreator;
export const mapCreator = NaturBaseFactory.mapCreator;