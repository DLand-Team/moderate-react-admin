export type PermissionItem = string;
export interface StoreState {
	userName: string;
	token: string;
	isAdmin: boolean;
	qiniuToken: string;
	permissions: string[];
}
