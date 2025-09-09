import { AppHelper } from "./appHelper";
import RouterHelper from "./router-herlper";

export const routerHelper = new RouterHelper();
export const appHelper = new AppHelper();

export const helperManager = {
  routerHelper,
  appHelper,
};

export type HelperManagerType = typeof helperManager;

Object.values(helperManager).forEach((helperItem: any) => {
  helperItem.injectHelperManager(helperManager);
});
