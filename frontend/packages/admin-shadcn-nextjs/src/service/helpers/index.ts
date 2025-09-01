export const helperManager = {};

export type HelperManagerType = typeof helperManager;

Object.values(helperManager).forEach((helperItem: any) => {
  helperItem.injectHelperManager(helperManager);
});
