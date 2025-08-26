import { service } from "./service";

import { config } from "./config";
import { AxiosRequestConfig } from "axios";

const { default_headers } = config;

export type RequestOptions = AxiosRequestConfig & { headersType?: any };

const request = (option: RequestOptions) => {
	const { headersType, headers, ...otherOption } = option;
	return service({
		...otherOption,
		headers: {
			"Content-Type": headersType || default_headers,
			...headers,
		},
	});
};

export type ResponseType<D> = {
	data: D;
	code: string | number;
	message: null | string;
	msg: null | string;
};

export default {
	get: async <D extends any = any, T = ResponseType<D>>(
		option: RequestOptions,
	) => {
		const res = await request({ method: "GET", ...option });
		return res as unknown as T;
	},
	post: async <D extends any = any, T = ResponseType<D>>(
		option: RequestOptions,
	) => {
		const res = await request({ method: "POST", ...option });
		return res as unknown as T;
	},
	postOriginal: async (option: RequestOptions) => {
		const res = await request({ method: "POST", ...option });
		return res;
	},
	delete: async <D extends any = any, T = ResponseType<D>>(
		option: RequestOptions,
	) => {
		const res = await request({ method: "DELETE", ...option });
		return res as unknown as T;
	},
	put: async <D extends any = any, T = ResponseType<D>>(
		option: RequestOptions,
	) => {
		const res = await request({ method: "PUT", ...option });
		return res as unknown as T;
	},
	download: async <D extends any = any, T = ResponseType<D>>(
		option: RequestOptions,
	) => {
		const res = await request({
			method: "GET",
			responseType: "blob",
			...option,
		});
		return res as unknown as Promise<T>;
	},
	upload: async <D extends any = any, T = ResponseType<D>>(
		option: RequestOptions,
	) => {
		option.headersType = "multipart/form-data";
		const res = await request({ method: "POST", ...option });
		return res as unknown as Promise<T>;
	},
};
