import devHelper from "@/helper/devHelper";
import { RouteItem } from "@/model";
import { v4 as uuidv4 } from "uuid";

const getPageListApiHr = async (ctx) => {
	let routesObj: {
		[key: PropertyKey]: RouteItem;
	} = devHelper.getRouteConfig();
	let pageList = Object.values(routesObj).map((item) => {
		return {
			id: uuidv4(),
			name: item.id,
			path: item.path,
		};
	});
	ctx.response.body = {
		status: 1,
		code: "200",
		data: {
			code: "200",
			pageList: pageList,
		},
	};
};

export default getPageListApiHr;
