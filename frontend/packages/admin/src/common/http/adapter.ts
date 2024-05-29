// import axios,{AxiosAdapter, AxiosPromise, InternalAxiosRequestConfig} from "axios";
// import Qs from "qs";
// const MemoryCache = {
// 	data: {} as Record<string,any>,
// 	set(key:string, value:any, maxAge:string|number) {
// 		this.data[key] = {
// 			maxAge: maxAge || 0,
// 			value,
// 			now: Date.now(),
// 		};
// 	},
// 	get(key:string) {
// 		const cachedItem = this.data[key];
// 		if (!cachedItem) return null;
// 		const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge;
// 		isExpired && this.delete(key);
// 		return isExpired ? null : cachedItem.value;
// 	},
// 	delete(key:string) {
// 		return delete this.data[key];
// 	},
// 	clear() {
// 		this.data = {};
// 	},
// };

// type MemoryCacheType  = typeof MemoryCache

// function generateReqKey(config) {
// 	const { method, url, params, data } = config;
// 	return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&");
// }

// function isCacheLike(cache:MemoryCacheType) {
// 	return !!(
// 		cache.set &&
// 		cache.get &&
// 		cache.delete &&
// 		cache.clear &&
// 		typeof cache.get === "function" &&
// 		typeof cache.set === "function" &&
// 		typeof cache.delete === "function" &&
// 		typeof cache.clear === "function"
// 	);
// }
// interface CacheAdapterOptions {
//   maxAge?:string|number
//   enabledByDefault? :boolean,
//   cacheFlag?:'cache'
//   defaultCache? :typeof MemoryCache,
// }

// export type CustomAxiosConfig = InternalAxiosRequestConfig&{forceUpdate:boolean,cache:boolean|MemoryCacheType}

// const  cacheAdapterEnhancer = (adapter:AxiosAdapter, options:CacheAdapterOptions) {
// 	const {
// 		maxAge,
// 		enabledByDefault = true,
// 		cacheFlag = "cache",
// 		defaultCache = MemoryCache,
// 	} = options;
// 	return (config:CustomAxiosConfig):AxiosPromise => {
// 		const {method, forceUpdate } = config as InternalAxiosRequestConfig&{forceUpdate:boolean,cache:any};
// 		let useCache =
// 			config[cacheFlag] !== undefined && config[cacheFlag] !== null
// 				? config[cacheFlag]
// 				: enabledByDefault;
// 		if (method === "get" && useCache) {
// 			const cache = isCacheLike(useCache) ? useCache : defaultCache;
// 			let requestKey = generateReqKey(config);
// 			let responsePromise = cache.get(requestKey);
// 			if (!responsePromise || forceUpdate) {
// 				responsePromise = (async () => {
// 					try {
// 						return await adapter(config);
// 					} catch (reason) {
// 						cache.delete(requestKey);
// 						throw reason;
// 					}
// 				})();
// 				cache.set(requestKey, responsePromise, maxAge);
// 				return responsePromise;
// 			}
// 			return responsePromise;
// 		}

// 		return adapter(config);
// 	};
// }

// const http = axios.create({
// 	baseURL: "https://jsonplaceholder.typicode.com",
// 	adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, {
// 		enabledByDefault: false,
// 		maxAge: 5000,
// 	}) as any,
// });

// async function requestWithCache() {
// 	const response = await http.get("/todos/1", { cache: true });
// 	console.dir(response);
// }

// async function requestWithoutCache() {
// 	const response = await http.get("/todos/1", { cache: false });
// 	console.dir(response);
// }
