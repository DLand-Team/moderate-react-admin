/// <reference types="vite/client" />
declare module "*.riv" {}
type AddEventListenerType = Parameters<typeof window.addEventListener>;
import { AxiosInstance, AxiosRequestConfig } from "axios";

declare module "axios" {
	export interface AxiosInstance {
		fetch: <T = any, R = AxiosResponse<T, any>, D = any>(
			config: AxiosRequestConfig<D>,
			options?: {
				showLoading?: boolean;
			},
		) => Promise<R>;
	}
}
