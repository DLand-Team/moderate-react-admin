export interface PermissionNode {
  title: string;
  value: string;
  key: string;
  children?: PermissionNode[];
}
export interface ArticleStoreState {
  permissionTreeData: PermissionNode[];
}
