import type { HelperManagerType, ServiceManagerType } from "..";
import type { StoreState as AppStoreState } from "../stores/appStore/model";
import type { StoreState as RouterStoreState } from "../stores/routerStore/model";

class HelperBase {
    helperManager: HelperManagerType | null = null;
    serviceManager: ServiceManagerType | null = null;
    injectHelperManager(helperManager: HelperManagerType) {
        this.helperManager = helperManager;
    }
    injectServiceManager(serviceManager: ServiceManagerType) {
        this.serviceManager = serviceManager;
    }
    get appHelper() {
        return (
            this.helperManager?.appHelper ||
            ({} as HelperManagerType["appHelper"])
        );
    }
    get routerHelper() {
        return (
            this.helperManager?.routerHelper ||
            ({} as HelperManagerType["routerHelper"])
        );
    }
    get appStore() {
        return (this.getStore("appStore") || {}) as AppStoreState;
    }
    get routerStore() {
        return (this.getStore("routerStore") || {}) as RouterStoreState;
    }
    get getStore() {
        return (this.serviceManager?.getStore ||
            (() => null)) as ServiceManagerType["getStore"];
    }
    get dp() {
        return (this.serviceManager?.dp ||
            (() => null)) as ServiceManagerType["dp"];
    }
    get dpChain() {
        return (this.serviceManager?.dpChain ||
            (() => null)) as ServiceManagerType["dpChain"];
    }
    get reduxStore() {
        return (
            this.serviceManager?.reduxStore ||
            ({} as ServiceManagerType["reduxStore"])
        );
    }
}

export default HelperBase;
