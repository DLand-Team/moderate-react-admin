import type { AxiosInstance, AxiosRequestConfig } from "axios";

export type ResponseType<D> = {
  data: D;
  code: string | number;
  message: null | string;
  msg: null | string;
};

export const overrideHttpType = (_http: AxiosInstance) => {
  // rewrite axios's type
  type GetParams = Parameters<typeof _http.get>;
  type PostParams = Parameters<typeof _http.post>;
  type PatchParams = Parameters<typeof _http.patch>;
  type DeleteParams = Parameters<typeof _http.delete>;
  type HeadParams = Parameters<typeof _http.head>;
  type PutParams = Parameters<typeof _http.put>;

  const _overrideHttpType = <D extends any = any, T = ResponseType<D>>(
    config: AxiosRequestConfig,
  ) => _http<T, T>(config);
  _overrideHttpType.request = <D extends any = any, T = ResponseType<D>>(
    config: AxiosRequestConfig,
  ) => _http.request<T, T>(config);
  _overrideHttpType.get = <D extends any = any, T = ResponseType<D>>(
    ...arg: GetParams
  ) => _http.get<T, T>(...arg);
  _overrideHttpType.post = <D extends any = any, T = ResponseType<D>>(
    ...arg: PostParams
  ) => _http.post<T, T>(...arg);
  _overrideHttpType.patch = <D extends any = any, T = ResponseType<D>>(
    ...arg: PatchParams
  ) => _http.patch<T, T>(...arg);
  _overrideHttpType.delete = <D extends any = any, T = ResponseType<D>>(
    ...arg: DeleteParams
  ) => _http.delete<T, T>(...arg);
  _overrideHttpType.head = <D extends any = any, T = ResponseType<D>>(
    ...arg: HeadParams
  ) => _http.head<T, T>(...arg);
  _overrideHttpType.put = <D extends any = any, T = ResponseType<D>>(
    ...arg: PutParams
  ) => _http.put<T, T>(...arg);

  type HttpType = typeof _overrideHttpType;
  return _http as HttpType;
};
