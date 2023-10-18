export type PermissionItem = string;
export interface UseInfoStoreState {
  userName: string;
  password: string;
  token: string;
  isAdmin: boolean;
  qiniuToken: string;
  permissions: string[];
}