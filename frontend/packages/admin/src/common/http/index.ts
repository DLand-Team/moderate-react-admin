import { Modal, message } from "antd";
import axios, { AxiosResponse } from "axios";
import { dpChain } from "src/service";
import storageHelper from "../utils/storageHelper";
import { HttpError } from "./HttpError";
import { overrideHttpType } from "./overrideHttpType";
const _http = axios.create({
	timeout: 1000 * 10,
});
let isRefreshToken = false;
let requestList: any[] = [];
_http.interceptors.request.use(
	(config) => {
		config.headers.Authorization =
			"Bearer " + storageHelper.getItem("ACCESS_TOKEN");
		return config;
	},
	(err) => {
		throw err;
	},
);
let modalIns: any = null;
const handleAuthorized = () => {
	if (!modalIns) {
		modalIns = Modal.confirm({
			content: "No Auth. redirect Login Page?",
			onOk() {
				storageHelper.clear();
				window.location.href = "/";
			},
			destroyOnClose: true,
			onClose() {
				modalIns = null;
			},
		});
	}
};
const handle401 = async (res: AxiosResponse<any, any>) => {
	// 如果未认证，并且未进行刷新令牌，说明可能是访问令牌过期了
	if (!isRefreshToken) {
		isRefreshToken = true;
		// 1. 如果获取不到刷新令牌，则只能执行登出操作
		if (!storageHelper.getItem("REFRESH_TOKEN")) {
			return handleAuthorized();
		}
		// 2. 进行刷新访问令牌
		try {
			await dpChain("authStore").refreshTokenAct(null);
			// 2.1 刷新成功，则回放队列的请求 + 当前请求
			requestList.forEach((cb) => cb());
			return _http(res.config);
		} catch (e) {
			// 为什么需要 catch 异常呢？刷新失败时，请求因为 Promise.reject 触发异常。
			// 2.2 刷新失败，只回放队列的请求
			requestList.forEach((cb) => cb());
			// 提示是否要登出。即不回放当前请求！不然会形成递归
			return handleAuthorized();
		} finally {
			requestList = [];
			isRefreshToken = false;
		}
	} else {
		// 添加到队列，等待刷新获取到新的令牌
		return new Promise((resolve) => {
			requestList.push(() => {
				res.config.headers["Authorization"] =
					"Bearer " + storageHelper.getItem("ACCESS_TOKEN"); // 让每个请求携带自定义token 请根据实际情况自行修改
				resolve(_http(res.config));
			});
		});
	}
};

const handleError = async ({
	code,
	msg,
}: {
	code: string | number;
	msg: string;
}) => {
	{
		message.warning(msg);
		throw new HttpError(msg, Number(code));
	}
};

_http.interceptors.response.use(async (response) => {
	const { data = {} } = response;
	const { code, msg } = data;
	if (
		code &&
		Number(code) !== 0 &&
		Number(code) !== 200 &&
		Number(code) !== 1
	) {
		if (Number(code) == 401) {
			return await handle401(response);
		} else {
			return handleError({
				code,
				msg,
			});
		}
	} else {
		return response.data;
	}
});

export const http = overrideHttpType(_http);
export const http2 = _http;

_http.fetch = ((config, options) => {
	if (options?.showLoading) {
		storageHelper.setItem("IS_PLUGIN_INSTALLING", 1);
		dpChain("appStore").setIsLoading(true);
	}
	return _http.request(config).finally(() => {
		if (options?.showLoading) {
			dpChain("appStore").setIsLoading(false);
			storageHelper.setItem("IS_PLUGIN_INSTALLING", 0);
		}
	});
}) as typeof _http.fetch;
