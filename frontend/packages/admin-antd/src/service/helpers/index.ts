import { AppHelper } from "./appHelper";
import { RouterHelper } from "./routerHelper";
import { AuthHelper } from "./authHelper";
import { DevHelper } from "./devHelper";

export const appHelper = new AppHelper();
export const routerHelper = new RouterHelper();
export const authHelper = new AuthHelper();
export const devHelper = new DevHelper();

export const helperManager = {
	appHelper,
	routerHelper,
	authHelper,
	devHelper,
};

export type HelperManagerType = typeof helperManager;

// 依赖注入helperManager
appHelper.injectHelperManager(helperManager);
routerHelper.injectHelperManager(helperManager);
authHelper.injectHelperManager(helperManager);
devHelper.injectHelperManager(helperManager);
