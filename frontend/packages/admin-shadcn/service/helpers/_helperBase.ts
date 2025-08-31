import type { HelperManagerType, ServiceManagerType } from "..";

class HelperBase {
    helperManager: HelperManagerType | null = null;
    serviceManager: ServiceManagerType | null = null;
    injectHelperManager(helperManager: HelperManagerType) {
        this.helperManager = helperManager;
    }
    injectServiceManager(serviceManager: ServiceManagerType) {
        this.serviceManager = serviceManager;
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
